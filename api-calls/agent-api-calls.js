/**
 * Container for all of the API calls used for getting details about agents (i.e. players).
 */
const AgentAPICalls = {
    /**
     * API call to view details about your user account.
     */
    myAgentDetails: async function () {
        const localData = require("../user-preferences.json");

        let callData = await fetch('https://api.spacetraders.io/v2/my/agent', {
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
                        title: "AgentAPICalls.myAgentDetails Error",
                        message: error
                    }
                };
            })

        return callData;
    }
}

export default AgentAPICalls;