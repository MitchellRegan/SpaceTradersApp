/**
 * Container for all of the API calls used for viewing and managing the user's fleet of ships.
 */
import sa from './server-address';
const ShipAPICalls = {
    /**
     * Returns a paginated list of all ships under your agent's ownership.
     * https://spacetraders.stoplight.io/docs/spacetraders/64435cafd9005-list-ships
     * @param {int} resultsPerPage_ How many ships will be returned per page. Defaults to 20. Range is 1-20.
     * @param {int} pageNum_ The page number of the list of ships to view. Defaults to 1.
     */
    listShips: async function (resultsPerPage_=20, pageNum_=1) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships?page=' + pageNum_.toString() + '&limit=' + resultsPerPage_.toString(), {
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
                        title: "ShipAPICalls.listShips Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Purchase a ship from a Shipyard. In order to use this function, a ship under your agent's ownership must
     * be in a waypoint that has the [Shipyard] trait, and the shipyard must sell the type of the desired ship.
     * https://spacetraders.stoplight.io/docs/spacetraders/403855e2e99ad-purchase-ship
     * @param {string} shipType_ The type of the ship to purchase. Must be of the following types:
     * SHIP_PROBE, SHIP_MINING_DRONE, SHIP_INTERCEPTOR, SHIP_LIGHT_HAULER, SHIP_COMMAND_FRIGATE, SHIP_EXPLORER, SHIP_HEAVY_FREIGHTER, SHIP_LIGHT_SHUTTLE, SHIP_ORE_HOUND, SHIP_REFINING_FREIGHTER
     * @param {string} waypointSymbol_ The name of the waypoint that has the [Shipyard] trait to purchase the ship at.
     */
    purchaseShip: async function (shipType_, waypointSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                'shipType': shipType_,
                'waypointSymbol': waypointSymbol_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.purchaseShip Error",
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