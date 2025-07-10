﻿
addLayer("db", {
    name: "Boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        bestBoosters: new Decimal(0),
        boosters: new Decimal(0),
        boosterEffect: new Decimal(0),
        boosterReq: new Decimal(1e9),

        //milestones
        milestone1Effect: new Decimal(1),
        milestone2Effect: new Decimal(1),
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg, #6e64c4 0%,rgb(86, 84, 192) 50%,rgb(37, 101, 153) 100%)",
            "background-origin": "border-box",
            "border-color": "#9f98d4",
            "color": "#eaf6f7",
        };
    },
    tooltip: "Boosters",
    branches: [["le", "#4f0694"]],
    color: "black",
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.db.boosters.lt(3)) player.db.boosterReq = Decimal.floor(Decimal.pow(4, player.db.boosters.add(1)).mul(1e8)).floor()
        if (player.db.boosters.gte(3)) player.db.boosterReq = Decimal.floor(Decimal.pow(6, player.db.boosters.pow(1.25).add(1)).mul(1e10)).floor()
        if (player.db.boosters.gte(7)) player.db.boosterReq = Decimal.floor(Decimal.pow(9, player.db.boosters.pow(1.4).add(1)).mul(1e10)).floor()

        if (player.le.punchcards[17]) player.db.boosterReq = player.db.boosterReq.div(player.le.punchcardsEffect[17])

        player.db.boosterEffect = Decimal.pow(5, player.db.boosters)

        if (player.db.boosters.gt(player.db.bestBoosters)) { 
            player.db.bestBoosters = player.db.boosters
        }

        player.db.milestone1Effect = Decimal.pow(100, player.db.boosters.pow(0.75))
        player.db.milestone2Effect = player.du.points.add(1).pow(0.15).div(30).add(1)
    },
    bars: {},

    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "du"
            },
            style: { width: "100px", minHeight: "50px", color: "white", borderRadius: "10px", border: "2px solid #0a593c" },
        },
        11: {
            title() { return "<h2>Reset previous content for boosters.<br>Req: " + format(player.db.boosterReq) + " points</h2>" },
            canClick() { return player.du.points.gte(player.db.boosterReq) },
            unlocked() { return true },
            onClick() {
                player.db.boosters = player.db.boosters.add(1)
                player.points = player.points.sub(player.db.boosterReq)

                player.dg.generatorPause = new Decimal(10)
            },
            onHold() { clickClickable(this.layer, this.id) },
            style() {
                let look = {width: "400px", minHeight: "100px", borderRadius: "15px", color: "white", border: "2px solid #6e64c4", margin: "1px"}
                !this.canClick() ? look.backgroundColor =  "#361e1e" : look.backgroundColor = "black"
                return look
            }
        },
        
    },
    upgrades: {},
    buyables: {
   
    },
    milestones: {
        11: {
            requirementDescription: "<h3>1 Booster",
            effectDescription() { return "Boosters divide the eclipse shard requirement<br>Currently: /" + format(player.db.milestone1Effect) + "." },
            done() { return player.db.boosters.gte(1) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>3 Boosters",
            effectDescription() { return "Point gain is boosted by itself<br>Currently: x" + format(player.db.milestone2Effect) + "." },
            done() { return player.db.boosters.gte(3) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>7 Boosters",
            effectDescription() { return "Boost rank points by x1000, tier points by x100, tetr points by x10." },
            done() { return player.db.boosters.gte(7) },
            style: { width: '800px', "min-height": '75px' },
        },

        101: {
            requirementDescription: "<h3>1 Best Booster",
            effectDescription: "x1.25 to check back XP gain.",
            done() { return player.db.bestBoosters.gte(1) },
            style: { width: '800px', "min-height": '75px' },
        },
        102: {
            requirementDescription: "<h3>8 Best Booster",
            effectDescription: "x1.2 to starmetal alloy and eclipse shard gain.",
            done() { return player.db.bestBoosters.gte(8) },
            style: { width: '800px', "min-height": '75px' },
        },
    },
    challenges: {
    },
    infoboxes: {

    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { border: "2px solid #6e64c4", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ['blank', '25px'],
                    ["raw-html", function () { return "You have <h3>" + formatWhole(player.db.boosters) + "</h3> boosters, which boost point gain by x" + format(player.db.boosterEffect) + "." }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ["raw-html", function () { return "(Best boosters: " + formatWhole(player.db.bestBoosters) + ")" }, { color: "white", fontSize: "24px", fontFamily: "monospace" }],
                    ['blank', '25px'],
                    ["row", [["clickable", 11]]],
                    ['blank', '25px'],

                ]
            },
            "Milestones": {
                buttonStyle() { return { border: "2px solid #6e64c4", borderRadius: "10px" } },
                unlocked() { return true },
                content:
                [
                    ['blank', '25px'],
                    ["raw-html", function () { return "<h3>Milestones" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["milestone", 11]]],
                    ["row", [["milestone", 12]]],
                    ["row", [["milestone", 13]]],
                    ['blank', '25px'],
                    ["raw-html", function () { return "<h3>Permanent Milestones" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["milestone", 101]]],
                    ["row", [["milestone", 102]]],

                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.du.points) + "</h3> dark celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.du.pointGain) + "</h3> dark celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return "UNAVOIDABLE SOFTCAP: /" + format(player.du.pointSoftcap) + " to gain." }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.du.pointGain.gte(player.du.secondSoftcapStart) ? "UNAVOIDABLE SOFTCAP<sup>2</sup>: Gain past " + format(player.du.secondSoftcapStart) + " is raised by ^" + format(player.du.pointSoftcap2) + "." : "" }, { "color": "red", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.pet.legendaryPetAbilityTimers[0].gt(0) ? "ECLIPSE IS ACTIVE: " + formatTime(player.pet.legendaryPetAbilityTimers[0]) + "." : ""}, { "color": "#FEEF5F", "font-size": "20px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return hasUpgrade("le", 101) }
})