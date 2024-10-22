﻿addLayer("f", {
    name: "Factors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        factorBase: new Decimal(0.05),
        factorUnlocks: [true, true, true, false, false, false, false, false],

        factorPower: new Decimal(0),
        factorPowerEffect: new Decimal(1),
        factorPowerPerSecond: new Decimal(0),
        powerFactorUnlocks: [true, true, true, false, false, false, false, false],

        //tree
        treeFactorUnlocks: [true, true, true, false, false, false, false, false],

        //grass
        grassFactorUnlocks: [false, false, false, false, false, false, false, false],

        //infinity points
        infinityFactorUnlocks: [true, true, true, true, true, true, true, true],
    }
    },
    automate() {
        if (hasUpgrade("p", 15))
        {
            buyBuyable("f", 11)
            buyBuyable("f", 12)
            buyBuyable("f", 13)
            buyBuyable("f", 14)
            buyBuyable("f", 15)
            buyBuyable("f", 16)
            buyBuyable("f", 17)
            buyBuyable("f", 18)
        }    
        if (hasUpgrade("p", 21))
        {
            buyBuyable("f", 19)
            buyBuyable("f", 21)
            buyBuyable("f", 22)
            buyBuyable("f", 23)
            buyBuyable("f", 24)
            buyBuyable("f", 25)
            buyBuyable("f", 26)
            buyBuyable("f", 27)
        }   
        if (hasMilestone("r", 16))
        {
            buyBuyable("f", 1)
            buyBuyable("f", 2)
            buyBuyable("f", 3)
            buyBuyable("f", 4)
            buyBuyable("f", 5)
            buyBuyable("f", 6)
            buyBuyable("f", 7)
            buyBuyable("f", 8)
            buyBuyable("f", 28)
            buyBuyable("f", 29)
            buyBuyable("f", 31)
            buyBuyable("f", 32)
            buyBuyable("f", 33)
            buyBuyable("f", 34)
            buyBuyable("f", 35)
            buyBuyable("f", 36)
        }   
        if (hasUpgrade("bi", 103))
        {
            buyBuyable("f", 41)
            buyBuyable("f", 42)
            buyBuyable("f", 43)
            buyBuyable("f", 44)
            buyBuyable("f", 45)
            buyBuyable("f", 46)
            buyBuyable("f", 47)
            buyBuyable("f", 48)
        }   
        if (hasUpgrade("bi", 13))
        {
            buyBuyable("f", 51)
            buyBuyable("f", 52)
            buyBuyable("f", 53)
            buyBuyable("f", 54)
            buyBuyable("f", 55)
            buyBuyable("f", 56)
            buyBuyable("f", 57)
            buyBuyable("f", 58)
        }   
    },
    nodeStyle() {
    },
    tooltip: "Factors",
    color() { return "#83cecf" },
    branches: ["r"],
    update(delta) {
        let onepersec = new Decimal(1)

        if (player.r.tier.gte(2))
        [
            player.f.factorUnlocks[3] = true
        ]
        if (player.r.tier.gte(4))
        [
            player.f.factorUnlocks[4] = true
        ]
        if (player.r.tetr.gte(2) && player.f.factorUnlocks[4] == true)
        [
            player.f.factorUnlocks[5] = true
        ]
        if (hasUpgrade("p", 13) && player.f.factorUnlocks[5] == true)
        [
            player.f.factorUnlocks[6] = true
        ]
        if (player.r.tetr.gte(4) && player.f.factorUnlocks[6] == true)
        [
            player.f.factorUnlocks[7] = true
        ]

        //Power
        if (hasUpgrade("i", 15)) player.f.factorPowerPerSecond = onepersec
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 19))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 21))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 22))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 23))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 24))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 25))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 26))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("f", 27))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("t", 16))
        if (hasUpgrade("p", 16)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("p", 16))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("g", 15))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.gh.grasshopperEffects[1])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("m", 14))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.cb.commonPetEffects[2][0])
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(player.d.diceEffects[1])
        if (hasUpgrade("ip", 14) && !inChallenge("ip", 14)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("ip", 14))
        if (hasUpgrade("ip", 21) && !inChallenge("ip", 14)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(upgradeEffect("ip", 21))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.div(player.pe.pestEffect[1])
        if (inChallenge("ip", 13)) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.pow(0.7)
        if (inChallenge("ip", 13) || player.po.hex) player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.mul(buyableEffect("h", 11))
        player.f.factorPowerPerSecond = player.f.factorPowerPerSecond.div(player.po.halterEffects[1])

        player.f.factorPower = player.f.factorPower.add(player.f.factorPowerPerSecond.mul(delta))
        player.f.factorPowerEffect = player.f.factorPower.pow(0.5).div(3).add(1)

        if (player.p.prestigePoints.gte(10000))
        {
            player.f.powerFactorUnlocks[3] = true
        }
        if (player.points.gte(1e14) && player.f.powerFactorUnlocks[3] == true)
        {
            player.f.powerFactorUnlocks[4] = true
        }
        if (player.r.tetr.gte(11) && player.f.powerFactorUnlocks[4] == true)
        {
            player.f.powerFactorUnlocks[5] = true
        }
        if (player.t.trees.gte(25) && player.f.powerFactorUnlocks[5] == true)
        {
            player.f.powerFactorUnlocks[6] = true
        }
        if (hasUpgrade("p", 19) && player.f.powerFactorUnlocks[6] == true)
        {
            player.f.powerFactorUnlocks[7] = true
        }

        if (hasUpgrade("p", 23))
        {
            player.f.treeFactorUnlocks[3] = true
        }
        if (hasUpgrade("g", 17) && player.f.treeFactorUnlocks[3] == true)
        {
            player.f.treeFactorUnlocks[4] = true
        }
        if (hasMilestone("r", 13) && player.f.treeFactorUnlocks[4] == true)
        {
            player.f.treeFactorUnlocks[5] = true
        }
        if (player.m.mods.gte(20) && player.f.treeFactorUnlocks[5] == true)
        {
            player.f.treeFactorUnlocks[6] = true
        }
        if (hasMilestone("r", 16) && player.f.treeFactorUnlocks[6] == true)
        {
            player.f.treeFactorUnlocks[7] = true
        }

        for (let i = 0; i < player.f.grassFactorUnlocks.length; i++)
        {
            if (player.gh.buyables[15].gt(i))
            {
                player.f.grassFactorUnlocks[i] = true
            }
        }

        player.f.factorBase = new Decimal(0.05)
        player.f.factorBase = player.f.factorBase.add(buyableEffect("gh", 16))
        if (hasUpgrade("ad", 19)) player.f.factorBase = player.f.factorBase.add(upgradeEffect("ad", 19))
        player.f.factorBase = player.f.factorBase.mul(buyableEffect("rm", 22))
        //INF


    },

    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.buyMax == false },
            unlocked() { return true },
            onClick() {
                player.buyMax = true
            },
            style: { width: '75px', "min-height": '75px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.buyMax == true  },
            unlocked() { return true },
            onClick() {
                player.buyMax = false
            },
            style: { width: '75px', "min-height": '75px', }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        1: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[0] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor I"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.2
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        2: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[1] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor II"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 1.22
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        3: {
            cost(x) { return new Decimal(1.24).pow(x || getBuyableAmount(this.layer, this.id)).mul(180) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[2] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor III"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(180)
                let growth = 1.24
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        4: {
            cost(x) { return new Decimal(1.26).pow(x || getBuyableAmount(this.layer, this.id)).mul(340) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[3] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor IV"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(340)
                let growth = 1.26
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        5: {
            cost(x) { return new Decimal(1.28).pow(x || getBuyableAmount(this.layer, this.id)).mul(800) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[4] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor V"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(800)
                let growth = 1.28
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        6: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(2000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[5] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor VI"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(2000)
                let growth = 1.3
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        7: {
            cost(x) { return new Decimal(1.32).pow(x || getBuyableAmount(this.layer, this.id)).mul(5000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[6] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor VII"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(5000)
                let growth = 1.32
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16))  player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        8: {
            cost(x) { return new Decimal(1.34).pow(x || getBuyableAmount(this.layer, this.id)).mul(14000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.grassFactorUnlocks[7] },
            canAfford() { return player.gh.fertilizer.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Grass Factor VIII"
            },
            display() {
                return "which are boosting grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Fertilizer"
            },
            buy() {
                let base = new Decimal(14000)
                let growth = 1.34
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16))  player.gh.fertilizer = player.gh.fertilizer.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.gh.fertilizer, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16))  player.gh.fertilizer = player.gh.fertilizer.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        11: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(10) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[0] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor I"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(10)
                let growth = 1.25
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            cost(x) { return new Decimal(1.28).pow(x || getBuyableAmount(this.layer, this.id)).mul(25) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[1] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor II"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(25)
                let growth = 1.28
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            cost(x) { return new Decimal(1.31).pow(x || getBuyableAmount(this.layer, this.id)).mul(60) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[2] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor III"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(60)
                let growth = 1.31
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            cost(x) { return new Decimal(1.34).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[3] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor IV"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(200)
                let growth = 1.34
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            cost(x) { return new Decimal(1.37).pow(x || getBuyableAmount(this.layer, this.id)).mul(800) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[4] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor V"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(800)
                let growth = 1.37
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },        
        16: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(3000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[5] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor VI"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(3000)
                let growth = 1.4
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        17: {
            cost(x) { return new Decimal(1.43).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[6] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor VII"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(10000)
                let growth = 1.43
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        18: {
            cost(x) { return new Decimal(1.46).pow(x || getBuyableAmount(this.layer, this.id)).mul(50000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(player.f.factorBase).add(1) },
            unlocked() { return player.f.factorUnlocks[7] },
            canAfford() { return player.points.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Factor VIII"
            },
            display() {
                return "which are boosting celestial points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Celestial Points"
            },
            buy() {
                let base = new Decimal(50000)
                let growth = 1.46
                if (player.buyMax == false && !hasUpgrade("p", 15))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 15)) player.points = player.points.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.points, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 15)) player.points = player.points.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        19: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor I"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(200)
                let growth = 1.3
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        21: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(500) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor II"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(500)
                let growth = 1.35
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        22: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(1500) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return true },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor III"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(1500)
                let growth = 1.4
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        23: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(4000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[3] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor IV"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(4000)
                let growth = 1.45
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        24: {
            cost(x) { return new Decimal(1.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(9000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[4] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor V"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(9000)
                let growth = 1.5
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        25: {
            cost(x) { return new Decimal(1.55).pow(x || getBuyableAmount(this.layer, this.id)).mul(25000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[5] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor VI"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(25000)
                let growth = 1.55
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        26: {
            cost(x) { return new Decimal(1.60).pow(x || getBuyableAmount(this.layer, this.id)).mul(75000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[6] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor VII"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(75000)
                let growth = 1.60
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        27: {
            cost(x) { return new Decimal(1.65).pow(x || getBuyableAmount(this.layer, this.id)).mul(300000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.25).add(1) },
            unlocked() { return player.f.powerFactorUnlocks[7] },
            canAfford() { return player.p.prestigePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Power Factor VIII"
            },
            display() {
                return "which are boosting factor power by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Prestige Points"
            },
            buy() {
                let base = new Decimal(300000)
                let growth = 1.65
                if (player.buyMax == false && !hasUpgrade("p", 21))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.p.prestigePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("p", 21)) player.p.prestigePoints = player.p.prestigePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        28: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[0] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor I"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(30)
                let growth = 1.2
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        29: {
            cost(x) { return new Decimal(1.23).pow(x || getBuyableAmount(this.layer, this.id)).mul(50) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[1] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor II"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(50)
                let growth = 1.23
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        31: {
            cost(x) { return new Decimal(1.26).pow(x || getBuyableAmount(this.layer, this.id)).mul(80) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[2] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor III"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(80)
                let growth = 1.26
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        32: {
            cost(x) { return new Decimal(1.29).pow(x || getBuyableAmount(this.layer, this.id)).mul(160) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[3] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor IV"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(160)
                let growth = 1.29
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        33: {
            cost(x) { return new Decimal(1.32).pow(x || getBuyableAmount(this.layer, this.id)).mul(400) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[4] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor V"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(400)
                let growth = 1.32
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        34: {
            cost(x) { return new Decimal(1.35).pow(x || getBuyableAmount(this.layer, this.id)).mul(20000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[5] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor VI"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(20000)
                let growth = 1.35
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        35: {
            cost(x) { return new Decimal(1.4).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e6) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[6] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor VII"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(1e6)
                let growth = 1.4
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        36: {
            cost(x) { return new Decimal(1.45).pow(x || getBuyableAmount(this.layer, this.id)).mul(1e12) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.05).add(1) },
            unlocked() { return player.f.treeFactorUnlocks[7] },
            canAfford() { return player.g.grass.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Tree Factor VII"
            },
            display() {
                return "which are boosting tree gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Grass"
            },
            buy() {
                let base = new Decimal(1e12)
                let growth = 1.45
                if (player.buyMax == false && !hasMilestone("r", 16))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.g.grass, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasMilestone("r", 16)) player.g.grass = player.g.grass.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        41: {
            cost(x) { return new Decimal(1.2).pow(x || getBuyableAmount(this.layer, this.id)).mul(20) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[0] },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Infinity Factor I"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(20)
                let growth = 1.2
                if (player.buyMax == false && !hasUpgrade("bi", 103))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        42: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(30) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[1] },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Infinity Factor II"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(30)
                let growth = 1.22
                if (player.buyMax == false && !hasUpgrade("bi", 103))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        43: {
            cost(x) { return new Decimal(1.24).pow(x || getBuyableAmount(this.layer, this.id)).mul(45) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[2] },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Infinity Factor III"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(45)
                let growth = 1.24
                if (player.buyMax == false && !hasUpgrade("bi", 103))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        44: {
            cost(x) { return new Decimal(1.26).pow(x || getBuyableAmount(this.layer, this.id)).mul(80) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[3] },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Infinity Factor IV"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(80)
                let growth = 1.26
                if (player.buyMax == false && !hasUpgrade("bi", 103))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        45: {
            cost(x) { return new Decimal(1.28).pow(x || getBuyableAmount(this.layer, this.id)).mul(200) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[4] },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Infinity Factor V"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(200)
                let growth = 1.28
                if (player.buyMax == false && !hasUpgrade("bi", 103))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        46: {
            cost(x) { return new Decimal(1.3).pow(x || getBuyableAmount(this.layer, this.id)).mul(550) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[5] },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Infinity Factor VI"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(550)
                let growth = 1.3
                if (player.buyMax == false && !hasUpgrade("bi", 103))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        47: {
            cost(x) { return new Decimal(1.32).pow(x || getBuyableAmount(this.layer, this.id)).mul(1200) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[6] },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Infinity Factor VII"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(1200)
                let growth = 1.32
                if (player.buyMax == false && !hasUpgrade("bi", 103))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        48: {
            cost(x) { return new Decimal(1.34).pow(x || getBuyableAmount(this.layer, this.id)).mul(2600) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.02).add(1) },
            unlocked() { return player.f.infinityFactorUnlocks[7] },
            canAfford() { return player.ta.negativeInfinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Infinity Factor VIII"
            },
            display() {
                return "which are boosting infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Negative Infinity Points"
            },
            buy() {
                let base = new Decimal(2600)
                let growth = 1.34
                if (player.buyMax == false && !hasUpgrade("bi", 103))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 103)) player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.ta.negativeInfinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 103))  player.ta.negativeInfinityPoints = player.ta.negativeInfinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        51: {
            cost(x) { return new Decimal(1.1).pow(x || getBuyableAmount(this.layer, this.id)).mul(10000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Negative Infinity Factor I"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(10000)
                let growth = 1.1
                if (player.buyMax == false && !hasUpgrade("bi", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        52: {
            cost(x) { return new Decimal(1.13).pow(x || getBuyableAmount(this.layer, this.id)).mul(18000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Negative Infinity Factor II"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(18000)
                let growth = 1.13
                if (player.buyMax == false && !hasUpgrade("bi", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        53: {
            cost(x) { return new Decimal(1.16).pow(x || getBuyableAmount(this.layer, this.id)).mul(32000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Negative Infinity Factor III"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(32000)
                let growth = 1.16
                if (player.buyMax == false && !hasUpgrade("bi", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        54: {
            cost(x) { return new Decimal(1.19).pow(x || getBuyableAmount(this.layer, this.id)).mul(60000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Negative Infinity Factor IV"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(60000)
                let growth = 1.19
                if (player.buyMax == false && !hasUpgrade("bi", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        55: {
            cost(x) { return new Decimal(1.22).pow(x || getBuyableAmount(this.layer, this.id)).mul(110000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Negative Infinity Factor V"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(110000)
                let growth = 1.22
                if (player.buyMax == false && !hasUpgrade("bi", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        56: {
            cost(x) { return new Decimal(1.25).pow(x || getBuyableAmount(this.layer, this.id)).mul(270000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Negative Infinity Factor VI"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(270000)
                let growth = 1.25
                if (player.buyMax == false && !hasUpgrade("bi", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        57: {
            cost(x) { return new Decimal(1.28).pow(x || getBuyableAmount(this.layer, this.id)).mul(500000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Negative Infinity Factor VII"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(500000)
                let growth = 1.28
                if (player.buyMax == false && !hasUpgrade("bi", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
        58: {
            cost(x) { return new Decimal(1.31).pow(x || getBuyableAmount(this.layer, this.id)).mul(1200000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.015).add(1) },
            unlocked() { return true },
            canAfford() { return player.in.infinityPoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Negative Infinity Factor VIII"
            },
            display() {
                return "which are boosting negative infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Points"
            },
            buy() {
                let base = new Decimal(1200000)
                let growth = 1.31
                if (player.buyMax == false && !hasUpgrade("bi", 13))
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.in.infinityPoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                if (!hasUpgrade("bi", 13)) player.in.infinityPoints = player.in.infinityPoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {

    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"], 
                    ["raw-html", function () { return player.f.factorUnlocks[3] == false ?  "Next factor unlocks at tier 2." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[3] == true && player.f.factorUnlocks[4] == false ?  "Next factor unlocks at tier 4." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[4] == true && player.f.factorUnlocks[5] == false ?  "Next factor unlocks at tetr 2." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[5] == true && player.f.factorUnlocks[6] == false ?  "Next factor unlocks at Prestige Upgrade III." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.factorUnlocks[6] == true && player.f.factorUnlocks[7] == false ?  "Next factor unlocks at tetr 4." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13], ["buyable", 14]]],
                    ["row", [["buyable", 15], ["buyable", 16], ["buyable", 17], ["buyable", 18]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 11).mul(buyableEffect("f", 12).mul(buyableEffect("f", 13)).mul(buyableEffect("f", 14)).mul(buyableEffect("f", 15)).mul(buyableEffect("f", 16)).mul(buyableEffect("f", 17)).mul(buyableEffect("f", 18)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Power": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("i", 15) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h2>You have " + format(player.f.factorPower) + " factor power." }, { "coslor": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>You are gaining " + format(player.f.factorPowerPerSecond) + " factor power per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>which boost celestial points by x" + format(player.f.factorPowerEffect) + "." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.p.prestigePoints) + " prestige points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[3] == false ?  "Next factor unlocks at 10,000 prestige points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[3] == true && player.f.powerFactorUnlocks[4] == false ?  "Next factor unlocks at 1e14 celestial points." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[4] == true && player.f.powerFactorUnlocks[5] == false ?  "Next factor unlocks at tetr 11." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[5] == true && player.f.powerFactorUnlocks[6] == false ?  "Next factor unlocks at 25 trees." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.powerFactorUnlocks[6] == true && player.f.powerFactorUnlocks[7] == false ?  "Next factor unlocks at ???." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["buyable", 19], ["buyable", 21], ["buyable", 22], ["buyable", 23]]],
                    ["row", [["buyable", 24], ["buyable", 25], ["buyable", 26], ["buyable", 27]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 19).mul(buyableEffect("f", 21).mul(buyableEffect("f", 22)).mul(buyableEffect("f", 23)).mul(buyableEffect("f", 24)).mul(buyableEffect("f", 25)).mul(buyableEffect("f", 26)).mul(buyableEffect("f", 27)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            },
            "Tree": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasMilestone("r", 11) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.g.grass) + " grass." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[3] == false ?  "Next factor unlocks at Prestige Upgrade XII." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[3] == true && player.f.treeFactorUnlocks[4] == false?  "Next factor unlocks at Grass Upgrade VII." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[4] == true && player.f.treeFactorUnlocks[5] == false?  "Next factor unlocks at pent 3." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[5] == true && player.f.treeFactorUnlocks[6] == false?  "Next factor unlocks at 20 mods." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.f.treeFactorUnlocks[6] == true && player.f.treeFactorUnlocks[7] == false?  "Next factor unlocks at pent 8." : "" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["buyable", 28], ["buyable", 29], ["buyable", 31], ["buyable", 32]]],
                    ["row", [["buyable", 33], ["buyable", 34], ["buyable", 35], ["buyable", 36]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 28).mul(buyableEffect("f", 29).mul(buyableEffect("f", 31)).mul(buyableEffect("f", 32)).mul(buyableEffect("f", 33)).mul(buyableEffect("f", 34)).mul(buyableEffect("f", 35)).mul(buyableEffect("f", 36)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            }, 
            "Grass": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return player.gh.buyables[15].gt(0) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.gh.fertilizer) + " fertilizer." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Factors unlock with Grass Study III."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["row", [["buyable", 1], ["buyable", 2], ["buyable", 3], ["buyable", 4]]],
                    ["row", [["buyable", 5], ["buyable", 6], ["buyable", 7], ["buyable", 8]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 1).mul(buyableEffect("f", 2).mul(buyableEffect("f", 3)).mul(buyableEffect("f", 4)).mul(buyableEffect("f", 5)).mul(buyableEffect("f", 6)).mul(buyableEffect("f", 7)).mul(buyableEffect("f", 8)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            }, 
            "Infinity": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("ta", 15)},
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.ta.negativeInfinityPoints) + " negative infinity points. (+" + format(player.ta.negativeInfinityPointsToGet) + ")"  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>You have " + format(player.in.infinityPoints) + " infinity points. (+" + format(player.in.infinityPointsToGet) + ")" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 41], ["buyable", 42], ["buyable", 43], ["buyable", 44]]],
                    ["row", [["buyable", 45], ["buyable", 46], ["buyable", 47], ["buyable", 48]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 41).mul(buyableEffect("f", 42).mul(buyableEffect("f", 43)).mul(buyableEffect("f", 44)).mul(buyableEffect("f", 45)).mul(buyableEffect("f", 46)).mul(buyableEffect("f", 47)).mul(buyableEffect("f", 48)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                ]
            }, 
            "Negative Infinity": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return hasUpgrade("ta", 16)},
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "<h3>You have " + format(player.ta.negativeInfinityPoints) + " negative infinity points. (+" + format(player.ta.negativeInfinityPointsToGet) + ")"  }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "<h3>You have " + format(player.in.infinityPoints) + " infinity points. (+" + format(player.in.infinityPointsToGet) + ")" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 51], ["buyable", 52], ["buyable", 53], ["buyable", 54]]],
                    ["row", [["buyable", 55], ["buyable", 56], ["buyable", 57], ["buyable", 58]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Total Mult: x" + format(buyableEffect("f", 51).mul(buyableEffect("f", 52).mul(buyableEffect("f", 53)).mul(buyableEffect("f", 54)).mul(buyableEffect("f", 55)).mul(buyableEffect("f", 56)).mul(buyableEffect("f", 57)).mul(buyableEffect("f", 58)))) }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                ]
            }, 
        },
    },

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
         ["raw-html", function () { return "You are gaining <h3>" + format(player.gain) + "</h3> celestial points per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 12)}
})
document.addEventListener('keydown', function(event) {
    if (event.key === 'b' && options.toggleHotkey) { 
        if (player.buyMax == true) 
        {
        player.buyMax = false
        } else
        {
            player.buyMax = true
        }
    }
  });