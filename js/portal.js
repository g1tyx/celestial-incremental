﻿var tree = [["i", "in", "s"], ["cp"]]
addLayer("po", {
    name: "Portal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        lastUniverse: '',

        featureSlots: new Decimal(1),
        featureSlotsMax: new Decimal(1),
        nextResetSlots: new Decimal(1),
        dice: false,
        rocketFuel: false,
        hex: false,
        breakInfinity: false,
        realmMods: false,

        keepOTFS: false,

        pointHalt: new Decimal(1),
        pointHaltInput: new Decimal(1),

        halterInput: new Decimal(1),
        halterEffects: [new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),new Decimal(1),],
        /*
            0 - Points
            1 - Factor Power
            2 - Prestige Points
            3 - Leaves
            4 - Trees
            5 - Grass
            6 - Grasshoppers
            7 - Fertilizer
            8 - Code Experience
            9 - Lines of Code
            10 - Mods
        */
       halterIndex: new Decimal(0),
       halterText: ["", "", "", "", "", "", "", "", "", "", ""],

    }
    },
    automate() {
    },
    nodeStyle() {
    },
    tooltip: "Portal",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.points.gte(Number.MAX_VALUE))
        {
            player.in.reachedInfinity = true
        }

        if (player.po.pointHaltInput.gte(1)) 
        {
            if (player.po.pointHaltInput.neq(player.po.pointHalt))
            {
                player.rm.halterBoostCheck = false
            }
            player.po.pointHalt = player.po.pointHaltInput
        }
        if (player.po.pointHaltInput.lt(1)) player.po.pointHalt = new Decimal(1)

        let oldVal = player.po.pointHaltInput
        

        player.po.featureSlotsMax = new Decimal(1)
        if ((inChallenge("tad", 11) && hasUpgrade("de", 14)) || hasUpgrade("i", 27)) player.po.featureSlotsMax = player.po.featureSlotsMax.add(1)

        player.po.featureSlots = player.po.featureSlotsMax
        if (player.po.dice)
        {
            player.po.featureSlots = player.po.featureSlots.sub(1)
        }
        if (player.po.rocketFuel)
        {
            player.po.featureSlots = player.po.featureSlots.sub(1)
        }
        if (player.po.hex)
        {
            player.po.featureSlots = player.po.featureSlots.sub(1)
        }
        if (player.po.breakInfinity)
        {
            player.in.breakInfinity = true
            player.po.featureSlots = player.po.featureSlots.sub(1)
        } else
        {
            player.in.breakInfinity = false
        }
        if (player.po.realmMods)
        {
            player.po.featureSlots = player.po.featureSlots.sub(2)
        }

        //IF ADDING NEW OTFS - REMEMBER TO EXIT THEM AFTER LEAVING TAVS DOMAIN

        if (player.subtabs["po"]['stuff'] == 'LORE' && player.tab != "lo")
        {
            player.tab = "lo"
            player.subtabs["po"]['stuff'] = 'Portals'
        }

        if (inChallenge("tad", 11) && player.po.breakInfinity)
        {
            player.po.breakInfinity = false
            player.po.featureSlots = player.po.featureSlots.sub(1)
        }

        player.po.halterText =
        [
            "Currently divides point gain by /" + format(player.po.halterEffects[0]),
            "Currently divides factor power gain by /" + format(player.po.halterEffects[1]),
            "Currently divides prestige points gain by /" + format(player.po.halterEffects[2]),
            "Currently divides leaf gain by /" + format(player.po.halterEffects[3]),
            "Currently divides trees gain by /" + format(player.po.halterEffects[4]),
            "Currently divides grass gain by /" + format(player.po.halterEffects[5]),
            "Currently divides grasshoppers gain by /" + format(player.po.halterEffects[6]),
            "Currently divides fertilizer gain by /" + format(player.po.halterEffects[7]),
            "Currently divides code experience gain by /" + format(player.po.halterEffects[8]),
            "Currently divides lines of code gain by /" + format(player.po.halterEffects[9]),
            "Currently divides mod gain by /" + format(player.po.halterEffects[10]),
        ]
        /*
            0 - Points
            1 - Factor Power
            2 - Prestige Points
            3 - Leaves
            4 - Trees
            5 - Grass
            6 - Grasshoppers
            7 - Fertilizer
            8 - Code Experience
            9 - Lines of Code
            10 - Mods
        */

        if (player.po.halterInput.gte(1)) 
        {
            if (player.po.halterInput.neq(player.po.halterEffects[player.po.halterIndex]))
            {
                player.rm.halterBoostCheck = false
            }
        }
        if (player.po.halterInput.lt(1)) player.po.halterEffects[player.po.halterIndex] = new Decimal(1)
        
    },
    branches: ["branch"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = player.po.lastUniverse
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Keep OTFs on reset. (Currently off)" },
            display() {
                return "You only gain them back once you reach the req.";
            },
            canClick() { return true },
            unlocked() { return hasMilestone("ip", 18) && !player.po.keepOTFS},
            onClick() { 
                player.po.keepOTFS = true
            },
            style: {
                width: '200px',
                "min-height": '75px',
            },
        },
        3: {
            title() { return "Don't keep OTFs on reset. (Currently on)" },
            canClick() { return true },
            unlocked() { return hasMilestone("ip", 18) && player.po.keepOTFS},
            onClick() { 
                player.po.keepOTFS = false
            },
            style: {
                width: '200px',
                "min-height": '75px',
            },
        },
        4: {
            title() { return "<h3>Lower" },
            canClick() { return player.po.halterIndex.gt(0) },
            unlocked() { return true },
            onClick() {
                player.po.halterIndex = player.po.halterIndex.sub(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        5: {
            title() { return "<h3>Increase" },
            canClick() { return player.po.halterIndex.lt(10) },
            unlocked() { return true },
            onClick() {
                player.po.halterIndex = player.po.halterIndex.add(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
        6: {
            title() { return "<h3>Apply Halt" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.po.halterEffects[player.po.halterIndex] = player.po.halterInput
            },
            style: { width: '100px', "min-height": '100px' },
        },
        7: {
            title() { return "<h3>Reset Halts" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.po.halterEffects.length; i++)
                {
                    player.po.halterEffects[i] = new Decimal(1)
                }
            },
            style: { width: '100px', "min-height": '100px' },
        },
        8: {
            title() { return "<h3>View Halts" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                callAlert(
                    "Currently divides point gain by /" + format(player.po.halterEffects[0]) + "\n" +
                    "Currently divides factor power gain by /" + format(player.po.halterEffects[1]) + "\n" +
                    "Currently divides prestige points gain by /" + format(player.po.halterEffects[2]) + "\n" +
                    "Currently divides leaf gain by /" + format(player.po.halterEffects[3]) + "\n" +
                    "Currently divides trees gain by /" + format(player.po.halterEffects[4]) + "\n" +
                    "Currently divides grass gain by /" + format(player.po.halterEffects[5]) + "\n" +
                    "Currently divides grasshoppers gain by /" + format(player.po.halterEffects[6]) + "\n" +
                    "Currently divides fertilizer gain by /" + format(player.po.halterEffects[7]) + "\n" +
                    "Currently divides code experience gain by /" + format(player.po.halterEffects[8]) + "\n" +
                    "Currently divides lines of code gain by /" + format(player.po.halterEffects[9]) + "\n" +
                    "Currently divides mod gain by /" + format(player.po.halterEffects[10]) + "\n" 
                )
            },
            style: { width: '100px', "min-height": '100px' },
        },
        11: {
            title() { return "<h1>Dice" },
            display() {
                return player.po.dice ? "<h1>The die will decide your fate.<br>On" : "<h1>The die will decide your fate.<br>Off<br><h2>Req: 1e150 points";
            },
            canClick() { return player.po.featureSlots.gte(1) && (player.points.gte(1e150) || inChallenge("tad", 11)) && (!inChallenge("ip", 14) || inChallenge("ip", 14) && player.r.pent.gte(15)) },
            unlocked() { return !inChallenge("ip", 11) && !inChallenge("ip", 13) && !inChallenge("ip", 15) && !inChallenge("ip", 16) },
            onClick() { 
                player.po.dice = true
            },
            style: {
                width: '200px',
                "min-height": '200px',
                background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)",
                "background-origin": "border-box",
                "border-color": "#0061ff",
            },
        },
        12: {
            title() { return "<h1>Rocket Fuel" },
            display() {
                return player.po.rocketFuel ? "<h1>Fly me to the moon.<br>On" : "<h1>Fly me to the moon.<br>Off<br><h2>Req: 1e170 points";
            },
            canClick() { return player.po.featureSlots.gte(1) && (player.points.gte(1e170) || inChallenge("tad", 11)) && (!inChallenge("ip", 14) || inChallenge("ip", 14) && player.r.pent.gte(15)) },
            unlocked() { return !inChallenge("ip", 11) && !inChallenge("ip", 13) && !inChallenge("ip", 15) && !inChallenge("ip", 16)  },
            onClick() { 
                player.po.rocketFuel = true
            },
            style() {
                function degreesToRadians(degrees) {
                    return (degrees * Math.PI) / 180;
                }
                
                // Define the base hue value for dark blue (between 0 and 360 degrees)
                const darkBlueHue = 210;
                
                // Define the base lightness values for dark blue and light gray (between 0 and 100%)
                const darkBlueLightness = 20; // Adjust for darker blue
                const lightGrayLightness = 80; // Adjust for lighter gray
                
                // Calculate the current lightness value based on time (smoothly oscillating between dark blue and light gray)
                const currentTime = new Date().getTime();
                const lightnessOffset = (Math.sin(currentTime / 400) + 1) / 9; // Adjust the divisor to change oscillation speed
                const lightness1 = darkBlueLightness + (lightnessOffset * (lightGrayLightness - darkBlueLightness));
                const lightness2 = lightGrayLightness - (lightnessOffset * (lightGrayLightness - darkBlueLightness));
                
                // Create the gradient string using the HSL colors
                const gradient = `linear-gradient(to right, hsl(${darkBlueHue}, 80%, ${lightness1}%), hsl(${darkBlueHue}, 80%, ${lightness2}%))`;
                
                return {
                    width: '200px',
                    "min-height": '200px',
                    background: gradient,
                    "background-origin": "border-box",
                    "border-color": "#119B35",
                    color: "#06366e",
                }
            },
        },
        13: {
            title() { return "<h1>Hex" },
            display() {
                return player.po.hex ? "<h1>The number 6.<br>On" : "<h1>The number 6.<br>Off<br><h2>Req: Challenge III Completion";
            },
            canClick() { return player.po.featureSlots.gte(1) && (!inChallenge("ip", 14) || inChallenge("ip", 14) && player.r.pent.gte(15))},
            unlocked() { return (!inChallenge("ip", 11) && hasChallenge("ip", 13)) && (!inChallenge("ip", 13) && hasChallenge("ip", 13))  && (!inChallenge("ip", 15) && hasChallenge("ip", 13))  && (!inChallenge("ip", 16) && hasChallenge("ip", 13))     },
            onClick() { 
                player.po.hex = true
            },
            style: {
                width: '200px',
                "min-height": '200px',
                "background-color": "black",
                "background-origin": "border-box",
                "color": "white",
            },
        },
        14: {
            title() { return "<h1>BREAK INFINITY" },
            display() {
                return player.po.breakInfinity ? "<h1>Get past limits.<br>On" : "<h1>Get past limits.<br>Off<br><h2>Req: Tav Defeated<br>Can't activate in Tav's domain";
            },
            canClick() { return player.po.featureSlots.gte(1) && player.in.unlockedBreak && !inChallenge("tad", 11)},
            unlocked() { return player.in.unlockedBreak },
            onClick() { 
                player.po.breakInfinity = true
            },
            style: {
                width: '200px',
                "min-height": '200px',
                "border-color": "white",
                "background-color": "#7c5423",
                "background-origin": "border-box",
                "color": "white",
            },
        },
        15: {
            title() { return "<h1>Realm Mods" },
            display() {
                return player.po.realmMods ? "<h2>The possibilities are endless. (Point gain gets raised to the ^0.2)<br>On" : "<h2>Feel the realms.<br>Off<br><h3>Req: 1.79e308 replicanti and a cante core (which gets spent)<br>(You have " + formatWhole(player.ca.canteCores) + " cores)<br>Takes up 2 OTF slots";
            },
            canClick() { return player.po.featureSlots.gte(2) && player.ca.replicanti.gte(1.79e308) && player.ca.canteCores.gte(1)},
            unlocked() { return hasUpgrade("bi", 27) },
            onClick() { 
                player.in.infinityPause = new Decimal(8)
                player.po.keepOTFS = true
                player.po.realmMods = true
                player.ca.canteCores = player.ca.canteCores.sub(1)
            },
            style: {
                width: '200px',
                "min-height": '200px',
                "border-color": "white",
                "background-image": "linear-gradient(0deg, #770000, #775400, #747700, #147700, #00772A, #007769, #004677, #000877, #330077, #710077)",
                "background-origin": "border-box",
                "color": "white",
            },
        },
    },
    bars: {
        infbar: {
            unlocked() { return !player.in.unlockedInfinity },
            direction: UP,
            width: 476,
            height: 476,
            progress() {
                return player.points.log10().div("308")
            },
            fillStyle: {
                "background-color": "#e81cff",
            },
            display() {
                return "<h1>" + format(player.points.log10().div("308").mul(100)) + "%</h5>";
            },
        },
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Otherworldly Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return !inChallenge("ip", 11) ? "You have <h3>" + formatWhole(player.po.featureSlots) + "/" + formatWhole(player.po.featureSlotsMax) + "</h3> free feature slots." : "No features for you!"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return inChallenge("ip", 14) ? "You can pick an OTF once you are at pent 15." : ""}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["clickable", 2], ["clickable", 3]]],
                        ["blank", "25px"],
                        ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15]]],
                ]

            },
            "Portals": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["bar", "infbar"]]],
                        ["blank", "25px"],
                        ["tree", tree],
                ]

            },
            "Halter": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("ip", 23)},
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>Currently divides point gain by /" + format(player.po.pointHalt) + "." }],
                    ["text-input", "pointHaltInput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>Enter a number greater than 1. You thought you could get away with dividing by 0?" }],
                    ["raw-html", function () { return "<h4>This can help by letting you progress in OTFS while infinity is fixed." }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                ]

            },
            "ADVANCED HALTER": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("ip", 23) && player.ev.evolutionsUnlocked[6]},
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "<h3>" + player.po.halterText[player.po.halterIndex]}],
                    ["text-input", "halterInput", {
                        color: "var(--color)",
                        width: "400px",
                        "font-family": "Calibri",
                        "text-align": "left",
                        "font-size": "32px",
                        border: "2px solid #ffffff17",
                        background: "var(--background)",
                    }],
                    ["blank", "25px"],
                        ["row", [["clickable", 4], ["clickable", 5], ["clickable", 6], ["clickable", 7], ["clickable", 8]]],
                        ["raw-html", function () { return "<h3>Enter a number greater than 1. You thought you could get away with dividing by 0?" }],
                    ["raw-html", function () { return "<h4>This can help by letting you progress in OTFS while infinity is fixed. (and a whole bunch of other stuff eventually)" }],
                    ["blank", "25px"],
                ]

            },
        },
    }, 

    tabFormat: [
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true }
})