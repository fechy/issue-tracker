const Agent = require('../../models/agent');

class AgentsController {
  getAvailable() {
    return Agent.findAll({
      where: {
        busy: false
      }
    });
  }

  async freeAgent(agentId) {
    const result = await Agent.update({ busy: false }, {
      where: {
        id: agentId
      }
    });

    return result[0] > 0;
  }

  setAgentBusy(agentId) {
    return Agent.update({ busy: true }, {
      where: {
        id: agentId
      }
    });
  }
}

module.exports = AgentsController;
