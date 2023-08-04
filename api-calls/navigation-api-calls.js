/** 
 * Container for all of the API calls used for navigating your ship through space.
 */
import sa from './server-address';
const NavigationAPICalls = {
    /**
     * Returns a paginated list of all systems in the game.
     * https://spacetraders.stoplight.io/docs/spacetraders/94269411483d0-list-systems
     * @param {number} resultsPerPage_ How many systems will be returned per page. Defaults to 20. Range is 1-20.
     * @param {number} pageNum_ The page number of the list of systems to view. Defaults to 1.
     */
    listSystems: async function (resultsPerPage_=20, pageNum_=1) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'systems/?page=' + pageNum_.toString() + '&limit=' + resultsPerPage_.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((error) => {
                return {
                    error: {
                        title: "NavigationAPICalls.listSystems Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Get the details of a specific system.
     * https://spacetraders.stoplight.io/docs/spacetraders/67e77e75c65e7-get-system
     * @param {string} systemSymbol_ The name of the system to get info about.
     */
    getSystem: async function (systemSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'systems/' + systemSymbol_, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((error) => {
                return {
                    error: {
                        title: "NavigationAPICalls.getSystem Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /** 
     * Returns a paginated list of all of the waypoints for a given system. If a waypoint is uncharted, it will return the [Uncharted] trait instead of its actual traits.
     * https://spacetraders.stoplight.io/docs/spacetraders/32186cf59e324-list-waypoints-in-system
     * @param {string} systemSymbol_ The name of the system to get waypoints from.
     * @param {number} resultsPerPage_ How many waypoints will be returned per page. Defaults to 20. Range is 1-20.
     * @param {number} pageNum_ The page number of the list of waypoints to view. Defaults to 1.
     */
    listWaypointsInSystem: async function (systemSymbol_, resultsPerPage_ = 20, pageNum_ = 1) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'systems/' + systemSymbol_ + '/waypoints?page=' + pageNum_.toString() + '&limit=' + resultsPerPage_.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "NavigationAPICalls.listWaypointsInSystem Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * View the details of a waypoint. If the waypoint is uncharted, it will return the [Uncharted] trait instead of its actual traits.
     * https://spacetraders.stoplight.io/docs/spacetraders/58e66f2fa8c82-get-waypoint
     * @param {string} waypointSymbol_ The name of the waypoint to get info about.
     * @param {string} systemSymbol_ The name of the system that the waypoint is in.
     */
    getWaypoint: async function (waypointSymbol_, systemSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'systems/' + systemSymbol_ + '/waypoints/' + waypointSymbol_, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch((error) => {
                return {
                    error: {
                        title: "NavigationAPICalls.getWaypoint Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /** 
     * Retrieve imports, exports, and exchange data from a marketplace. Requires a waypoint that has the [Marketplace] trait to use.
     * Send a ship to the waypoint to access trade good prices and recent transactions.
     * https://spacetraders.stoplight.io/docs/spacetraders/a4fed7a0221e0-get-market
     * @param {string} waypointSymbol_ The name of the waypoint with the [Marketplace] trait.
     * @param {string} systemSymbol_ The name of the system that the market waypoint is in.
     */
    getMarket: async function (waypointSymbol_, systemSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'systems/' + systemSymbol_ + '/waypoints/' + waypointSymbol_ + '/market', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "NavigationAPICalls.getMarket Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /** 
     * Get the shipyard from a waypoint. Requires a waypoint that has the [Shipyard] trait to use.
     * Send a ship to the waypoint to access data on ships that are currently available for purchase and recent transactions.
     * https://spacetraders.stoplight.io/docs/spacetraders/460fe70c0e4c2-get-shipyard
     * @param {string} waypointSymbol_ The name of the waypoint with the [Shipyard] trait.
     * @param {string} systemSymbol_ The name of the system that the shipyard waypoint is in.
     */
    getShipyard: async function (waypointSymbol_, systemSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'systems/' + systemSymbol_ + '/waypoints/' + waypointSymbol_ + '/shipyard', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "NavigationAPICalls.getShipyard Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /** 
     * Get jump gate details for a waypoint. Requires a waypoint of type [JUMP_GATE] to use.
     * The response will return all systems that have a jump gate in range of this jump gate. Those systems can be jumped to from this location.
     * https://spacetraders.stoplight.io/docs/spacetraders/decd101af6414-get-jump-gate
     * @param {string} waypointSymbol_ The name of the waypoint with the [JUMP_GATE] trait.
     * @param {string} systemSymbol_ The name of the system that the jump gate waypoint is in.
     */
    getJumpGate: async function (waypointSymbol_, systemSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'systems/' + systemSymbol_ + '/waypoints/' + waypointSymbol_ + '/jump-gate', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "NavigationAPICalls.getJumpGate Error",
                        message: error
                    }
                }
            })

        return callData;
    },
}

export default NavigationAPICalls;