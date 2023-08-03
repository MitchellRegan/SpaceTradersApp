/**
 * Container for all of the API calls used for viewing and interacting with job contracts.
 */
import sa from './server-address';
const ContractAPICalls = {
    /**
     * API call to retrieve a list of contracts, both available and completed, for the logged-in player.
     */
    getContractList: async function () {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/contracts', {
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
    },


    /**
     * API call to accept a given contract based on the ID given.
     * @param {string} ID for the contract to accept.
     */
    acceptContract: async function (id_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/contracts/' + id_ + '/accept', {
            method: 'POST',
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
                        title: "ContractAPICalls.acceptContract Error",
                        message: error
                    }
                }
            })

        return callData;
    }
}

export default ContractAPICalls;