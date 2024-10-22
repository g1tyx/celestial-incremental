﻿var tree = [["ar", "pr", "an"], ["rt", "rg", "gs"], ["oi",]]
addLayer("cp", {
    name: "Alt-Universe 1: Cantepocalypse", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A1", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        unlockedPortal: false,

        replicantiPoints: new Decimal(1),
        replicantiPointsMult: new Decimal(0),
        replicantiPointsTimer: new Decimal(0),
        replicantiPointsTimerReq: new Decimal(3),
        replicantiPointCap: new Decimal(1.79e308),

        replicantiSoftcapEffect: new Decimal(1),
        replicantiSoftcapStart: new Decimal(1000),

        replicantiSoftcap2Effect: new Decimal(1),
        replicantiSoftcap2Start: new Decimal(1e10),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(45deg, #064461 0%, #4a7d94 100%)",
            "background-origin": "border-box",
            "border-color": "#012738",
        }
      },
    
    tooltip: "Alt-Universe 1: Cantepocalypse",
    color: "white",
    branches: ["i"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.subtabs["cp"]['stuff'] == 'Portal')
        {
            player.po.lastUniverse = 'cp'
            player.tab = "po"
            player.subtabs["cp"]['stuff'] = 'Features'
        }

        multAdd = new Decimal(0.01)
        multAdd = multAdd.add(player.ar.rankPointsEffect)
        multAdd = multAdd.mul(buyableEffect("pr", 11))
        if (hasUpgrade("an", 11)) multAdd = multAdd.mul(1.5)
        if (hasUpgrade("an", 12)) multAdd = multAdd.mul(upgradeEffect("an", 12))
        multAdd = multAdd.mul(buyableEffect("rt", 15))
        multAdd = multAdd.mul(player.rg.repliGrassEffect)
        multAdd = multAdd.mul(buyableEffect("rg", 15))
        multAdd = multAdd.mul(player.gs.grassSkipEffect)
        if (hasUpgrade("an", 23)) multAdd = multAdd.mul(upgradeEffect("an", 23))
        if (hasMilestone("gs", 12)) multAdd = multAdd.mul(player.gs.milestone2Effect)
        multAdd = multAdd.mul(player.oi.linkingPowerEffect[0])
        
        player.cp.replicantiPointsTimerReq = new Decimal(3)
        player.cp.replicantiPointsTimerReq = player.cp.replicantiPointsTimerReq.div(buyableEffect("pr", 12))

        player.cp.replicantiSoftcapStart = new Decimal(1000)
        player.cp.replicantiSoftcapStart = player.cp.replicantiSoftcapStart.mul(buyableEffect("pr", 15))
        if (hasUpgrade("an", 14)) player.cp.replicantiSoftcapStart = player.cp.replicantiSoftcapStart.mul(1000)
        if (hasUpgrade("an", 19)) player.cp.replicantiSoftcapStart = player.cp.replicantiSoftcapStart.mul(upgradeEffect("an", 19))
        player.cp.replicantiSoftcapStart = player.cp.replicantiSoftcapStart.mul(buyableEffect("rg", 18))

        player.cp.replicantiSoftcapEffect = player.cp.replicantiPoints.sub(player.cp.replicantiSoftcapStart).pow(0.375)
        player.cp.replicantiSoftcapEffect = player.cp.replicantiSoftcapEffect.div(buyableEffect("pr", 16))
        if (player.cp.replicantiPoints.gte(player.cp.replicantiSoftcapStart))
        {
            multAdd = multAdd.div(player.cp.replicantiSoftcapEffect)
        }

        player.cp.replicantiSoftcap2Start = new Decimal(1e9)
        if (hasUpgrade("an", 14)) player.cp.replicantiSoftcap2Start = player.cp.replicantiSoftcap2Start.mul(1000)
        player.cp.replicantiSoftcap2Start = player.cp.replicantiSoftcap2Start.mul(buyableEffect("rt", 17))
        if (hasUpgrade("an", 19)) player.cp.replicantiSoftcap2Start = player.cp.replicantiSoftcap2Start.mul(upgradeEffect("an", 19))
        player.cp.replicantiSoftcap2Start = player.cp.replicantiSoftcap2Start.mul(buyableEffect("rg", 18))

        player.cp.replicantiSoftcap2Effect = player.cp.replicantiPoints.sub(player.cp.replicantiSoftcap2Start).pow(0.25).div(4)
        player.cp.replicantiSoftcap2Effect = player.cp.replicantiSoftcap2Effect.div(buyableEffect("pr", 16))
        if (hasUpgrade("an", 22)) player.cp.replicantiSoftcap2Effect = player.cp.replicantiSoftcap2Effect.div(upgradeEffect("an", 22))
        if (player.cp.replicantiPoints.gte(player.cp.replicantiSoftcap2Start))
        {
            multAdd = multAdd.div(player.cp.replicantiSoftcap2Effect)
        }

        player.cp.replicantiPointsMult = multAdd.add(1)

        if (player.cap.cantepocalypseUnlock) player.cp.replicantiPointsTimer = player.cp.replicantiPointsTimer.add(onepersec.mul(delta))

        if (player.cp.replicantiPointsTimer.gte(player.cp.replicantiPointsTimerReq))
        {
            layers.cp.replicantiPointMultiply();
        }
    },
    replicantiPointMultiply()
    {
        if (player.cp.replicantiPoints.gte(player.cp.replicantiPointCap))
            {
                player.cp.replicantiPoints = player.cp.replicantiPointCap
            } else {
                player.cp.replicantiPoints = player.cp.replicantiPoints.mul(player.cp.replicantiPointsMult)
                let random = new Decimal(0)
                random = Math.random()
                if (random < player.pr.perkPointsChance)
                {
                    if (hasUpgrade("cp", 11)) player.pr.perkPoints = player.pr.perkPoints.add(player.pr.perkPointsToGet)
                }
                player.cp.replicantiPointsTimer = new Decimal(0)
            }
    },
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "po"
            },
            style: { width: '100px', "min-height": '50px' },
        },
    },
    bars: {
        replicantiBar: {
            unlocked() { return true },
            direction: RIGHT,
            width: 400,
            height: 25,
            progress() {
                return player.cp.replicantiPointsTimer.div(player.cp.replicantiPointsTimerReq)
            },
            fillStyle: {
                "background-color": "#193ceb",
            },
            display() {
                return "Time: " + formatTime(player.cp.replicantiPointsTimer) + "/" + formatTime(player.cp.replicantiPointsTimerReq);
            },
        }, 
    },
    upgrades: {
        11:
        {
            title: "Feature I",
            unlocked() { return true },
            description: "Unlocks Alt-Ranks.",
            cost: new Decimal(2),
            currencyLocation() { return player.cp },
            currencyDisplayName: "Replicanti Points",
            currencyInternalName: "replicantiPoints",
        }, 
        12:
        {
            title: "Feature II",
            unlocked() { return true },
            description: "Unlocks Perks.",
            cost: new Decimal(2500),
            currencyLocation() { return player.cp },
            currencyDisplayName: "Replicanti Points",
            currencyInternalName: "replicantiPoints",
        }, 
        13:
        {
            title: "Feature III",
            unlocked() { return true },
            description: "Unlocks Tetr Points.",
            cost: new Decimal(75000),
            currencyLocation() { return player.cp },
            currencyDisplayName: "Replicanti Points",
            currencyInternalName: "replicantiPoints",
        }, 
        14:
        {
            title: "Feature IV",
            unlocked() { return true },
            description: "Unlocks Anonymity.",
            cost: new Decimal(3e6),
            currencyLocation() { return player.cp },
            currencyDisplayName: "Replicanti Points",
            currencyInternalName: "replicantiPoints",
        }, 
        15:
        {
            title: "Feature V",
            unlocked() { return true },
            description: "Unlocks Repli-Trees.",
            cost: new Decimal(1e20),
            currencyLocation() { return player.cp },
            currencyDisplayName: "Replicanti Points",
            currencyInternalName: "replicantiPoints",
        }, 
        16:
        {
            title: "Feature VI",
            unlocked() { return true },
            description: "Unlocks Repli-Grass.",
            cost: new Decimal(1e30),
            currencyLocation() { return player.cp },
            currencyDisplayName: "Replicanti Points",
            currencyInternalName: "replicantiPoints",
        }, 
        17:
        {
            title: "Feature VII",
            unlocked() { return true },
            description: "Unlocks Grass-Skip.",
            cost: new Decimal(1e40),
            currencyLocation() { return player.cp },
            currencyDisplayName: "Replicanti Points",
            currencyInternalName: "replicantiPoints",
        }, 
        18:
        {
            title: "Feature VIII",
            unlocked() { return true },
            description: "Unlocks THE PORTAL.",
            cost: new Decimal(1e90),
            currencyLocation() { return player.cp },
            currencyDisplayName: "Replicanti Points",
            currencyInternalName: "replicantiPoints",
        }, 
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
            "Features": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["tree", tree],
                ]

            },
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14], ["upgrade", 15], ["upgrade", 16]]],
                        ["row", [["upgrade", 17], ["upgrade", 18]]],
                 ]

            },
            "Softcap": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["raw-html", function () { return "Softcap starts at <h3>" + format(player.cp.replicantiSoftcapStart) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Softcap divides replicanti mult by <h3>/" + format(player.cp.replicantiSoftcapEffect) + "</h3>." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["blank", "25px"],
        ["raw-html", function () { return player.cp.replicantiPoints.gte(player.cp.replicantiSoftcap2Start) ? "Second softcap starts at <h3>" + format(player.cp.replicantiSoftcap2Start) + "</h3>." : ""}, { "color": "#ff4545", "font-size": "20px", "font-family": "monospace" }],
["raw-html", function () { return player.cp.replicantiPoints.gte(player.cp.replicantiSoftcap2Start) ? "Second softcap divides replicanti mult by <h3>/" + format(player.cp.replicantiSoftcap2Effect) + "</h3>." : ""}, { "color": "#ff4545", "font-size": "20px", "font-family": "monospace" }],
                ]

            },
            "Portal": {
                buttonStyle() { return { 'color': 'black', 'border-color': 'purple', background: 'linear-gradient(45deg, #8a00a9, #0061ff)', } },
                unlocked() { return hasUpgrade("cp", 18) },
                content:
                [
                ]
            },
            "Settings": settingsMicrotab,
        },
    }, 

    tabFormat: [

        ["raw-html", function () { return "You have <h3>" + format(player.cp.replicantiPoints) + "</h3> replicanti points." }, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
        ["raw-html", function () { return "Replicanti point Mult: " + format(player.cp.replicantiPointsMult, 4) + "x" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["bar", "replicantiBar"]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.cap.cantepocalypseUnlock}
})
