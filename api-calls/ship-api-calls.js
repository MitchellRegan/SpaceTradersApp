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
     * Retrieve the details of a ship under your agent's ownership.
     * https://spacetraders.stoplight.io/docs/spacetraders/800936299c838-get-ship
     * @param {string} shipSymbol_ The name of the ship to get details about.
     */
    getShip: async function (shipSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_, {
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
                        title: "ShipAPICalls.getShip Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Retrieve the cargo of a ship under your agent's ownership.
     * https://spacetraders.stoplight.io/docs/spacetraders/1324f523e2c9c-get-ship-cargo
     * @param {string} shipSymbol_ The name of the ship to get cargo details about.
     */
    getShipCargo: async function (shipSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + '/cargo', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
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
                        title: "ShipAPICalls.getShipCargo Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Attempt to move your ship into orbit at its current location. The request will only
     * succeed if your ship is capable of moving into orbit at the time of the request.
     * https://spacetraders.stoplight.io/docs/spacetraders/08777d60b6197-orbit-ship
     * @param {string} shipSymbol_ The name of the ship to put into orbit.
     */
    orbitShip: async function (shipSymbol_) {
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
                        title: "ShipAPICalls.orbitShip Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Attempt to refine the raw materials on your ship. The request will only succeed if your ship is capable of refining at the time of the request.
     * In order to be able to refine, a ship must have goods that can be refined and have a [Refinery] module that can refine it.
     * When refining, 30 basic goods will be converted into 10 processed goods.
     * https://spacetraders.stoplight.io/docs/spacetraders/c42b57743a49f-ship-refine
     * @param {string} shipSymbol_ The name of the ship to perform the refining.
     * @param {string} produce_ The type of good to produce out of the refining process. Allowed types:
     * IRON, COPPER, SILVER, GOLD, ALUMINUM, PLATINUM, URANITE, MERITIUM, FUEL
     */
    shipRefine: async function (shipSymbol_, produce_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /refine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                'produce': produce_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.shipRefine Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Command a ship to chart the waypoint at its current location. Most waypoints in the universe are uncharted by default.
     * These waypoints have their traits hidden until they have been charted by a ship. Charting a waypoint will record your
     * agent as the one who created the chart, and all other agents would also be able to see the waypoint's traits.
     * https://spacetraders.stoplight.io/docs/spacetraders/177f127c7f888-create-chart
     * @param {string} shipSymbol_ The name of the ship to create the waypoint chart.
     */
    createChart: async function (shipSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /chart', {
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
                        title: "ShipAPICalls.createChart Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Retrieve the details of your ship's reactor cooldown. Response returns a 204 status code (no-content) when the ship has no cooldown.
     * https://spacetraders.stoplight.io/docs/spacetraders/d20ef14bc0742-get-ship-cooldown
     * @param {string} shipSymbol_ The name of the ship to view the cooldown of.
     */
    getShipCooldown: async function (shipSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /cooldown', {
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
                        title: "ShipAPICalls.getShipCooldown Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Attempt to dock your ship at its current location. Docking will only succeed if your ship is capable of docking at the time of request.
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