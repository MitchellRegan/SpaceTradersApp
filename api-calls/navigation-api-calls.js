/** 
 * Container for all of the API calls used for navigating your ship through space.
 */
import sa from './server-address';
const NavigationAPICalls = {
    /**
     * API call to get info about a specific system.
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
     * API call to get info about a specific waypoint.
     * @param {string} waypointSymbol_ The name of the symbol to get info about.
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
     * API call to get a list of all systems in the universe.
     * @param {string} systemSymbol_ The name of the system to get waypoints from.
     * @returns List of system waypoints, their unique symbol names, their (x,y) coordinates, traits, and the locations within their orbit (i.e. things like moons).
     */
    getSystemsWaypointList: async function (systemSymbol_) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + 'systems/' + systemSymbol_ + '/waypoints', {
            headers: {
                'Content-Type': 'application/json',
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
                        title: "NavigationAPICalls.getSystemWaypointsList Error",
                        message: error
                    }
                }
            })

        return callData;
    }
}

export default NavigationAPICalls;