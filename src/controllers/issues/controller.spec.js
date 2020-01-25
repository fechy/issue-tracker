const Controller = require('./controller');
const { Issue, IssueStatus } = require('../../models/issue');

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
});
