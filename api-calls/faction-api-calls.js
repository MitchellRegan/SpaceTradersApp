/**
 * Container for all of the API calls used for getting details about factions.
 */
import sa from './server-address';
const FactionAPICalls = {
    /**
     * View the details of a faction.
     * https://spacetraders.stoplight.io/docs/spacetraders/a50decd0f9483-get-faction
     * @param {string} factionSymbol_ The name of the faction to get details about.
     */
    getFaction: async function () {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + '/factions/' + factionSymbol_, {
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
                        title: "FactionAPICalls.getFaction Error",
                        message: error
                    }
                };
            })

        return callData;
    },


    /**
     * Return a paginated list of all the factions in the game.
     * https://spacetraders.stoplight.io/docs/spacetraders/93c5d5e6ad5b0-list-factions
     * @param {number} resultsPerPage_ How many factions will be returned per page. Defaults to 20. Range is 1-20.
     * @param {number} pageNum_ The page number of the list of factions to view. Defaults to 1.
     */
    listFactions: async function (resultsPerPage_ = 20, pageNum_ = 1) {
        const localData = require("../user-preferences.json");

        let callData = await fetch(sa.address + '/factions?page=' + pageNum_.toString() + '&limit=' + resultsPerPage_.toString(), {
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
                        title: "FactionAPICalls.listFactions Error",
                        message: error
                    }
                };
            })

        return callData;
    },
}