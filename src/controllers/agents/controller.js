const Agent = require('../../models/agent');

class AgentsController {
  getAvailable() {
    return Agent.findAll({
      where: {
        busy: false
      }
    });
  }
}

module.exports = AgentsController;
