﻿addLayer("fa", {
    name: "Factory", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "FA", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        foundryEffect: new Decimal(1),
        foundryEffectPerSecond: new Decimal(0),
        foundryEffectMax: new Decimal(10000),

        charge: new Decimal(0),
        chargeRate: new Decimal(0),
        bestCharge: new Decimal(0),

        factoryMax: false,
        foundryMax: false,
        generatorMax: false,

        milestoneEffect: [new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), 
            new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), ]
    }
    },
    automate() {

    },
    nodeStyle() {
        return {
            "background": "gray",
            "background-origin": "border-box",
            "color": "black",
            "border-color": "white",
        }
    },
    tooltip: "Factory",
    color: "gray",
    update(delta) {
        let onepersec = new Decimal(1)


        player.fa.foundryEffectPerSecond = new Decimal(0)
        if (player.fa.buyables[11].gte(1)) player.fa.foundryEffectPerSecond = new Decimal(1)
        player.fa.foundryEffectPerSecond = player.fa.foundryEffectPerSecond.mul(buyableEffect("fa", 11))
        player.fa.foundryEffectPerSecond = player.fa.foundryEffectPerSecond.mul(buyableEffect("fa", 103))
        player.fa.foundryEffectPerSecond = player.fa.foundryEffectPerSecond.mul(buyableEffect("fa", 104))

        player.fa.foundryEffectMax = new Decimal(10000)
        player.fa.foundryEffectMax = player.fa.foundryEffectMax.mul(buyableEffect("fa", 11))
        player.fa.foundryEffectMax = player.fa.foundryEffectMax.mul(buyableEffect("fa", 101))
        player.fa.foundryEffectMax = player.fa.foundryEffectMax.mul(buyableEffect("fa", 102))
    
        if (player.fa.foundryEffect.lt(player.fa.foundryEffectMax))
        {
            player.fa.foundryEffect = player.fa.foundryEffect.add(player.fa.foundryEffectPerSecond.mul(delta))
        } else
        {
            player.fa.foundryEffect = player.fa.foundryEffectMax
        }

        if (player.fa.charge.gte(player.fa.bestCharge))
        {
            player.fa.bestCharge = player.fa.charge
        }

        player.fa.chargeRate = player.fa.buyables[11].add(1)
        player.fa.chargeRate = player.fa.chargeRate.mul(player.fa.buyables[12].add(1))
        player.fa.chargeRate = player.fa.chargeRate.mul(player.fa.buyables[13].add(1))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 13))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 205))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 206))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 207))
        player.fa.chargeRate = player.fa.chargeRate.mul(buyableEffect("fa", 208))

        if (player.fa.buyables[13].gte(1)) player.fa.charge = player.fa.charge.add(player.fa.chargeRate.mul(delta))

        player.fa.milestoneEffect[0] = player.fa.charge.pow(0.3).div(3).add(1) //ip
        player.fa.milestoneEffect[1] = player.fa.charge.pow(3).add(1) //ad
        player.fa.milestoneEffect[2] = player.fa.charge.pow(0.2).div(5).add(1) //bi
        player.fa.milestoneEffect[3] = player.fa.charge.pow(0.35).div(5).add(1) //steel
        player.fa.milestoneEffect[4] = player.fa.charge.pow(0.25).div(5).add(1) //nip
        player.fa.milestoneEffect[5] = player.fa.charge.pow(0.3).div(2).add(1) //id
        player.fa.milestoneEffect[6] = player.fa.charge.pow(0.1).div(4).add(1) //oil
        player.fa.milestoneEffect[7] = player.fa.charge.pow(0.25).div(5).add(1) //anon
        player.fa.milestoneEffect[8] = player.fa.charge.pow(0.08).div(15).add(1) //galaxy dust
    },
    branches: ["m", "t",],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "i"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.fa.factoryMax == false },
            unlocked() { return true },
            onClick() {
                player.fa.factoryMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.fa.factoryMax == true  },
            unlocked() { return true },
            onClick() {
                player.fa.factoryMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.fa.foundryMax == false },
            unlocked() { return true },
            onClick() {
                player.fa.foundryMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.fa.foundryMax == true  },
            unlocked() { return true },
            onClick() {
                player.fa.foundryMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        6: {
            title() { return "Buy Max On" },
            canClick() { return player.fa.generatorMax == false },
            unlocked() { return true },
            onClick() {
                player.fa.generatorMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        7: {
            title() { return "Buy Max Off" },
            canClick() { return player.fa.generatorMax == true  },
            unlocked() { return true },
            onClick() {
                player.fa.generatorMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            costBase() { return new Decimal(1e40) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.75).mul(0.25).add(1)},
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Foundry"
            },
            display() {
                return "Unlock a building where you can increase steel production.\n\Each level multiplies foundry effect gain and capacity by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.fa.factoryMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(1e50) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/100<br/>Generator"
            },
            display() {
                return "Unlock a building where you passively generate a variety of currencies.\n\Each level multiplies generator effect by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.fa.factoryMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(1e65) },
            costGrowth() { return new Decimal(1000) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.gh.steel},
            pay(amt) { player.gh.steel = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2,getBuyableAmount(this.layer, this.id)) },
            unlocked() { return hasMilestone("s", 12) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/1000<br/>Charger"
            },
            display() {
                return "Unlock a building where you produce charge, which can provide a variety of benefits.\n\Each level multiplies charger charge rate by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Steel"
            },
            buy() {
                if (player.fa.factoryMax == false) {
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
            style: { width: '275px', height: '150px', }
        },

        //FOUNDRY
        101: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.25) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.r.timeCubes},
            pay(amt) { player.r.timeCubes = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000<br/>Steel Time Cubes'
            },
            display() {
                return 'which are boosting foundry effect capacity by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Time Cubes'
            },
            buy() {
                if (player.fa.foundryMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        102: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000<br/>Steel Crystal'
            },
            display() {
                return 'which are boosting foundry effect capacity by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Crystals'
            },
            buy() {
                if (player.fa.foundryMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        103: {
            costBase() { return new Decimal(1e40) },
            costGrowth() { return new Decimal(3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.an.anonymity},
            pay(amt) { player.an.anonymity = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000<br/>Steel Anonymity'
            },
            display() {
                return 'which are boosting foundry effect gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Anonymity'
            },
            buy() {
                if (player.fa.foundryMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        104: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.7) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.oi.oil},
            pay(amt) { player.oi.oil = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(1.25).mul(0.2).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000<br/>Steel Oil'
            },
            display() {
                return 'which are boosting foundry effect gain by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Oil'
            },
            buy() {
                if (player.fa.foundryMax == false) {
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
            style: { width: '275px', height: '150px', }
        },

        //generator
        201: {
            costBase() { return new Decimal(50) },
            costGrowth() { return new Decimal(1.7) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.h.ragePower},
            pay(amt) { player.h.ragePower = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).mul(buyableEffect("fa", 12)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/250<br/>Rage Power Generator'
            },
            display() {
                return 'which are producing ' + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + '% of rage power per second.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Rage Power'
            },
            buy() {
                if (player.fa.generatorMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        202: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(5) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).mul(buyableEffect("fa", 12)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/250<br/>Crystal Generator'
            },
            display() {
                return 'which are producing ' + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + '% of crystals per second.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Crystals'
            },
            buy() {
                if (player.fa.generatorMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        203: {
            costBase() { return new Decimal(1e8) },
            costGrowth() { return new Decimal(25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.04).mul(buyableEffect("fa", 12)) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/250<br/>Repli-Grass Generator'
            },
            display() {
                return 'which are producing ' + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + '% of the repli-grass mult per grass spawn.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Repli-Grass'
            },
            buy() {
                if (player.fa.generatorMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        204: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(25) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.oi.oil},
            pay(amt) { player.oi.oil = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.01).mul(buyableEffect("fa", 12)) },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/250<br/>Oil Generator'
            },
            display() {
                return 'which are producing ' + format(tmp[this.layer].buyables[this.id].effect.mul(100)) + '% of oil per second.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Oil'
            },
            buy() {
                if (player.fa.generatorMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        205: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.h.ragePower},
            pay(amt) { player.h.ragePower = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000<br/>Rage Power Charger'
            },
            display() {
                return 'which are boosting charge rate by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Rage Power'
            },
            buy() {
                if (player.fa.generatorMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        206: {
            costBase() { return new Decimal(1e20) },
            costGrowth() { return new Decimal(2.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.p.crystals},
            pay(amt) { player.p.crystals = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000<br/>Crystal Charger'
            },
            display() {
                return 'which are boosting charge rate by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Crystals'
            },
            buy() {
                if (player.fa.generatorMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        207: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1.75) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.rg.repliGrass},
            pay(amt) { player.rg.repliGrass = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000<br/>Repli-Grass Charger'
            },
            display() {
                return 'which are boosting charge rate by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Repli-Grass'
            },
            buy() {
                if (player.fa.generatorMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
        208: {
            costBase() { return new Decimal(4000000) },
            costGrowth() { return new Decimal(1.6) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.oi.oil},
            pay(amt) { player.oi.oil = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return player.fa.buyables[13].gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + '/1,000<br/>Oil Charger'
            },
            display() {
                return 'which are boosting charge rate by x' + format(tmp[this.layer].buyables[this.id].effect) + '.\n\
                    Cost: ' + format(tmp[this.layer].buyables[this.id].cost) + ' Oil'
            },
            buy() {
                if (player.fa.generatorMax == false) {
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
            style: { width: '275px', height: '150px', }
        },
    },
    milestones: {
        11: {
            requirementDescription: "<h3>100 Best Charge",
            effectDescription() { return "Boosts infinity points based on charge: Currently: " + format(player.fa.milestoneEffect[0]) + "x" },
            done() { return player.fa.bestCharge.gte(100) },
            style: { width: '800px', "min-height": '75px' },
        },
        12: {
            requirementDescription: "<h3>1,000 Best Charge",
            effectDescription() { return "Boosts antimatter dimensions based on charge: Currently: " + format(player.fa.milestoneEffect[1]) + "x" },
            done() { return player.fa.bestCharge.gte(1000) },
            style: { width: '800px', "min-height": '75px' },
        },
        13: {
            requirementDescription: "<h3>10,000 Best Charge",
            effectDescription() { return "Boosts broken infinities based on charge: Currently: " + format(player.fa.milestoneEffect[2]) + "x" },
            done() { return player.fa.bestCharge.gte(10000) },
            style: { width: '800px', "min-height": '75px' },
        },
        14: {
            requirementDescription: "<h3>100,000 Best Charge",
            effectDescription() { return "Boosts steel based on charge: Currently: " + format(player.fa.milestoneEffect[3]) + "x" },
            done() { return player.fa.bestCharge.gte(1e5) },
            style: { width: '800px', "min-height": '75px' },
        },
        15: {
            requirementDescription: "<h3>1,000,000 Best Charge",
            effectDescription() { return "Boosts negative infinity points based on charge: Currently: " + format(player.fa.milestoneEffect[4]) + "x" },
            done() { return player.fa.bestCharge.gte(1e6) },
            style: { width: '800px', "min-height": '75px' },
        },
        16: {
            requirementDescription: "<h3>10,000,000 Best Charge",
            effectDescription() { return "Boosts infinity dimensions based on charge: Currently: " + format(player.fa.milestoneEffect[5]) + "x" },
            done() { return player.fa.bestCharge.gte(1e7) },
            style: { width: '800px', "min-height": '75px' },
        },
        17: {
            requirementDescription: "<h3>1e9 Best Charge",
            effectDescription() { return "Boosts oil based on charge: Currently: " + format(player.fa.milestoneEffect[6]) + "x" },
            done() { return player.fa.bestCharge.gte(1e9) },
            style: { width: '800px', "min-height": '75px' },
        },
        18: {
            requirementDescription: "<h3>1e11 Best Charge",
            effectDescription() { return "Boosts anonymity based on charge: Currently: " + format(player.fa.milestoneEffect[7]) + "x" },
            done() { return player.fa.bestCharge.gte(1e11) },
            style: { width: '800px', "min-height": '75px' },
        },
        19: {
            requirementDescription: "<h3>1e14 Best Charge",
            effectDescription() { return "Boosts galaxy dust based on charge: Currently: " + format(player.fa.milestoneEffect[8]) + "x" },
            done() { return player.fa.bestCharge.gte(1e14) },
            style: { width: '800px', "min-height": '75px' },
        },
    },
    challenges: {
    },
    infoboxes: {
    },
    microtabs: {
        stuff: {
            "Buyables": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                        ["blank", "25px"],
                        ["row", [["clickable", 2], ["clickable", 3],]],
                        ["blank", "25px"],
                        ["row", [["buyable", 11], ["buyable", 12], ["buyable", 13]]],
                ]
            },
            "Foundry": {
                buttonStyle() { return { 'color': '#7a7979' } },
                unlocked() { return player.fa.buyables[11].gte(1) },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 4], ["clickable", 5],]],
                        ["blank", "25px"],
                        ["raw-html", function () { return format(player.fa.foundryEffect) + "x/" + format(player.fa.foundryEffectMax) + "x to steel gain based on time since last steelie reset."}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["raw-html", function () { return "(+" + format(player.fa.foundryEffectPerSecond) + "/s)" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + format(player.r.timeCubes) + "</h3> Time Cubes" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.p.crystals) + "</h3> Crystals" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.an.anonymity) + "</h3> Anonymity" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> Oil" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["buyable", 101], ["buyable", 102]]],
                        ["row", [["buyable", 103], ["buyable", 104]]],

                ]
            },
            "Generator": {
                buttonStyle() { return { 'color': '#609c7c' } },
                unlocked() { return player.fa.buyables[12].gte(1)  },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["clickable", 6], ["clickable", 7],]],
                        ["blank", "25px"],
                        ["raw-html", function () { return "You have <h3>" + format(player.h.ragePower) + "</h3> Rage Power" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.p.crystals) + "</h3> Crystals" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.rg.repliGrass) + "</h3> Repli-Grass" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["raw-html", function () { return "You have <h3>" + format(player.oi.oil) + "</h3> Oil" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["blank", "25px"],
                        ["row", [["buyable", 201], ["buyable", 202], ["buyable", 203], ["buyable", 204]]],
                        ["row", [["buyable", 205], ["buyable", 206], ["buyable", 207], ["buyable", 208]]],
                ]
            },
            "Charger": {
                buttonStyle() { return { 'color': '#f7f774' } },
                unlocked() { return player.fa.buyables[13].gte(1)  },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.fa.charge) + "</h3> Charge" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You are gaining " + format(player.fa.chargeRate) + " per second."}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Best charge: " + format(player.fa.bestCharge) + ""}, { "color": "white", "font-size": "20px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Charge is reset on steel and infinity resets, and best charge is reset on singularity resets.)"}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "(Charge gain is based on factory buyables)"}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["raw-html", function () { return "Charger Milestones"}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["milestone", 11]]],
                    ["row", [["milestone", 12]]],
                    ["row", [["milestone", 13]]],
                    ["row", [["milestone", 14]]],
                    ["row", [["milestone", 15]]],
                    ["row", [["milestone", 16]]],
                    ["row", [["milestone", 17]]],
                    ["row", [["milestone", 18]]],
                    ["row", [["milestone", 19]]],
                ]
            },
        },
    },

    tabFormat: [
                        ["raw-html", function () { return "You have <h3>" + format(player.gh.steel) + "</h3> Steel" }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],

                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 101)}
})
/*        codeExperience: new Decimal(0),
        codeExperienceToGet: new Decimal(0),
        codeExperiencePause: new Decimal(0),

        linesOfCode: new Decimal(0),
        linesOfCodePerSecond: new Decimal(0),

        mods: new Decimal(0),
        modsEffect: new Decimal(1),
        modsToGet: new Decimal(1),
        modsReq: new Decimal(100),

        modSoftcap: new Decimal(1),
        modSoftcapStart: new Decimal(10),*/
