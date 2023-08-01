/**
 * Container for all of the API calls used for managing your user account.
 */
const AccountAPICalls = {
    /** 
     * API call to create a new account for SpaceTraders.
     * @param {string} username_ The username of the player.
     * @param {string} userFaction_ The name of the faction that the user wants to join.
     * @param {string} email_ Recovery email tied to the player's account.
     */
    makeNewAccount: async function (username_, userFaction_, email_) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                symbol: username_,
                faction: userFaction_,
                email: email_
            }),
        };

        let callData = await fetch('https://api.spacetraders.io/v2/register', options)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    return {
                        error: {
                            title: "AccountAPICalls.makeNewAccount Error",
                            message: "Code " + data.error.code + ": " + data.error.message
                        }
                    };
                }
                else {
                    return data;
                }
            })
            .catch(error => {
                return {
                    error: {
                        title: "AccountAPICalls.makeNewAccount Error",
                        message: error
                    }
                };
            })

        return callData;
    },


    /**
     * Function to store the username and bearer token locally.
     * @param {string} username_
     * @param {string} bearerToken_
     */
    userLogin: async function (username_, bearerToken_) {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + bearerToken_
            }
        };

        let callData = await fetch('https://api.spacetraders.io/v2/my/agent', options)
            .then(response => response.json())
            .then(data => {
                //If there was some kind of server error, we make a new JSON object with the error message to be displayed on the Error screen.
                if (data.error) {
                    return {
                        error: {
                            title: "AccountAPICalls.userLogin Error",
                            message: "Code " + data.error.code + ": " + data.error.message
                        }
                    };
                }
                //Saving the username and token locally in the user-preferences.json file
                else if (data.data.symbol == username_.toUpperCase()) {
                    var localData = require("../user-preferences.json");
                    localData.username = username_.toUpperCase();
                    localData.token = bearerToken_;
                    return data;
                }
                //If there wasn't an error but the symbol doesn't match the token, we say that it's an invalid login
                else {
                    return {
                        invalid: true
                    }
                }
            })
            .catch(error => {
                return {
                    error: {
                        title: "AccountAPICalls.userLogin Error",
                        message: error
                    }
                };
            })

        return callData;
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
                return data;
            })
            .catch((error) => {
                console.log("AccountAPICalls.viewAccountDetails error: " + error);
            })

        return callData;
    }
}

export default AccountAPICalls;