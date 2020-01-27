import Issue from './issue';
import Agent from './agent';

describe('models/agent', () => {
  beforeEach(async () => {
    await Agent.bulkCreate([
      {
        username: 'test1',
        email: 'test1@tester.com',
        busy: false
      },
      {
        username: 'test2',
        email: 'test2@tester.com',
        busy: true
      }
    ]);
  });

  afterEach(async () => {
    await Issue.truncate();
    await Agent.destroy({where: {}});
  });

  it('Find one free agent', async () => {
    const result = await Agent.findAvailable();
    expect(result!.username).toEqual('test1');
  });

  it('Set a busy agent free', async () => {
    const agentBefore = await Agent.findOne({
      where: {
        busy: true
      }
    });

    expect(agentBefore!.busy).toEqual(true);

    await Agent.freeAgent(agentBefore!.id);
    const agentAfter = await Agent.findOne({
      where: {
        id: agentBefore!.id
      }
    });

    expect(agentAfter!.busy).toEqual(false);
  });

  it('Set a free agent busy', async () => {
    const agentBefore = await Agent.findOne({
      where: {
        busy: false
      }
    });

    expect(agentBefore!.busy).toEqual(false);

    await Agent.setBusy(agentBefore!.id);
    const agentAfter = await Agent.findOne({
      where: {
        id: agentBefore!.id
      }
    });

    expect(agentAfter!.busy).toEqual(true);
  });
});
