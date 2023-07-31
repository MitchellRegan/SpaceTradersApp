/** 
 * Container for all of the API calls used for navigating your ship through space.
 */
const NavigationAPICalls = {
    /**
     * API call to get your current waypoint location.
     * @param {string} bearerToken_ The user's bearer token for authorization.
     */
    getCurrentLoc: async function (bearerToken_) {
        let callData = await fetch('https://api.spacetraders.io/v2/systems/ :systemSymbol /waypoints/ :waypointSymbol', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log("NavigationAPICalls.getCurrentLoc error: " + error);
            })

        return callData;
    },


    /** 
     * API call to get a list of all systems in the universe.
     * @param {string} bearerToken_ The user's bearer token for authorization.
     * @returns List of system waypoints, their unique symbol names, their (x,y) coordinates, traits, and the locations within their orbit (i.e. things like moons).
     */
    getSystemLocs: async function (bearerToken_) {
        let callData = await fetch('https://api.spacetraders.io/v2/systems/ :systemSymbol /waypoints', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken_
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log("NavigationAPICalls.getSystemLocs error: " + error);
            })

        return callData;
    },
    
    
    /**
     * API call to go into orbit at the current location.
     * @param {string} bearerToken_ The user's bearer token for authorization.
     */
    goIntoOrbit: async function (bearerToken_){
        let callData = await fetch('https://api.spacetraders.io/v2/my/ships/ :shipSymbol /orbit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log("NavigationAPICalls.goIntoOrbit error: " + error);
            })

        return callData;
    },
    
    
    /**
     * API call to dock your ship at the current location.
     * @param {string} bearerToken_ The user's bearer token for authorization.
     */
    dockShip: async function (bearerToken_){
        let callData = await fetch('https://api.spacetraders.io/v2/my/ships/ :shipSymbol /dock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log("NavigationAPICalls.dockShip error: " + error);
            })

        return callData;
    },


    /**
     * API call to change your ship's flight mode.
     * @param {string} bearerToken_ The user's bearer token for authorization.
     * @param {string} mode_ The mode to switch your ship into. Options are "CRUISE", "BURN", "DRIFT", "STEALTH".
     */
    setShipFlightMode: async function (bearerToken_, mode_) {
        let callData = await fetch('https://api.spacetraders.io/v2/my/ships/ :shipSymbol /nav', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken_
            },
            body: JSON.stringify({
                flightMode: mode_
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log("NavigationAPICalls.setShipFlightMode error: " + error);
            })

        return callData;
    }
}

export default NavigationAPICalls;