const { Issue, IssueStatus } = require('../../models/issue');

class IssuesController {
  getOpen() {
    return Issue.findAll({
      where: {
        status: IssueStatus.OPEN
      }
    });
  }
}

module.exports = IssuesController;
