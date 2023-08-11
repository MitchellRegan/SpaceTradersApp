import sa from './server-address';

/**
 * Container for all of the API calls used for viewing and managing the user's fleet of ships.
 */
const ShipAPICalls = {
    /**
     * Returns a paginated list of all ships under your agent's ownership.
     * https://spacetraders.stoplight.io/docs/spacetraders/64435cafd9005-list-ships
     * @param {number} resultsPerPage_ How many ships will be returned per page. Defaults to 20. Range is 1-20.
     * @param {number} pageNum_ The page number of the list of ships to view. Defaults to 1.
     */
    listShips: async function (resultsPerPage_ = 20, pageNum_ = 1) {
        const localData = require("../save data/user-preferences.json");

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
        const localData = require("../save data/user-preferences.json");

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
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/' + shipSymbol_, {
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
        const localData = require("../save data/user-preferences.json");

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
        const localData = require("../save data/user-preferences.json");

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
        const localData = require("../save data/user-preferences.json");

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
        const localData = require("../save data/user-preferences.json");

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
        const localData = require("../save data/user-preferences.json");

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
     * https://spacetraders.stoplight.io/docs/spacetraders/a1061ae6545d5-dock-ship
     * @param {string} shipSymbol_ The name of the ship to dock.
     */
    dockShip: async function (shipSymbol_) {
        const localData = require("../save data/user-preferences.json");

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
     * Create surveys on a waypoint that can be extracted such as asteroid fields. A survey focuses on specific types of deposits from the
     * extracted location. A ship must have the [Surveyor] mount installed in order to use this function.
     * https://spacetraders.stoplight.io/docs/spacetraders/6b7cb030c3b91-create-survey
     * @param {string} shipSymbol_ The name of the ship that will create the survey.
     */
    createSurvey: async function (shipSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /survey', {
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
                        title: "ShipAPICalls.createSurvey Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Extract resources from a waypoint that can be extracted, such as asteroid fields, into your ship. Send an optional survey as the payload
     * to target specific yields.The ship must be in orbit to be able to extract and must have mining equipments installed that can extract goods,
     * such as the [Gas Siphon] mount for gas-based goods or [Mining Laser] mount for ore-based goods.
     * https://spacetraders.stoplight.io/docs/spacetraders/b3931d097608d-extract-resources
     * @param {string} shipSymbol_ The name of the ship that will extract resources.
     * @param {string} surveySig_ The unique signature for the location of the survey.
     * @param {string} waypointSymbol_ The name of the waypoint where the survey is.
     * @param {[object]} deposits_ A list of objects for each resource found at this survey.
     * @param {string} expires_ The date-time string for when this survey expires.
     * @param {string} size_ The size of the deposit. Allowed values: SMALL, MODERATE, LARGE
     */
    extractResources: async function (shipSymbol_, surveySig_, waypointSymbol_, deposits_, expires_, size_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                "survey": {
                    "signature": surveySig_,
                    "symbol": waypointSymbol_,
                    "deposits": deposits_,
                    "expiration": expires_,
                    "size": size_
                }
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.extractResources Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Jettison cargo from your ship's cargo hold.
     * https://spacetraders.stoplight.io/docs/spacetraders/3b0f8b69f56ac-jettison-cargo
     * @param {string} shipSymbol_ The name of the ship that holds the cargo.
     * @param {string} cargo_ The symbol for the type of cargo to jettison.
     * @param {number} amount_ The number of resources to jettison.
     */
    jettisonCargo: async function (shipSymbol_, cargo_, amount_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /jettison', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                "symbol": cargo_,
                "units": amount_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.jettisonCargo Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Jump your ship instantly to a target system. The ship must be in orbit to use this function. When used while in orbit of a Jump Gate
     * waypoint, any ship can use this command, jumping to the target system's Jump Gate waypoint.
     * When used elsewhere, jumping requires the ship to have a [Jump Drive] module installed and consumes a unit of antimatter from the ship's
     * cargo. The command will fail if there is no antimatter to consume. When jumping via the [Jump Drive] module, the ship ends up at its
     * largest source of energy in the system, such as a gas planet or a jump gate.
     * https://spacetraders.stoplight.io/docs/spacetraders/19f0dd2d633de-jump-ship
     * @param {string} shipSymbol_ The name of the ship that will perform the jump.
     * @param {string} systemSymbol_ The name of the system to jump to.
     */
    jumpShip: async function (shipSymbol_, systemSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /jump', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                systemSymbol: systemSymbol_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.jumpShip Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Navigate to a target destination. The ship must be in orbit to use this function. The destination waypoint must be within
     * the same system as the ship's current location. Navigating will consume the necessary fuel from the ship's manifest based
     * on the distance to the target waypoint.
     * The returned response will detail the route information including the expected time of arrival. Most ship actions are
     * unavailable until the ship has arrived at it's destination.
     * https://spacetraders.stoplight.io/docs/spacetraders/c766b84253edc-navigate-ship
     * @param {string} shipSymbol_ The name of the ship that will be traveling.
     * @param {string} waypointSymbol_ The name of the waypoint to travel to.
     */
    navigateShip: async function (shipSymbol_, waypointSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /navigate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                waypointSymbol: waypointSymbol_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.navigateShip Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Update the nav configuration of a ship.
     * https://spacetraders.stoplight.io/docs/spacetraders/34a305032ec79-patch-ship-nav
     * @param {string} shipSymbol_ The name of the ship to change the flight mode of.
     * @param {string} mode_ The mode to switch your ship into. Options are CRUISE, BURN, DRIFT, STEALTH
     */
    patchShipNav: async function (shipSymbol_, mode_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /nav', {
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
                        title: "ShipAPICalls.patchShipNav Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Get the current nav status of a ship.
     * https://spacetraders.stoplight.io/docs/spacetraders/6e80adc7cc4f5-get-ship-nav
     * @param {string} shipSymbol_ The name of the ship to get the nav status of.
     */
    getShipNav: async function (shipSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /nav', {
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
                        title: "ShipAPICalls.getShipNav Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Warp your ship to a target destination in another system. The ship must be in orbit to use this function and must have the 
     * [Warp Drive] module installed. Warping will consume the necessary fuel from the ship's manifest. The returned response will
     * detail the route information including the expected time of arrival.
     * https://spacetraders.stoplight.io/docs/spacetraders/faaf6603fc732-warp-ship
     * @param {string} shipSymbol_ The name of the ship to warp.
     * @param {string} waypointSymbol_ The name of the waypoint to warp to.
     */
    warpShip: async function (shipSymbol_, waypointSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /warp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
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
                        title: "ShipAPICalls.warpShip Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Sell cargo in your ship to a market that trades this cargo. The ship must be docked in a waypoint that has the
     * [Marketplace] trait in order to use this function.
     * https://spacetraders.stoplight.io/docs/spacetraders/b8ed791381b41-sell-cargo
     * @param {string} shipSymbol_ The name of the ship that holds the cargo.
     * @param {string} cargo_ The symbol for the type of cargo to sell.
     * @param {number} amount_ The number of resources to sell.
     */
    sellCargo: async function (shipSymbol_, cargo_, amount_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /sell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                "symbol": cargo_,
                "units": amount_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.sellCargo Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Scan for nearby systems, retrieving information on the systems' distance from the ship and their waypoints.
     * Requires a ship to have the [Sensor Array] mount installed to use. The ship will enter a cooldown after using this function.
     * https://spacetraders.stoplight.io/docs/spacetraders/d3358a9202901-scan-systems
     * @param {string} shipSymbol_ The name of the ship to perform the scan.
     */
    scanSystems: async function (shipSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /scan/systems', {
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
                        title: "ShipAPICalls.scanSystems Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Scan for nearby waypoints, retrieving detailed information on each waypoint in range. Scanning uncharted waypoints
     * will allow you to ignore their uncharted state and will list the waypoints' traits. Requires a ship to have the
     * [Sensor Array] mount installed to use. The ship will enter a cooldown after using this function.
     * https://spacetraders.stoplight.io/docs/spacetraders/23dbc0fed17ec-scan-waypoints
     * @param {string} shipSymbol_ The name of the ship to perform the scan.
     */
    scanWaypoints: async function (shipSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /scan/waypoints', {
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
                        title: "ShipAPICalls.scanWaypoints Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Scan for nearby ships, retrieving information for all ships in range. Requires a ship to have the [Sensor Array]
     * mount installed to use. The ship will enter a cooldown after using this function.
     * https://spacetraders.stoplight.io/docs/spacetraders/74da68b7c32a7-scan-ships
     * @param {string} shipSymbol_ The name of the ship to perform the scan.
     */
    scanShips: async function (shipSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /scan/ships', {
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
                        title: "ShipAPICalls.scanShips Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Refuel your ship by buying fuel from the local market. Requires the ship to be docked in a waypoint that has the
     * [Marketplace] trait, and the market must be selling fuel in order to refuel. Each fuel bought from the market
     * replenishes 100 units in your ship's fuel.
     * https://spacetraders.stoplight.io/docs/spacetraders/1bfb58c5239dd-refuel-ship
     * @param {string} shipSymbol_ The name of the ship to refuel.
     * @param {number} amount_ The amount of fuel to purchase. 
     */
    refuelShip: async function (shipSymbol_, amount_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /refuel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                "units": amount_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.refuelShip Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Purchase cargo from a market. The ship must be docked in a waypoint that has [Marketplace] trait, and the market
     * must be selling a good to be able to purchase it. The maximum amount of units of a good that can be purchased in
     * each transaction are denoted by the tradeVolume value of the good, which can be viewed by using the "Get Market"
     * action. Purchased goods are added to the ship's cargo hold.
     * https://spacetraders.stoplight.io/docs/spacetraders/45acbf7dc3005-purchase-cargo
     * @param {string} shipSymbol_ The name of the ship that will hold the cargo.
     * @param {string} cargo_ The symbol for the type of cargo to buy.
     * @param {number} amount_ The number of resources to buy.
     */
    purchaseCargo: async function (shipSymbol_, cargo_, amount_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                "symbol": cargo_,
                "units": amount_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.purchaseCargo Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Transfer cargo between ships. The receiving ship must be in the same waypoint as the transferring ship, and it must
     * able to hold the additional cargo after the transfer is complete. Both ships also must be in the same state, either
     * both are docked or both are orbiting. The response body's cargo shows the cargo of the transferring ship after the
     * transfer is complete.
     * https://spacetraders.stoplight.io/docs/spacetraders/78b22e13e1ea1-transfer-cargo
     * @param {string} shipSymbol_ The name of the ship that is currently holding the cargo to transfer.
     * @param {string} cargo_ The symbol for the type of cargo to transfer.
     * @param {number} amount_ The number of resources to transfer.
     * @param {string} targetShipSymbol_ The name of the ship to transfer the cargo to.
     */
    transferCargo: async function (shipSymbol_, cargo_, amount_, targetShipSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                "tradeSymbol": cargo_,
                "units": amount_,
                "shipSymbol": targetShipSymbol_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.transferCargo Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Negotiate a new contract with the HQ. In order to negotiate a new contract, an agent must not have ongoing or offered
     * contracts over the allowed maximum amount. Once a contract is negotiated, it is added to the list of contracts offered
     * to the agent, which the agent can then accept. The ship must be present at a faction's HQ waypoint to negotiate a
     * contract with that faction.
     * https://spacetraders.stoplight.io/docs/spacetraders/1582bafa95003-negotiate-contract
     * @param {string} shipSymbol_ The name of the ship to perform the negotiation.
     */
    negotiateContract: async function (shipSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /negotiate/contract', {
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
                        title: "ShipAPICalls.negotiateContract Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Get the mounts installed on a ship.
     * https://spacetraders.stoplight.io/docs/spacetraders/23ab20baf0ea8-get-mounts
     * @param {string} shipSymbol_ The name of the ship to get the mounts of.
     */
    getMounts: async function (shipSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /mounts', {
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
                        title: "ShipAPICalls.getMounts Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Install a mount on a ship. In order to install a mount, the ship must be docked and located in a waypoint that has a
     * [Shipyard] trait. The ship also must have the mount to install in its cargo hold. An installation fee will be deduced
     * by the Shipyard for installing the mount on the ship.
     * https://spacetraders.stoplight.io/docs/spacetraders/266f3d0591399-install-mount
     * @param {string} shipSymbol_ The name of the ship to install the mount on.
     * @param {string} mountSymbol_ The name of the mount to install on the ship.
     */
    installMount: async function (shipSymbol_, mountSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /mounts/install', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                'symbol': mountSymbol_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.installMount Error",
                        message: error
                    }
                }
            })

        return callData;
    },


    /**
     * Remove a mount from a ship. The ship must be docked in a waypoint that has the [Shipyard] trait, and must have the
     * desired mount that it wish to remove installed. A removal fee will be deduced from the agent by the Shipyard.
     * https://spacetraders.stoplight.io/docs/spacetraders/9380132527c1d-remove-mount
     * @param {string} shipSymbol_ The name of the ship to remove the mount.
     * @param {string} mountSymbol_ The name of the mount to remove from the ship.
     */
    removeMount: async function (shipSymbol_, mountSymbol_) {
        const localData = require("../save data/user-preferences.json");

        let callData = await fetch(sa.address + 'my/ships/ :' + shipSymbol_ + ' /mounts/remove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localData.token
            },
            body: {
                'symbol': mountSymbol_
            }
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                return {
                    error: {
                        title: "ShipAPICalls.removeMount Error",
                        message: error
                    }
                }
            })

        return callData;
    },
}

export default ShipAPICalls;