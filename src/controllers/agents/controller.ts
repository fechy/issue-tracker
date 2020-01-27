import Agent from '../../models/agent';

class AgentsController {
  constructor() {
  }

  getAvailable(): Promise<Agent[]> {
    return Agent.findAllAvailable();
  }

  freeAgent(agentId: number): Promise<[number, Agent[]]> {
    return Agent.freeAgent(agentId);
  }

  setAgentBusy(agentId: number): Promise<[number, Agent[]]> {
    return Agent.setBusy(agentId);
  }
}

export default AgentsController;
