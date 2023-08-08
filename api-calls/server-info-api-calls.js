import sa from './server-address';

/**
 * Container for all of the API calls used for getting info about the game server and announcements.
 */
const ServerInfoAPICalls = {
    /**
     * API call to get info about the game server and announcements.
     */
    getServerInfo: async function () {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address, {
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
                        title: "ServerInfoAPICalls.getServerInfo Error",
                        message: error
                    }
                }
            })

        return callData;
    }
}

export default ServerInfoAPICalls;