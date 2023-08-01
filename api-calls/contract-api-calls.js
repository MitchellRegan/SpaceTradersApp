/**
 * Container for all of the API calls used for viewing and interacting with job contracts.
 */
const ContractAPICalls = {
    /**
     * API call to retrieve a list of contracts, both available and completed, for the logged-in player.
     */
    getContractList: async function () {
        const localData = require("../user-preferences.json");

        let callData = await fetch('https://api.spacetraders.io/v2/my/contracts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            }
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                return {
                    error: {
                        title: "ContractAPICalls.getContractList Error",
                        message:error
                    }
                }
            })

        return callData;
    }
}

export default ContractAPICalls;