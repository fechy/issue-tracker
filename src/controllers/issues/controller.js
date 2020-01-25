const { Issue, IssueStatus } = require('../../models/issue');
const Agent = require('../../models/agent');

class IssuesController {
  getOpen() {
    return Issue.findAll({
      where: {
        status: IssueStatus.OPEN
      }
    });
  }

  async createIssue(ctx) {
    const { user = null, description = null } = ctx.request.body;
    if (!user || !description) {
      throw new Error('Missing user or issue description!');
    }

    const freeAgent = await Agent.findAvailable();
    const status = freeAgent ? IssueStatus.PENDING : IssueStatus.OPEN;
    const agent = freeAgent ? freeAgent.id : null;

    const newIssue = await Issue.create({
      user,
      description,
      status,
      agent
    });

    if (newIssue && freeAgent) {
      await Agent.update({ busy: true }, {
        where: {
          id: freeAgent.id
        }
      });
    }

    return newIssue;
  }

  async resolveIssue(ctx) {
    const { id } = ctx.params;
    const issue = await Issue.findOne({ where: { id } });
    if (!issue) {
      throw new Error('Issue doesn\'t exist');
    }

    await Issue.update({ status: IssueStatus.RESOLVED }, {
      where: { id }
    });

    if (issue.agent) {
      await Agent.freeAgent(issue.agent);
    }

    return true;
  }
}

module.exports = IssuesController;
