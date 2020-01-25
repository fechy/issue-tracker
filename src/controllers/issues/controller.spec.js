const Controller = require('./controller');
const { Issue, IssueStatus } = require('../../models/issue');
const Agent = require('../../models/agent');

const controller = new Controller();

describe('controllers/issues/controller', () => {
  beforeAll(async () => {
    await Issue.bulkCreate([
      {
        user: 'user1',
        description: 'Open issue',
        agent: null,
        status: IssueStatus.OPEN
      },
      {
        user: 'user1',
        description: 'Pending issue',
        agent: 1,
        status: IssueStatus.PENDING
      },
    ]);
  });

  afterAll(async () => {
    await Issue.truncate();
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
      request: {
        body: {
          user: 'user-01',
          description: 'Issue description'
        }
      }
    });

    expect(result.user).toStrictEqual('user-01');
    expect(result.agent).toBeNull();
    expect(result.status).toEqual(IssueStatus.OPEN);
    expect(Issue.create).toHaveBeenCalledWith({
      user: 'user-01',
      description: 'Issue description',
      agent: null,
      status: IssueStatus.OPEN
    });
  });

  it('Creates a PENDING issue with an agent assigned', async () => {
    jest.spyOn(Issue, 'create');
    jest.spyOn(Agent, 'update');
    jest.spyOn(Agent, 'findAvailable')
      .mockResolvedValue(Promise.resolve({ id: '1111' }));

    const result = await controller.createIssue({
      request: {
        body: {
          user: 'user-02',
          description: 'Issue description'
        }
      }
    });

    expect(result.user).toStrictEqual('user-02');
    expect(result.agent).toEqual('1111');
    expect(result.status).toEqual(IssueStatus.PENDING);

    expect(Issue.create).toHaveBeenCalledWith({
      user: 'user-02',
      description: 'Issue description',
      agent: '1111',
      status: IssueStatus.PENDING
    });

    expect(Agent.update).toHaveBeenCalledWith({ busy: true }, {
      where: {
        id: '1111'
      }
    });
  });
});
