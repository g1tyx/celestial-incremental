﻿addLayer("cof", {
    name: "Core Fragments", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CF", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        coreFragments: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        /*
        0 - Ancient Core Fragments (Points, recplicanti points, factors, perks, prestige points, anonymity) 6
        1 - Natural Core Fragments (Grass, golden grass, trees, grasshop, repli-trees, repli-grass, grass-skip) 6
        2 - Technological Core Fragments (Steel, mods, dice, oil, rocket fuel, activated fuel, rocket parts, ) 7
        3 - Paradox Core Fragments (infinity, negative infinity, infinites, broken infinities, alt-broken infinities, mastery points,) 6
        4 - Radioactive Core Fragments (singularity points, singularity dimensions, core fragments, starmetal alloy, starmetal essence, radiation) 6
        5 - Cosmic Core Fragments (antimatter dimensions, replicanti, stars, star dimensions, planets, space dust) 6
        6 - Temporal Core Fragments (Check back xp, xp boost, pet points, ) 
        7 - Celestial Core Fragments (Secret) 
        */
    }},
    automate() {},
    nodeStyle() {
        return {
            background: "linear-gradient(120deg,rgb(128, 24, 11) 0%,rgb(136, 6, 82) 100%)",
            backgroundOrigin: "border-box",
            borderColor: "#000000",
            color: "#000000",
        };
    },
    tooltip: "Core Fragments",
    branches: ["co"],
    color: "#33031f",
    update(delta) {
        let onepersec = new Decimal(1)
    }, 
    clickables: {},
    bars: {},
    upgrades: { },
    buyables: {},
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {
        stuff: {
            "Zodiac": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["raw-html", function () { return "Coming Soon!" }, { "color": "white", "font-size": "48px", "font-family": "monospace" }],
                ]
            },
        },
    }, 
    tabFormat: [
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && player.ma.matosDefeated }
})
