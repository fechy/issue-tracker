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
      await Agent.setBusy(freeAgent.id);
    }

    return newIssue;
  }

  async resolveIssue(ctx) {
    const { id } = ctx.params;
    const issue = await Issue.findOne({
      where: {
        id
      }
    });

    if (!issue) {
      throw new Error('Issue doesn\'t exist');
    }

    await Issue.update({ status: IssueStatus.RESOLVED }, {
      where: { id }
    });

    if (issue.agentId) {
      const openIssue = await Issue.findOpen();
      if (openIssue) {
        await Issue.assignAgent(openIssue.id, issue.agentId);
      } else {
        await Agent.freeAgent(issue.agentId);
      }
    }

    return true;
  }
}

module.exports = IssuesController;
