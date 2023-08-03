/**
 * Container for all of the API calls used for viewing and managing the user's fleet of ships.
 */
import sa from './server-address';
const ShipAPICalls = {
    /**
     * API call to retrieve a list of all ships owned by the logged-in player.
     */
    getMyShipList: async function () {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships', {
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
    },


    /**
     * API call to go into orbit at the current location.
     * @param {string} shipSymbol_ The name of the ship to put into orbit.
     */
    goIntoOrbit: async function (shipSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /orbit', {
            method: 'POST',
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
                        title: "ShipAPICalls.goIntoOrbit Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * API call to dock your ship at the current location.
     * @param {string} shipSymbol_ The name of the ship to dock.
     */
    dockShip: async function (shipSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /dock', {
            method: 'POST',
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
                        title: "ShipAPICalls.dockShip Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * API call to change your ship's flight mode.
     * @param {string} shipSymbol_ The name of the ship to change the flight mode of.
     * @param {string} mode_ The mode to switch your ship into. Options are "CRUISE", "BURN", "DRIFT", "STEALTH".
     */
    setShipFlightMode: async function (shipSymbol_, mode_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol + ' /nav', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: JSON.stringify({
                flightMode: mode_
            })
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.setShipFlightMode Error",
                        message: error
                    }
                }
            })

        return callData;
    }
}

export default ShipAPICalls;