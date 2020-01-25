const Agent = require('../../models/agent');

class AgentsController {
  getAvailable() {
    return Agent.findAll({
      where: {
        busy: false
      }
    });
  }

  freeAgent(agentId) {
    return Agent.freeAgent(agentId);
  }

  setAgentBusy(agentId) {
    return Agent.setBusy(agentId);
  }
}

module.exports = AgentsController;
