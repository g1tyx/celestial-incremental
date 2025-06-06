﻿addLayer("id", {
    name: "Infinity Dimensions", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "ID", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        // Infinity Power
        infinityPower: new Decimal(0),
        infinityPowerEffect: new Decimal(1),
        infinityPowerEffect2: new Decimal(1),
        infinityPowerPerSecond: new Decimal(0),

        // Dimension Amounts
        dimensionAmounts: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],
        dimensionsPerSecond: [new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),new Decimal(0),],

        //buymax
        dimMax: false,
        ipMax: false,
    }
    },
    automate() {
        if (hasMilestone("s", 13))
        {
            buyBuyable("id", 21)
            buyBuyable("id", 22)
            buyBuyable("id", 23)
            buyBuyable("id", 24)
        }
        if (hasMilestone("s", 17))
        {
            buyBuyable("id", 11)
            buyBuyable("id", 12)
            buyBuyable("id", 13)
            buyBuyable("id", 14)
            buyBuyable("id", 15)
            buyBuyable("id", 16)
            buyBuyable("id", 17)
            buyBuyable("id", 18)
        }
    },
    nodeStyle() {
        return {
            background: "linear-gradient(315deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)",
            "background-origin": "border-box",
            "border-color": "#b87400",
        };
      },

    tooltip: "Infinity Dimensions",
    color: "white",
    update(delta) {
        let onepersec = new Decimal(1)

        // INFINITY POWER EFFECTS
        player.id.infinityPowerEffect = player.id.infinityPower.pow(0.9).add(1)
        player.id.infinityPowerEffect2 = player.id.infinityPower.mul(3).pow(1.6).add(1)

        // START OF INFINITY POWER GAIN
        player.id.infinityPower = player.id.infinityPower.add(player.id.infinityPowerPerSecond.mul(delta))

        player.id.infinityPowerPerSecond = player.id.dimensionAmounts[0]
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(buyableEffect("id", 11))
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(buyableEffect("r", 14))
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(player.ca.replicantiEffect2)
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(player.rm.realmModsEffect[3])
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(levelableEffect("pet", 208)[0])
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(player.sd.singularityPowerEffect2)
        if (hasMilestone("fa", 16)) player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.mul(player.fa.milestoneEffect[5])

        // POWER MODIFIERS
        player.id.infinityPowerPerSecond = player.id.infinityPowerPerSecond.pow(buyableEffect("fu", 42))

        // START OF INFINITY DIMENSION GAIN
        for (let i = 0; i < player.id.dimensionAmounts.length; i++) {
            player.id.dimensionAmounts[i] = player.id.dimensionAmounts[i].add(player.id.dimensionsPerSecond[i].mul(delta))
        }
        for (let i = 0; i < player.id.dimensionAmounts.length-1; i++) {
            player.id.dimensionsPerSecond[i] = player.id.dimensionAmounts[i+1]
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(buyableEffect("id", i+12).div(10))
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(buyableEffect("r", 14))
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(player.ca.replicantiEffect2)
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(player.rm.realmModsEffect[3])
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(levelableEffect("pet", 208)[0])
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(player.sd.singularityPowerEffect2)
            if (hasMilestone("fa", 16)) player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].mul(player.fa.milestoneEffect[5])

            // POWER MODIFIERS
            player.id.dimensionsPerSecond[i] = player.id.dimensionsPerSecond[i].pow(buyableEffect("fu", 42))

        }
    },
    branches: ["ad"],
    clickables: {
        1: {
            title() { return "<h2>Return" },
            canClick() { return true },
            unlocked() { return options.newMenu == false },
            onClick() {
                player.tab = "in"
            },
            style: { width: '100px', "min-height": '50px' },
        },
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.id.dimMax == false },
            unlocked() { return true },
            onClick() {
                player.id.dimMax = true
            },
            style() {
                if (getBuyableAmount('id', 1).lt(8)) {
                    return { width: '75px', "min-height": '50px', borderRadius: '0px' }
                } else {
                    return { width: '75px', "min-height": '50px', borderRadius: '10px 0px 0px 10px' }
                }
            } 
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.id.dimMax == true  },
            unlocked() { return true },
            onClick() {
                player.id.dimMax = false
            },
            style: { width: '75px', "min-height": '50px', borderRadius: '0px 10px 10px 0px' }
        },
        4: {
            title() { return "Buy Max On" },
            canClick() { return player.id.ipMax == false },
            unlocked() { return true },
            onClick() {
                player.id.ipMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        5: {
            title() { return "Buy Max Off" },
            canClick() { return player.id.ipMax == true  },
            unlocked() { return true },
            onClick() {
                player.id.ipMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        1: {
            purchaseLimit() { return new Decimal(8) },
            currency() { return player.points },
            unlocked() { return getBuyableAmount(this.layer, this.id).lt(8) },
            cost(x) {
                if (getBuyableAmount(this.layer, this.id).eq(0)) {
                    return new Decimal("1e600")
                } else if (getBuyableAmount(this.layer, this.id).eq(1)) {
                    return new Decimal("1e900")
                } else if (getBuyableAmount(this.layer, this.id).eq(2)) {
                    return new Decimal("1e1500")
                } else if (getBuyableAmount(this.layer, this.id).eq(3)) {
                    return new Decimal("1e2500")
                } else if (getBuyableAmount(this.layer, this.id).eq(4)) {
                    return new Decimal("1e3300")
                } else if (getBuyableAmount(this.layer, this.id).eq(5)) {
                    return new Decimal("1e4400")
                } else if (getBuyableAmount(this.layer, this.id).eq(6)) {
                    return new Decimal("1e6000")
                } else {
                    return getBuyableAmount(this.layer, this.id).sub(6).mul("1e9000")
                }
            },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Next ID: " + format(tmp[this.layer].buyables[this.id].cost) + " Points"
            },
            buy() {
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            style: { width: '175px', height: '50px', borderRadius: '10px 0px 0px 10px' }
        },
        11: {
            costBase() { return new Decimal(1e11) },
            costGrowth() { return new Decimal(1e2) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("id", 1).gte(1) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                if (player.id.dimMax == false && !hasMilestone("s", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.id.dimensionAmounts[0] = player.id.dimensionAmounts[0].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.id.dimensionAmounts[0] = player.id.dimensionAmounts[0].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        12: {
            costBase() { return new Decimal(1e12) },
            costGrowth() { return new Decimal(1e3) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("id", 1).gte(2) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                if (player.id.dimMax == false && !hasMilestone("s", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.id.dimensionAmounts[1] = player.id.dimensionAmounts[1].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.id.dimensionAmounts[1] = player.id.dimensionAmounts[1].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        13: {
            costBase() { return new Decimal(1e14) },
            costGrowth() { return new Decimal(1e4) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("id", 1).gte(3) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                if (player.id.dimMax == false && !hasMilestone("s", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.id.dimensionAmounts[2] = player.id.dimensionAmounts[2].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.id.dimensionAmounts[2] = player.id.dimensionAmounts[2].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        14: {
            costBase() { return new Decimal(1e17) },
            costGrowth() { return new Decimal(1e5) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("id", 1).gte(4) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                if (player.id.dimMax == false && !hasMilestone("s", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.id.dimensionAmounts[3] = player.id.dimensionAmounts[3].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.id.dimensionAmounts[3] = player.id.dimensionAmounts[3].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        15: {
            costBase() { return new Decimal(1e21) },
            costGrowth() { return new Decimal(1e6) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("id", 1).gte(5) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                if (player.id.dimMax == false && !hasMilestone("s", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.id.dimensionAmounts[4] = player.id.dimensionAmounts[4].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.id.dimensionAmounts[4] = player.id.dimensionAmounts[4].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        16: {
            costBase() { return new Decimal(1e26) },
            costGrowth() { return new Decimal(1e7) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("id", 1).gte(6) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                if (player.id.dimMax == false && !hasMilestone("s", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.id.dimensionAmounts[5] = player.id.dimensionAmounts[5].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.id.dimensionAmounts[5] = player.id.dimensionAmounts[5].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        17: {
            costBase() { return new Decimal(1e32) },
            costGrowth() { return new Decimal(1e8) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("id", 1).gte(7) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                if (player.id.dimMax == false && !hasMilestone("s", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.id.dimensionAmounts[6] = player.id.dimensionAmounts[6].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.id.dimensionAmounts[6] = player.id.dimensionAmounts[6].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        18: {
            costBase() { return new Decimal(1e39) },
            costGrowth() { return new Decimal(1e9) },
            currency() { return player.in.infinityPoints},
            pay(amt) { player.in.infinityPoints = this.currency().sub(amt) },
            effect(x) { return new Decimal(2).pow(getBuyableAmount(this.layer, this.id)) },
            unlocked() { return getBuyableAmount("id", 1).gte(8) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " IP"
            },
            buy() {
                if (player.id.dimMax == false && !hasMilestone("s", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                    player.id.dimensionAmounts[7] = player.id.dimensionAmounts[7].add(1)
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                    player.id.dimensionAmounts[7] = player.id.dimensionAmounts[7].add(max)
                }
            },
            style: { width: '175px', height: '50px', borderRadius: '10px' }
        },
        21: {
            costBase() { return new Decimal(100) },
            costGrowth() { return new Decimal(1.2) },
            currency() { return player.id.infinityPower},
            pay(amt) { player.id.infinityPower = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.25).pow(0.8).add(1) },
            unlocked() { return hasUpgrade("i", 23) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Steel Empowerment"
            },
            display() {
                return "which are multiplying steel gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Power"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#FAB61D", backgroundImage: "linear-gradient(0deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)", backgroundOrigin: "border-box"}
        },
        22: {
            costBase() { return new Decimal(1000) },
            costGrowth() { return new Decimal(1.25) },
            currency() { return player.id.infinityPower},
            pay(amt) { player.id.infinityPower = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.75).add(1) },
            unlocked() { return hasUpgrade("i", 24) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Crystal Empowerment"
            },
            display() {
                return "which are multiplying crystal gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Power"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#FAB61D", backgroundImage: "linear-gradient(0deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)", backgroundOrigin: "border-box"}
        },
        23: {
            costBase() { return new Decimal(100000) },
            costGrowth() { return new Decimal(1.3) },
            currency() { return player.id.infinityPower},
            pay(amt) { player.id.infinityPower = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.1).pow(0.75).add(1) },
            unlocked() { return hasUpgrade("i", 26) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Time Cube Empowerment"
            },
            display() {
                return "which are multiplying time cube gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Power"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#FAB61D", backgroundImage: "linear-gradient(0deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)", backgroundOrigin: "border-box"}
        },
        24: {
            costBase() { return new Decimal(1e10) },
            costGrowth() { return new Decimal(3) },
            currency() { return player.id.infinityPower},
            pay(amt) { player.id.infinityPower = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.5).pow(1.4).add(1) },
            unlocked() { return hasUpgrade("i", 26) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Infinity Point Empowerment"
            },
            display() {
                return "which are multiplying infinity point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Infinity Power"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("s", 13) ) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 13)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', backgroundColor: "#FAB61D", backgroundImage: "linear-gradient(0deg, rgba(255, 129, 38,1) 0%, #f5ea14 100%)", backgroundOrigin: "border-box"}
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
            "Dimensions": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("bi", 17) },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return "You have <h3>" + format(player.in.infinityPoints) + "</h3> infinity points." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 1], ["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("id", 1).gte(1) ? "1st dimension (" + format(buyableEffect("id", "11")) + "x): " + format(player.id.dimensionAmounts[0]) + " (+" + format(player.id.dimensionsPerSecond[0]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 11],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("id", 1).gte(2) ? "2nd dimension (" + format(buyableEffect("id", "12")) + "x): " + format(player.id.dimensionAmounts[1]) + " (+" + format(player.id.dimensionsPerSecond[1]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 12],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("id", 1).gte(3) ? "3rd dimension (" + format(buyableEffect("id", "13")) + "x): " + format(player.id.dimensionAmounts[2]) + " (+" + format(player.id.dimensionsPerSecond[2]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 13],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("id", 1).gte(4) ? "4th dimension (" + format(buyableEffect("id", "14")) + "x): " + format(player.id.dimensionAmounts[3]) + " (+" + format(player.id.dimensionsPerSecond[3]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 14],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("id", 1).gte(5) ? "5th dimension (" + format(buyableEffect("id", "15")) + "x): " + format(player.id.dimensionAmounts[4]) + " (+" + format(player.id.dimensionsPerSecond[4]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 15],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("id", 1).gte(6) ? "6th dimension (" + format(buyableEffect("id", "16")) + "x): " + format(player.id.dimensionAmounts[5]) + " (+" + format(player.id.dimensionsPerSecond[5]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 16],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("id", 1).gte(7) ? "7th dimension (" + format(buyableEffect("id", "17")) + "x): " + format(player.id.dimensionAmounts[6]) + " (+" + format(player.id.dimensionsPerSecond[6]) + "/s)" : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 17],
                    ]],
                    ["row", [
                        ["style-row", [
                            ["raw-html", function () { return getBuyableAmount("id", 1).gte(8) ? "8th dimension (" + format(buyableEffect("id", "18")) + "x): " + format(player.id.dimensionAmounts[7]) : ""}, { color: "white", fontSize: "24px", fontFamily: "monospace" }]
                        ], {width: "700px"}], 
                        ["buyable", 18],
                    ]],
                    ["blank", "25px"],
                ]
            },
            "Buyables": {
                buttonStyle() { return { color: "white", borderRadius: "5px" } },
                unlocked() { return hasUpgrade("bi", 19) },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["ex-buyable", 21], ["ex-buyable", 22], ["ex-buyable", 23], ["ex-buyable", 24]]],
                ]
            },
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.id.infinityPower) + "</h3> infinity power, which boosts antimatter dimensions by x" + format(player.id.infinityPowerEffect) + ", and points by x" + format(player.id.infinityPowerEffect2) + "." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.id.infinityPowerPerSecond) + "</h3> infinity power per second." }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return (player.startedGame == true && player.in.unlockedInfinity && hasUpgrade("bi", 18)) || hasMilestone("s", 19)}
})
