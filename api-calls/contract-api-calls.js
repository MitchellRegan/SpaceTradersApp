import sa from './server-address';

/**
 * Container for all of the API calls used for viewing and interacting with job contracts.
 */
const ContractAPICalls = {
    /**
     * Return a paginated list of all your contracts.
     * https://spacetraders.stoplight.io/docs/spacetraders/b5d513949b11a-list-contracts
     * @param {number} resultsPerPage_ How many contracts will be returned per page. Defaults to 20. Range is 1-20.
     * @param {number} pageNum_ The page number of the list of contracts to view. Defaults to 1.
     */
    listContracts: async function (resultsPerPage_ = 20, pageNum_ = 1) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/contracts?page=' + pageNum_.toString() + '&limit=' + resultsPerPage_.toString(), {
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
                        title: "ContractAPICalls.listContracts Error",
                        message:error
                    }
                }
            })

        return callData;
    },


    /**
     * Get the details of a contract by ID.
     * https://spacetraders.stoplight.io/docs/spacetraders/2889d8b056533-get-contract
     * @param {string} contractId_ ID for the contract to get.
     */
    getContract: async function (contractId_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/contracts/' + contractId_, {
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
                        title: "ContractAPICalls.getContract Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Accept a contract by ID. You can only accept contracts that were offered to you, were not
     * accepted yet, and whose deadlines has not passed yet.
     * https://spacetraders.stoplight.io/docs/spacetraders/7dbc359629250-accept-contract
     * @param {string} contractId_ ID for the contract to accept.
     */
    acceptContract: async function (contractId_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/contracts/' + contractId_ + '/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:'application/json',
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
    },


    /**
     * Deliver cargo to a contract. In order to use this API, a ship must be at the delivery location (denoted
     * in the delivery terms as destinationSymbol of a contract) and must have a number of units of a good required
     * by this contract in its cargo. Cargo that was delivered will be removed from the ship's cargo.
     * https://spacetraders.stoplight.io/docs/spacetraders/8f89f3b4a246e-deliver-cargo-to-contract
     * @param {string} contractId_ ID for the contract to deliver for.
     * @param {string} shipSymbol_ The name of the ship to perform the delivery.
     * @param {string} cargo_ The symbol for the type of cargo to deliver.
     * @param {number} amount_ The number of resources to deliver.
     */
    deliverCargoToContract: async function (contractId_, shipSymbol_, cargo_, amount_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/contracts/' + contractId_ + '/deliver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: JSON.stringify({
                "shipSymbol": shipSymbol_,
                "tradeSymbol": cargo_,
                "units": amount_
            })
        })
            .then(response => response.json())
            .then(data => {
                return data;
            })
            .catch(error => {
                return {
                    error: {
                        title: "ContractAPICalls.deliverCargoToContract Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Fulfill a contract. Can only be used on contracts that have all of their delivery terms fulfilled.
     * https://spacetraders.stoplight.io/docs/spacetraders/d4ff41c101af0-fulfill-contract
     * @param {string} contractId_ ID for the contract to fulfill.
     */
    fulfillContract: async function (contractId_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/contracts/' + contractId_ + '/fulfill', {
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
                        title: "ContractAPICalls.fulfillContract Error",
                        message: error
                    }
                }
            })

        return callData;
    },
}

export default ContractAPICalls;