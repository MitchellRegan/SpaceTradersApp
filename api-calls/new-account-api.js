/*
 * API call to create a new account for SpaceTraders.
 * @
 */
const NewAccountAPI = {
    /* API call to create a new account for SpaceTraders.
     * @param userSymbol_: String for the username.
     * @param userFaction_: String for the name of the user's faction.
     */
    apiCall: async function (userSymbol_, userFaction_) {
        let callData = await fetch('https://api.spacetraders.io/v2/register', {
            method: 'POST',
            body: JSON.stringify({
                symbol: userSymbol_,
                faction: userFaction_
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log("NewAccountAPI.apiCall error: " + error);
            })

        return callData;
    }
}

export default NewAccountAPI;