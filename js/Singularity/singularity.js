﻿var tree3 = [["s"], ["co", "cof"], ["ra", "cs", "sd"], ["sma", "sme"], ["ma"]]
addLayer("s", {
    name: "Genesis", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GE", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        singularityPoints: new Decimal(0),
        singularityPointsToGet: new Decimal(0),
        singularityTime: new Decimal(0),

        singularities: new Decimal(0),
        singularitiesToGet: new Decimal(0),
        singularitiesEffect: new Decimal(1),

        highestSingularityPoints: new Decimal(0),

        sMax: false,
    }},
    automate() {},
    nodeStyle: {
        background: "linear-gradient(140deg, red -20%, black 120%)",
        backgroundOrigin: "border-box",
        borderColor: "#333",
    },
    tooltip: "Genesis",
    color: "#a00",
    branches: ["co"],
    update(delta) {
        let onepersec = new Decimal(1)

        player.s.singularitiesToGet = new Decimal(1)
        if (hasUpgrade("ma", 29)) player.s.singularitiesToGet = player.s.singularityPointsToGet.add(1).log(1e10).add(1).floor()

        if (player.in.infinityPoints.lt(2.5e193)) {
            player.s.singularityPointsToGet = player.in.infinityPoints.pow(0.125).div(15000)
        } else if (player.in.infinityPoints.lt("2.71e3793")) {
            player.s.singularityPointsToGet = player.in.infinityPoints.pow(0.05).mul(2.13e10)
        } else {
            player.s.singularityPointsToGet = player.in.infinityPoints.pow(0.02).mul(1.35e124)
        }

        if (hasUpgrade("ev8", 22)) player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(upgradeEffect("ev8", 22))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(buyableEffect("s", 11))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(buyableEffect("fu", 16))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(player.fu.angerEffect2)
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(levelableEffect("pet", 1104)[1])
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(player.co.cores.radioactive.effect[0])
        if (hasUpgrade("sma", 101)) player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(upgradeEffect("sma", 101))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(levelableEffect("pet", 308)[0])
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(levelableEffect("pet", 404)[1])
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(player.d.diceEffects[18])
        if (hasMilestone("r", 25)) player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(player.r.pentMilestone15Effect)
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(buyableEffect("ma", 17))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(buyableEffect("st", 303))
        player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(player.ma.bestComboDepth3Effect)
        if (player.ma.matosDefeated) player.s.singularityPointsToGet = player.s.singularityPointsToGet.mul(1e40)

        if (player.s.singularityPoints.gte(player.s.highestSingularityPoints)) {
            player.s.highestSingularityPoints = player.s.singularityPoints
        }

        player.s.singularityTime = player.s.singularityTime.add(onepersec.mul(delta))

        player.s.singularitiesEffect = Decimal.pow(1.2, player.s.singularities.add(1).log(10))
    },
    clickables: {},
    bars: {},
    upgrades: {
        11: {
            title: "Singularity Upgrade I",
            unlocked() { return true},
            description: "Boost all pre-OTF currencies by x10.",
            cost: new Decimal("2"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {width: "130px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        12: {
            title: "Singularity Upgrade II",
            unlocked() { return true},
            description: "Gain 4% of all mastery points per second, and gain is based on highest of each currency.",
            cost: new Decimal("50"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {width: "160px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        13: {
            title: "Singularity Upgrade III",
            unlocked() { return true},
            description: "Unlock a new challenge dice upgrade and keep tier 2 dice effects.",
            cost: new Decimal("300"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {width: "134px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        14: {
            title: "Singularity Upgrade IV",
            unlocked() { return true},
            description: "Boost steel, crystal, and time cubes based on unspent singularity points.",
            cost: new Decimal("3600"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            effect() {
                return player.s.singularityPoints.add(1).log(10).pow(5).add(1)
            },
            effectDisplay() { return formatShort(upgradeEffect(this.layer, this.id))+'x' }, // Add formatting to the effect
            style: {width: "160px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        15: {
            title: "Singularity Upgrade V",
            unlocked() { return true},
            description: "Keep anonymity upgrades on grass-skip, oil, and proto memory resets.",
            cost: new Decimal("800000"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {width: "140px", color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        16: {
            title: "Singularity Upgrade VI",
            unlocked() { return true},
            description: "Unlock new Pent milestones.",
            cost: new Decimal("4e7"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        17: {
            title: "Singularity Upgrade VII",
            unlocked() { return true},
            description: "Boost checkback effect by ^5",
            cost: new Decimal("1e10"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        18: {
            title: "Singularity Upgrade VIII",
            unlocked() { return true},
            description: "Keep hex unlocked permanently.",
            cost: new Decimal("5e12"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        19: {
            title: "Singularity Upgrade IX",
            unlocked() { return true},
            description: "Unlock core scraps, and both check back studies are always at max.",
            cost: new Decimal("1e23"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        20: {
            title: "Singularity Upgrade X",
            unlocked() { return true},
            description: "Unlock checkback core.",
            cost: new Decimal("1e27"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        21: {
            title: "Singularity Upgrade X",
            unlocked() { return true},
            description: "Unlock starmetal alloy.",
            cost: new Decimal("1e30"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        22: {
            title: "Singularity Upgrade XI",
            unlocked() { return true},
            description: "Autobuy fun and sfrgt buyables.",
            cost: new Decimal("1e38"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        23: {
            title: "Singularity Upgrade XII",
            unlocked() { return true},
            description: "Unlock more check back content.<br>(CB Level 25,000)",
            cost: new Decimal("1e44"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        24: {
            title: "Singularity Upgrade XIII",
            unlocked() { return true},
            description: "Gain 100% of IP per second.",  
            cost: new Decimal("1e100"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        25: {
            title: "Singularity Upgrade XIV",
            unlocked() { return true},
            description: "Gain 100% of NIP per second.",  
            cost: new Decimal("1e120"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        26: {
            title: "Singularity Upgrade XV",
            unlocked() { return true},
            description: "Unlocks rockets (in universe 2).",  
            cost: new Decimal("1e160"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
        27: {
            title: "Singularity Upgrade XVI",
            unlocked() { return true},
            description: "Autobuys all emotion buyables.",  
            cost: new Decimal("1e300"),
            currencyLocation() { return player.s },
            currencyDisplayName: "Singularity Points",
            currencyInternalName: "singularityPoints",
            style: {color: "rgba(0,0,0,0.8)", border: "3px solid rgba(0,0,0,0.5)", borderRadius: "15px", margin: "2px"},
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2,getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "SP Doubler"
            },
            display() {
                return "which are multiplying singularity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#aa0000", backgroundImage: "linear-gradient(180deg, red 0%, black 125%)", backgroundOrigin: "border-box"}
        },
        12: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(3,getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "IP Tripler"
            },
            display() {
                return "which are multiplying infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#aa0000", backgroundImage: "linear-gradient(180deg, red 0%, black 125%)", backgroundOrigin: "border-box"}
        },
        13: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.s.singularityPoints},
            pay(amt) { player.s.singularityPoints = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(100, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Steel Centupler"
            },
            display() {
                return "which are multiplying steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " SP"
            },
            buy(mult) {
                if (mult != true) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#aa0000", backgroundImage: "linear-gradient(180deg, red 0%, black 125%)", backgroundOrigin: "border-box"}
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>1 Singularity",
            effectDescription: "Start every singularity reset with 8 infinities. No longer have to rebeat Tav (Break infinity always unlocked). Unlock realm essence and the factory.",
            done() { return player.s.singularities.gte(1) },
            style: {width: "800px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        12: {
            requirementDescription: "<h3>2 Singularities",
            effectDescription: "Keep all infinity and grass-skip milestones. Unlock the charger, new pet evolutions, and a new break infinity upgrade.",
            done() { return player.s.singularities.gte(2) },
            style: {width: "800px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        13: {
            requirementDescription: "<h3>3 Singularities",
            effectDescription: "Produce 6% of blessings per second (excluding RC1), produce 10% of alternate infinities per second, produce 1% of galaxy dust per second, autobuy infinity power and alt inf buyables, and unlock radiation.",
            done() { return player.s.singularities.gte(3) },
            style: {width: "800px", height: "85px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        14: {
            requirementDescription: "<h3>4 Singularities",
            effectDescription: "Keep XPBoost on reset, keep pre-singularity check back content on reset, unlock new marcelacoplao content, keep moonstone buyables on reset, and unlock singularity dimensions.",
            done() { return player.s.singularities.gte(4) },
            style: {width: "800px", height: "85px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        15: {
            requirementDescription: "<h3>5 Singularities",
            effectDescription: "Keep check back buyables and infinity challenges on singularity resets, and unlock singularity point buyables.",
            done() { return player.s.singularities.gte(5) },
            style: {width: "800px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        16: {
            requirementDescription: "<h3>6 Singularities",
            effectDescription: "Autobuy challenge dice points, crystal, steel, pollinator, time cube, replicanti, galaxy dust, repli-grass, grass-skippers, linkers, and proto memory buyables.<br>Keep hex of power's vigor milestones on singularity reset.",
            done() { return player.s.singularities.gte(6) },
            style: {width: "800px", height: "85px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        17: {
            requirementDescription: "<h3>7 Singularities",
            effectDescription: "Autobuy infinity dimensions, T2 mod buyables, and all pre-singularity upgrades, no longer reset RBI toggle, keep one of every AD autobuyer, and unlock a new alt-uni 1 upgrade.",
            done() { return player.s.singularities.gte(7) },
            style: {width: "800px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        18: {
            requirementDescription: "<h3>12 Singularities",
            effectDescription: "Start singularity with alt-uni 1 unlocked, keep cante and rememberance cores, singularity resets don't change the screen, and autocruncher toggles don't get reset.",
            done() { return player.s.singularities.gte(12) },
            style: {width: "800px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        19: {
            requirementDescription: "<h3>25 Singularities",
            effectDescription: "Start each singularity with every universe 2 layer unlocked, and autoroll cooldown is 10x shorter.",
            done() { return player.s.singularities.gte(25) },
            style: {width: "800px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        20: {
            requirementDescription: "<h3>60 Singularities",
            effectDescription: "Keep IP related blessing boosters, NIP related jinxes, and graces on all resets.<br>Also keep any hex Qol control values.",
            done() { return player.s.singularities.gte(60) },
            style: {width: "800px", height: "70px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        21: {
            requirementDescription: "<h3>100 Singularities",
            effectDescription: "Keep OTFs on singularity resets.",
            done() { return player.s.singularities.gte(100) },
            style: {width: "800px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        22: {
            requirementDescription: "<h3>250 Singularities",
            effectDescription: "Keep highest OTF values on singularity reset.",
            done() { return player.s.singularities.gte(250) },
            style: {width: "800px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        23: {
            requirementDescription: "<h3>1000 Singularities",
            effectDescription: "Keep pollinator selection, upgrades, and buyables on singularity resets.",
            done() { return player.s.singularities.gte(1000) },
            style: {width: "800px", height: "55px", color: "rgba(0,0,0,0.5)", border: "5px solid rgba(0,0,0,0.5)", borderRadius: "10px", margin: "-2.5px"},
        },
        //REMINDER: MAKE THE TIME MACHINE at some point
    },
    challenges: {},
    infoboxes: {
        1: {
            title: "Singularity",
            body() { return "When mass is confined to an infinitely small point of space, it forms a singularity. Singularities are much more powerful versions of infinities, but their power was neglected by the original seven due to unknown reasons. It was believed that the power of singularity causes celestials to go rogue, as they become remorseless and evil due to some superphysical power. Others say that the original seven avoided using the power of singularity as it would lead to the destruction of worlds. The original seven opted to utilize eternities, which was an infinite concentration of time, instead of matter." },
            unlocked() { return hasMilestone("s", 11) },      
        },
        2: {
            title: "Singularity Core",
            body() { return "Matos, the celestial of machines discovered a way of controlling the power of singularity without being affected by it's negative properties. By extracting the power from singularities and concentrating them into a core. The power is protected by a layer of starmetal, which is a metal extracted from dying stars. However, the singularity core is still unstable. It needs a fuel source in order to be stabilized. With all three of these factors, a the power of singularities can be used through cores. Using these fueled cores, Matos made other celestials stronger." },
            unlocked() { return hasMilestone("s", 19) },      
        },
        3: {
            title: "Starmetal Alloy",
            body() { return "Starmetal Alloy is made by harnessing the power of photons into physical matter using superphysical values. However, when in the process of creating starmetal alloy, photons become dormant, which means there is no light. And in the absence of light, there is darkness. In darkness, superphysical values become altered. Values are harder to gain and are more prone to reset. This has made gaining starmetal alloy difficult." },
            unlocked() { return hasUpgrade("s", 21) },      
        },
    },
    microtabs: {
        stuff: {
            "Upgrades": {
                buttonStyle() { return { color: "white", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["blank", "25px"],
                    ["style-row", [
                        ["upgrade", 11],["upgrade", 12],["upgrade", 13],["upgrade", 14],["upgrade", 15],["upgrade", 16],["upgrade", 17],
                        ["upgrade", 18],["upgrade", 19],["upgrade", 20],["upgrade", 21],["upgrade", 22],["upgrade", 23],
                        ["upgrade", 24],["upgrade", 25],["upgrade", 26],["upgrade", 27]
                    ], {maxWidth: "800px"}],
                ]
            },
            "Milestones": {
                buttonStyle() { return { color: "white", borderRadius: "5px" }},
                unlocked() { return true },
                content: [
                    ["blank", "20px"],
                    ["row", [
                        ["raw-html", () => {return "You have <h3>" + formatWhole(player.s.singularities) + "</h3> singularities" }, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                        ["raw-html", () => {return "(+" + formatWhole(player.s.singularitiesToGet) + ")" }, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
                    ]],
                    ["raw-html", () => {return hasUpgrade("fu", 19) ? "Boosts core scraps by x" + format(player.s.singularitiesEffect) : ""}, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
                    ["blank", "25px"],
                    ["milestone", 11],
                    ["milestone", 12],
                    ["milestone", 13],
                    ["milestone", 14],
                    ["milestone", 15],
                    ["milestone", 16],
                    ["milestone", 17],
                    ["milestone", 18],
                    ["milestone", 19],
                    ["milestone", 20],
                    ["milestone", 21],
                    ["milestone", 22],
                    ["milestone", 23],
                ]
            },
            "Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "5px" }},
                unlocked() { return hasMilestone("s", 15) },
                content: [
                    ["blank", "25px"],
                    ["style-row", [["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13]], {maxWidth: "900px"}],
                ]
            },
            "Lore": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["infobox", "1"],
                    ["infobox", "2"],
                    ["infobox", "3"],
                    ["infobox", "4"],
                ]
            },
        },
    },
    tabFormat: [
        ["row", [
            ["raw-html", () => {return "You have <h3>" + format(player.s.singularityPoints) + "</h3> singularity points"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => {return "(+" + format(player.s.singularityPointsToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.in.infinityPoints.gte(1e40)) {look.color = "white"} else {look.color = "gray"} 
                return look
            }],
            ["raw-html", () => {return player.in.infinityPoints.gte("2.71e3793") ? "[SOFTCAPPED<sup>2</sup>]" : player.in.infinityPoints.gte(2.5e193) ? "[SOFTCAPPED]" : ""}, {color: "red", fontSize: "20px", fontFamily: "monospace", marginLeft: "10px"}],
        ]],
        ["raw-html", () => { return "(Highest: " + format(player.s.highestSingularityPoints) + ")" }, {color: "white", fontSize: "20px", fontFamily: "monospace"}],
        ["microtabs", "stuff", { 'border-width': '0px' }],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && (player.ca.defeatedCante || player.s.highestSingularityPoints.gt(0)) && !player.cp.cantepocalypseActive && !player.sma.inStarmetalChallenge}
})
