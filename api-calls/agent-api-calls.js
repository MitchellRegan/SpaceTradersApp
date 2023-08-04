/**
 * Container for all of the API calls used for getting details about agents (i.e. players).
 */
import sa from './server-address';
const AgentAPICalls = {
    /**
     * Fetch your agent's details.
     * https://spacetraders.stoplight.io/docs/spacetraders/eb030b06e0192-get-agent
     */
    getAgent: async function () {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/agent', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "AgentAPICalls.getAgent Error",
                        message: error
                    }
                };
            })

        return callData;
    },


    /**
     * Return a paginated list of all agents.
     * https://spacetraders.stoplight.io/docs/spacetraders/d4567f6f3c159-list-agents
     * @param {number} resultsPerPage_ How many agents will be returned per page. Defaults to 20. Range is 1-20.
     * @param {number} pageNum_ The page number of the list of agents to view. Defaults to 1.
     */
    listAgents: async function (resultsPerPage_ = 20, pageNum_ = 1) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + '/agents?page=' + pageNum_.toString() + '&limit=' + resultsPerPage_.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "AgentAPICalls.listAgents Error",
                        message: error
                    }
                };
            })

        return callData;
    },


    /**
     * Fetch public details of another agent.
     * https://spacetraders.stoplight.io/docs/spacetraders/eb030b06e0192-get-agent
     * @param {string} agentSymbol_ The name of the agent to get details about.
     */
    getPublicAgent: async function (agentSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + '/agents/' + agentSymbol_, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "AgentAPICalls.getPublicAgent Error",
                        message: error
                    }
                };
            })

        return callData;
    },
}

export default AgentAPICalls;