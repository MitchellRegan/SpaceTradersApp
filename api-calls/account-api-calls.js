/**
 * Container for all of the API calls used for managing your user account.
 */
const AccountAPICalls = {
    /** 
     * API call to create a new account for SpaceTraders.
     * @param {string} username_ The username of the player.
     * @param {string} userFaction_ The name of the faction that the user wants to join.
     */
    makeNewAccount: async function (username_, userFaction_) {
        let callData = await fetch('https://api.spacetraders.io/v2/register', {
            method: 'POST',
            body: JSON.stringify({
                symbol: username_,
                faction: userFaction_
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log("AccountAPICalls.makeNewAccount error: " + error);
            })

        return callData;
    },


    /**
     * Function to store the username and bearer token locally.
     * @param {string} username_
     * @param {string} bearerToken_
     */
    userLogin: async function (username_, bearerToken_) {
        var data = require("../user-preferences.json");
        console.log("Params: " + username_ + ", " + bearerToken_)
        console.log("Username Before: " + data.username);
        console.log("Faction Before: " + data.faction);
        console.log("Bearer Token Before: " + data.bearerToken);

        data.username = username_;
        data.bearerToken = bearerToken_;
        console.log("Username After: " + data.username);
        console.log("Faction After: " + data.faction);
        console.log("Bearer Token After: " + data.bearerToken);
    },


    /**
     * API call to view details about your user account.
     * @param {string} bearerToken_ The user's bearer token for authorization.
     */
    viewAccountDetails: async function (bearerToken_) {
        let callData = await fetch('https://api.spacetraders.io/v2/my/agent', {
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
                console.log("AccountAPICalls.viewAccountDetails error: " + error);
            })

        return callData;
    }
}

export default AccountAPICalls;