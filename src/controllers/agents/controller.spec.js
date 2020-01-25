const Controller = require('./controller');
const Agent = require('../../models/agent');

const controller = new Controller();

describe('controllers/agents/controller', () => {
  beforeAll(async () => {
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

  afterAll(async () => {
    await Agent.truncate();
  });

  it('Returns available agents', async () => {
    jest.spyOn(Agent, 'findAll');

    const result = await controller.getAvailable();
    expect(result).toHaveLength(1);
    expect(result[0].username).toStrictEqual('test1');
    expect(Agent.findAll).toHaveBeenCalledWith({
      where: {
        busy: false
      }
    });
  });
});
