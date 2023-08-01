/**
 * Container for all of the API calls used for viewing and managing the user's fleet of ships.
 */
const ShipAPICalls = {
    /**
     * API call to retrieve a list of all ships owned by the logged-in player.
     */
    getMyShipList: async function () {
        const localData = require("../user-preferences.json");

        let callData = await fetch('https://api.spacetraders.io/v2/my/ships', {
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
                        title: "ShipAPICalls.getMyShipList Error",
                        message: error
                    }
                }
            })

        return callData;
    }
}

export default ShipAPICalls;