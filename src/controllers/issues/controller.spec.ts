import Controller from './controller';
import Issue, { IssueStatus } from '../../models/issue';
import Agent from '../../models/agent';
import KoaContext from '../../types/koa-context.type';

const controller = new Controller();

describe('controllers/issues/controller', () => {
  beforeEach(async () => {
    const agent = await Agent.create({
      username: 'agent-1',
      email: 'agent-1@example.com',
      busy: true
    });

    await Issue.bulkCreate([
      {
        user: 'user1',
        description: 'Open issue',
        agentId: null,
        status: IssueStatus.OPEN
      },
      {
        user: 'user1',
        description: 'Pending issue',
        agentId: agent.id,
        status: IssueStatus.PENDING
      },
    ]);
  });

  afterEach(async () => {
    await Issue.truncate();
    await Agent.destroy({where: {}});
  });

  it('Returns open issues', async () => {
    jest.spyOn(Issue, 'findAll');

    const result = await controller.getOpen();
    expect(result).toHaveLength(1);
    expect(result[0].user).toStrictEqual('user1');
    expect(Issue.findAll).toHaveBeenCalledWith({
      where: {
        status: IssueStatus.OPEN
      }
    });
  });

  it('Fails to create an open issue if missing mandatory user and description', async () => {
    let error;
    try {
      await controller.createIssue({
        // @ts-ignore
        request: {
          body: {}
        }
      });
    } catch (e) {
      error = e.message;
    }

    expect(error).toEqual('Missing user or issue description!');
  });

  it('Creates an OPEN issue', async () => {
    jest.spyOn(Issue, 'create');
    jest.spyOn(Agent, 'findAvailable')
      .mockResolvedValue(Promise.resolve(null));

    const result = await controller.createIssue({
      // @ts-ignore
      request: {
        body: {
          user: 'user-01',
          description: 'Issue description'
        }
      }
    });

    expect(result.user).toStrictEqual('user-01');
    expect(result.agentId).toBeNull();
    expect(result.status).toEqual(IssueStatus.OPEN);
    expect(Issue.create).toHaveBeenCalledWith({
      user: 'user-01',
      description: 'Issue description',
      agentId: null,
      status: IssueStatus.OPEN
    });
  });

  it('Creates a PENDING issue with an agent assigned', async () => {
    const agent = await Agent.create({
      username: 'agent-007',
      email: 'agent-007@example.com',
      busy: true
    });

    jest.spyOn(Issue, 'create');
    jest.spyOn(Agent, 'update');
    jest.spyOn(Agent, 'findAvailable')
      .mockResolvedValue(Promise.resolve({ id: agent.id } as Agent));

    const result = await controller.createIssue({
      // @ts-ignore
      request: {
        body: {
          user: 'user-02',
          description: 'Issue description'
        }
      }
    });

    expect(result.user).toStrictEqual('user-02');
    expect(result.agentId).toEqual(agent.id);
    expect(result.status).toEqual(IssueStatus.PENDING);

    expect(Issue.create).toHaveBeenCalledWith({
      user: 'user-02',
      description: 'Issue description',
      agentId: agent.id,
      status: IssueStatus.PENDING
    });

    expect(Agent.update).toHaveBeenCalledWith({ busy: true }, {
      where: {
        id: agent.id
      }
    });
  });

  it('Throws an error when trying to resolve an invalid issue', async () => {
    let error;
    try {
      // @ts-ignore
      await controller.resolveIssue({
        params: {
          id: 100000
        }
      } as KoaContext);
    } catch (err) {
      error = err.message;
    }

    expect(error).toEqual('Issue doesn\'t exist');
  });

  it('Resolves a PENDING issue and frees an agent', async () => {
    // Make sure there is no OPEN issue
    await Issue.destroy({
      where: {
        status: IssueStatus.OPEN
      }
    });

    const issueBefore = await Issue.findOne({
      where: {
        status: IssueStatus.PENDING
      }
    });

    // @ts-ignore
    const result = await controller.resolveIssue({
      params: {
        id: issueBefore!.id
      }
    } as KoaContext);

    const issueAfter = await Issue.findOne({
      where: {
        id: issueBefore!.id
      }
    });

    const agent = await Agent.findOne({ where: { id: issueBefore!.agentId } });

    expect(result).toEqual(true);
    expect(issueAfter!.status).toEqual(IssueStatus.RESOLVED);
    expect(agent!.busy).toEqual(false);
  });

  it('Resolves a PENDING issue and frees an agent and assigns him to a new issue of there is an OPEN one', async () => {
    const issueBefore = await Issue.findOne({
      where: {
        status: IssueStatus.PENDING
      }
    });

    // @ts-ignore
    const result = await controller.resolveIssue({
      params: {
        id: issueBefore!.id
      }
    } as KoaContext);

    const issueAfter = await Issue.findOne({
      where: {
        id: issueBefore!.id
      }
    });

    const issue2After = await Issue.findOne({
      where: {
        status: IssueStatus.PENDING
      }
    });

    expect(issue2After!.id).not.toEqual(issueAfter!.id);

    const agent = await Agent.findOne({ where: { id: issueBefore!.agentId } });

    expect(result).toEqual(true);
    expect(issueAfter!.status).toEqual(IssueStatus.RESOLVED);
    expect(issue2After!.agentId).toEqual(issueAfter!.agentId);
    expect(agent!.busy).toEqual(true);
  });
});
