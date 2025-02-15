addLayer("pol", {
    name: "Pollinators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PO", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        pollinators: new Decimal(0),
        pollinatorsPerSecond: new Decimal(0),

        pollinatorsEffect: [new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)],
        pollinatorsIndex: 0,
        pollinatorsMax: false
    }
    },
    automate() {
        if (hasMilestone("s", 16))
        {
            buyBuyable("pol", 11)
            buyBuyable("pol", 12)
            buyBuyable("pol", 13)
            buyBuyable("pol", 14)
        }
        if (hasMilestone("s", 17))
        {
            buyUpgrade("pol", 11)
            buyUpgrade("pol", 12)
            buyUpgrade("pol", 13)
            buyUpgrade("pol", 14)
            buyUpgrade("pol", 15)
            buyUpgrade("pol", 16)
            buyUpgrade("pol", 17)
            buyUpgrade("pol", 18)
        }
    },
    nodeStyle() {
    },
    tooltip: "Pollinators",
    color: "#cb8e00",

    update(delta) {
        let onepersec = new Decimal(1)

        if (hasUpgrade("i", 22)) {
            player.pol.pollinatorsPerSecond = player.g.grass.add(1).log(10).pow(0.75).div(3)
            if (hasUpgrade("pol", 12)) { player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("pol", 12)) }
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 12))
            if (hasUpgrade("g", 23)) { player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("g", 23)) }
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("cb", 15))
            player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(buyableEffect("p", 13))
            if (hasUpgrade("bi", 17)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("bi", 17))
            if (hasMilestone("gs", 18)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(player.gs.milestone8Effect)
            if (player.pol.pollinators.gt(1e15)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.pow(0.8)
            if (player.pol.pollinators.lt(player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 11)).add(1))) {
                player.pol.pollinators = player.pol.pollinatorsPerSecond.mul(buyableEffect("pol", 11)).add(1)
            }
            if (hasUpgrade("s", 13)) player.pol.pollinatorsPerSecond = player.pol.pollinatorsPerSecond.mul(upgradeEffect("s", 13))

            player.pol.pollinators = player.pol.pollinators.add(player.pol.pollinatorsPerSecond.mul(delta))

        }
    

        switch (player.pol.pollinatorsIndex) {
            case 0:
                break;
            case 1:
                player.pol.pollinatorsEffect = [
                    player.pol.pollinators.pow(2.7).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Celestial Points
                    player.pol.pollinators.add(1).log(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Factor Base
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                break;
            case 2:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0),
                    player.pol.pollinators.pow(2.9).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Factor Power
                    player.pol.pollinators.pow(3.1).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Prestige Points
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                break;
            case 3:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.pow(3.1).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Leafs
                    player.pol.pollinators.pow(2.9).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Trees
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                break;
            case 4:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.pow(2.1).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Grass Value
                    player.pol.pollinators.pow(0.45).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Golden Grass Value
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                break;
            case 5:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.pow(0.7).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Grasshoppers
                    player.pol.pollinators.pow(1.3).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Fertilizer
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                break;
            case 6:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.pow(2.3).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Lines of Code
                    player.pol.pollinators.pow(2.1).div(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Mods
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1)
                ];
                break;
            case 7:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    player.pol.pollinators.add(1).log(10).mul(1.5).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Dice Points
                    player.pol.pollinators.add(1).log(10).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // Rocket Fuel
                    player.pol.pollinators.add(1).log(100).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), // All Hex Points
                    player.pol.pollinators.add(1).log(100).pow(0.5).div(2).add(1).pow(buyableEffect("pol", 14)), new Decimal(1), new Decimal(1) // Realm Mod Energy
                ];
                break;
            case 8:
                player.pol.pollinatorsEffect = [
                    new Decimal(1), new Decimal(0), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1),
                    new Decimal(1), new Decimal(1), new Decimal(1), new Decimal(1), 
                    player.pol.pollinators.add(1).log(10).pow(1.75).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)), //steel
                    player.pol.pollinators.add(1).log(65).pow(0.75).div(1.5).add(1).pow(buyableEffect("pol", 14)).pow(buyableEffect("cs", 28)) //oil
                ];
                break;
        }
    },
    branches: ["g", "gh"],
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
            canClick() { return player.pol.pollinatorsMax == false },
            unlocked() { return hasUpgrade("pol", 13) },
            onClick() {
                player.pol.pollinatorsMax = true
            },
            style: { width: '75px', "min-height": '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.pol.pollinatorsMax == true  },
            unlocked() { return hasUpgrade("pol", 13) },
            onClick() {
                player.pol.pollinatorsMax = false
            },
            style: { width: '75px', "min-height": '50px', }
        },
        11: {
            title() { return "<img src='resources/pollinators/cross.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pol.pollinatorsIndex = 0
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#28242c", 'border-width': '4px' },
        },
        12: {
            title() { return "<img src='resources/pollinators/beetle.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pol.pollinatorsIndex = 1
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#eaf6f7", 'border-width': '4px' },
        },
        13: {
            title() { return "<img src='resources/pollinators/fly.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pol.pollinatorsIndex = 2
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#31aeb0", 'border-width': '4px' },
        },
        14: {
            title() { return "<img src='resources/pollinators/bat.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return true },
            onClick() {
                player.pol.pollinatorsIndex = 3
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#0B6623", 'border-width': '4px' },
        },
        15: {
            title() { return "<img src='resources/pollinators/wind.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return hasUpgrade("pol", 11) },
            onClick() {
                player.pol.pollinatorsIndex = 4
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#119B35", 'border-width': '4px' },
        },
        16: {
            title() { return "<img src='resources/pollinators/bee.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return hasUpgrade("pol", 14) },
            onClick() {
                player.pol.pollinatorsIndex = 5
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#19e04d", 'border-width': '4px' },
        },
        17: {
            title() { return "<img src='resources/pollinators/butterfly.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return hasUpgrade("pol", 16) },
            onClick() {
                player.pol.pollinatorsIndex = 6
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "#0951a6", 'border-width': '4px' },
        },
        18: {
            title() { return "<img src='resources/pollinators/ant.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return hasUpgrade("pol", 18) },
            onClick() {
                player.pol.pollinatorsIndex = 7
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "linear-gradient(45deg, #8a00a9, #0061ff)", 'border-color': "purple", 'border-width': '4px' },
        },
        19: {
            title() { return "<img src='resources/pollinators/gear.png' style='width:calc(80%);height:calc(80%);padding-top:20%'></img>"},
            canClick() { return true },
            unlocked() { return hasUpgrade("bi", 114) },
            onClick() {
                player.pol.pollinatorsIndex = 8
            },
            style: { width: '100px', 'min-height': '100px', 'font-size': '30px', 'border-radius': "0%", background: "linear-gradient(45deg, #919191, #545454)", 'border-color': "gray", 'border-width': '4px' },
        },
    },
    bars: {
    },
    upgrades: {
        11:
        {
            title: "Pollinator Upgrade I",
            unlocked() { return true },
            description() { return "Unlocks the wind pollinator." },
            cost: new Decimal(1000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        12:
        {
            title: "Pollinator Upgrade II",
            unlocked() { return true },
            description() { return "Boost pollinator gain based on pollinators." },
            cost: new Decimal(2500),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
            effect() {
                return player.pol.pollinators.add(1).pow(new Decimal(0.1).add(buyableEffect("pol", 13))).div(4).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '120px', },
        },
        13:
        {
            title: "Pollinator Upgrade III",
            unlocked() { return true },
            description() { return "Unlocks pollinator buyables." },
            cost: new Decimal(10000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        14:
        {
            title: "Pollinator Upgrade IV",
            unlocked() { return true },
            description() { return "Unlocks the bee pollinator." },
            cost: new Decimal(25000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        15:
        {
            title: "Pollinator Upgrade V",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Unlocks more pollinator buyables." },
            cost: new Decimal(100000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        16:
        {
            title: "Pollinator Upgrade VI",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Unlocks the butterfly pollinator." },
            cost: new Decimal(500000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
        17:
        {
            title: "Pollinator Upgrade VII",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Boost Crystals based on pollinators." },
            cost: new Decimal(2500000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
            effect() {
                return player.pol.pollinators.add(1).log(10).div(2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            style: { width: '150px', height: '120px', },
        },
        18:
        {
            title: "Pollinator Upgrade VIII",
            unlocked() { return hasUpgrade("i", 25) },
            description() { return "Unlocks the ant pollinator." },
            cost: new Decimal(10000000),
            currencyLocation() { return player.pol },
            currencyDisplayName: "Pollinators",
            currencyInternalName: "pollinators",
        },
    },
    buyables: {
        11: {
            costBase() { return new Decimal(5000) },
            costGrowth() { return new Decimal(2) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(5) },
            unlocked() { return hasUpgrade("pol", 13) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Promised Pollinators"
            },
            display() {
                return "which guarantees you have at least " + format(tmp[this.layer].buyables[this.id].effect) + " seconds worth of pollinators.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy() {
                if (player.pol.pollinatorsMax == false && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(10000) },
            costGrowth() { return new Decimal(2.25) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(1.75).mul(0.25).add(1) },
            unlocked() { return hasUpgrade("pol", 13) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Plentiful Pollinators"
            },
            display() {
                return "which boosts pollinator gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy() {
                if (player.pol.pollinatorsMax == false && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(50000) },
            costGrowth() { return new Decimal(2.5) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).pow(0.5).mul(0.03) },
            unlocked() { return hasUpgrade("pol", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/>Propagating Pollinators"
            },
            display() {
                return "which improves pollinator upgrade II's scaling by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy() {
                if (player.pol.pollinatorsMax == false && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(1000000) },
            costGrowth() { return new Decimal(10) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.pol.pollinators},
            pay(amt) { player.pol.pollinators = this.currency().sub(amt) },
            effect(x) { return getBuyableAmount(this.layer, this.id).mul(0.01).add(1) },
            unlocked() { return hasUpgrade("pol", 15) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/25<br/>Potent Pollination"
            },
            display() {
                return "which boosts pollinator effects by ^" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollinators"
            },
            buy() {
                if (player.pol.pollinatorsMax == false && !hasMilestone("s", 16)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("s", 16)) this.pay(cost)

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
        p0: {
            title: "None",
            body() { return "Fun Fact: Without pollinators, all terrestrial ecosystems will collapse." },
            unlocked() { return player.pol.pollinatorsIndex == 0},
        },
        p1: {
            title: "Beetle",
            body() { return "Fun Fact: Beetles pollinate close to 90% of all flowering plants." },
            unlocked() { return player.pol.pollinatorsIndex == 1},
        },
        p2: {
            title: "Fly",
            body() { return "Fun Fact: Flies are the dominant pollinator in alpine and subarctic environments." },
            unlocked() { return player.pol.pollinatorsIndex == 2},
        },
        p3: {
            title: "Bat",
            body() { return "Fun Fact: 300 species of fruit rely on bats for pollination. These include species of bananas, mangoes, and durians." },
            unlocked() { return player.pol.pollinatorsIndex == 3},
        },
        p4: {
            title: "Wind",
            body() { return "Fun Fact: 12% of all flowering plants, including most grasses, are wind pollinated." },
            unlocked() { return player.pol.pollinatorsIndex == 4},
        },
        p5: {
            title: "Bee",
            body() { return "Fun Fact: A fourth of all food production relies on bee pollination." },
            unlocked() { return player.pol.pollinatorsIndex == 5},
        },
        p6: {
            title: "Butterfly",
            body() { return "Fun Fact: Butterflies tend to pollinate colorful plants. (Researchers don't study butterflies so this is all I got)" },
            unlocked() { return player.pol.pollinatorsIndex == 6},
        },
        p7: {
            title: "Ant",
            body() { return "Fun Fact: Ants are not very effective pollinators, but they still do it." },
            unlocked() { return player.pol.pollinatorsIndex == 7},
        },
        p8: {
            title: "Mechanical Pollation",
            body() { return "Fun Fact: Humans can also contribute to pollination, by utillizing techniques such as using pollen spray systems, air blasters, and also pollinating by hand." },
            unlocked() { return player.pol.pollinatorsIndex == 8},
        }
    },
    microtabs: {
        stuff: {
            "Main": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 0 ? "<h1>You are currently selecting nothing." : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 1 ? "<h1>You are currently selecting the Beetle.<br><h2>Celestial Points: x" + format(player.pol.pollinatorsEffect[0]) + "<br><h2>Factor Base: x" + format(player.pol.pollinatorsEffect[1]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 2 ? "<h1>You are currently selecting the Fly.<br><h2>Factor Power: x" + format(player.pol.pollinatorsEffect[2]) + "<br><h2>Prestige Points: x" + format(player.pol.pollinatorsEffect[3]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 3 ? "<h1>You are currently selecting the Bat.<br><h2>Leaves: x" + format(player.pol.pollinatorsEffect[4]) + "<br><h2>Trees: x" + format(player.pol.pollinatorsEffect[5]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 4 ? "<h1>You are currently selecting Wind.<br><h2>Grass Value: x" + format(player.pol.pollinatorsEffect[6]) + "<br><h2>Golden Grass Value: x" + format(player.pol.pollinatorsEffect[7]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 5 ? "<h1>You are currently selecting the Bee.<br><h2>Grasshoppers: x" + format(player.pol.pollinatorsEffect[8]) + "<br><h2>Fertilizer: x" + format(player.pol.pollinatorsEffect[9]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 6 ? "<h1>You are currently selecting the Butterfly.<br><h2>Lines of Code: x" + format(player.pol.pollinatorsEffect[10]) + "<br><h2>Mods: x" + format(player.pol.pollinatorsEffect[11]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 ? "<h1>You are currently selecting the Ant. <h5>(requires an otf selection)" : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 && player.po.dice ? "<h2>Dice Points: x" + format(player.pol.pollinatorsEffect[12]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace", "line-height": "1.8" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 && player.po.rocketFuel ? "<h2>Rocket Fuel: x" + format(player.pol.pollinatorsEffect[13]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace", "line-height": "1.8" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 && player.po.hex ? "<h2>All Hex Points: x" + format(player.pol.pollinatorsEffect[14]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace", "line-height": "1.8" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 7 && player.po.realmMods ? "<h2>Realm Mod Energy: x" + format(player.pol.pollinatorsEffect[15]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace", "line-height": "1.8" }],
                    ["raw-html", function () { return player.pol.pollinatorsIndex == 8 ? "<h1>You are currently selecting the Machine.<br><h2>Steel: x" + format(player.pol.pollinatorsEffect[16]) + "<br><h2>Oil: x" + format(player.pol.pollinatorsEffect[17]) : "" }, { "color": "white", "font-size": "16px", "font-family": "monospace" }],

                    ["blank", "25px"],
                    ["row", [["clickable", 11], ["clickable", 12], ["clickable", 13], ["clickable", 14], ["clickable", 15],]],
                    ["row", [ ["clickable", 16], ["clickable", 17], ["clickable", 18], ["clickable", 19]]],
                    ["blank", "25px"],
                    ["row", [["infobox", "p0"], ["infobox", "p1"], ["infobox", "p2"], ["infobox", "p3"], ["infobox", "p4"], ["infobox", "p5"], ["infobox", "p6"], ["infobox", "p7"], ["infobox", "p8"]]],
                ]
            },
            "Upgrades": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["upgrade", 11], ["upgrade", 12], ["upgrade", 13], ["upgrade", 14]]],
                    ["row", [["upgrade", 15], ["upgrade", 16], ["upgrade", 17], ["upgrade", 18]]],
                    ["blank", "25px"],
                    ["row", [["clickable", 2], ["clickable", 3]]],
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["buyable", 12]]],
                    ["row", [["buyable", 13], ["buyable", 14]]]
                ]
            }
        },
    },

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.pol.pollinators) + "</h3> pollinators." }, { "color": "#cb8e00", "font-size": "24px", "font-family": "monospace" }],
        ["raw-html", function () { return "You are gaining <h3>" + format(player.pol.pollinatorsPerSecond) + "</h3> pollinators per second." }, { "color": "#cb8e00", "font-size": "16px", "font-family": "monospace" }],
        ["raw-html", function () { return player.pol.pollinators.gt(1e15) ? "[SOFTCAPPED]" : ""}, { "color": "white", "font-size": "16px", "font-family": "monospace" }],
        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && hasUpgrade("i", 22) && !(inChallenge("ip", 12) || inChallenge("ip", 18)) }
})
