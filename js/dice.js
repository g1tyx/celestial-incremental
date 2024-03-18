addLayer("d", {
    name: "Dice", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        dicePoints: new Decimal(0),

        //dice
        dice: new Decimal(1),

        //player.d.diceRolls = [new Decimal(1)] 
        //player.d.dice = new Decimal(1)

        diceRolls: [new Decimal(1)],
        diceCooldown: new Decimal(0),
        rollText: "",
        gainedDicePoints: new Decimal(1),
        gainedDicePointsDisplay: new Decimal(1),
        diceSides: new Decimal(6),

        autoRollCooldown: new Decimal(0),
        autoRollTime: new Decimal(0),

        lowestRoll: new Decimal(1),
    }
    },
    automate() {
    },
    nodeStyle() {
        return {
            background: "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(83,83,83,1) 100%)",
            "background-origin": "border-box",
            "border-color": "#0061ff",
        };
    },
    tooltip: "Dice",
    update(delta) {
        let onepersec = new Decimal(1)

        player.d.rollText = player.d.diceRolls.join(", ")

        player.d.diceCooldown = player.d.diceCooldown.sub(onepersec.mul(delta))

        player.d.gainedDicePoints = new Decimal(1)

        player.d.diceSides = new Decimal(6)
        player.d.diceSides = player.d.diceSides.add(buyableEffect("d", 12))

        if (player.d.autoRollCooldown.lt(0))
        {
            for (let i = 0; i < player.d.diceRolls.length; i++)
            {
                player.d.diceRolls[i] = Decimal.add(getRandomInt(player.d.diceSides.sub(player.d.lowestRoll)), player.d.lowestRoll)
                player.d.gainedDicePoints = player.d.gainedDicePoints.mul(player.d.diceRolls[i])
            }
            player.d.gainedDicePointsDisplay = player.d.gainedDicePoints
            player.d.dicePoints = player.d.dicePoints.add(player.d.gainedDicePoints)
            player.d.diceCooldown = new Decimal(1)

            player.d.autoRollCooldown = player.d.autoRollTime
        }
        player.d.autoRollCooldown = player.d.autoRollCooldown.sub(onepersec.mul(delta))

        player.d.autoRollTime = buyableEffect("d", 13)
        player.d.lowestRoll = buyableEffect("d", 14)
    },
    branches: ["cb"],
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
        11: {
            title() { return player.d.diceCooldown.gt(0) ? formatTime(player.d.diceCooldown) : "<h2>Roll!"},
            display() { return "Autoroll: " + formatTime(player.d.autoRollCooldown) },
            canClick() { return player.d.diceCooldown.lt(0) },
            unlocked() { return true },
            onClick() {
                for (let i = 0; i < player.d.diceRolls.length; i++)
                {
                    player.d.diceRolls[i] = Decimal.add(getRandomInt(player.d.diceSides.sub(player.d.lowestRoll)), player.d.lowestRoll)
                    player.d.gainedDicePoints = player.d.gainedDicePoints.mul(player.d.diceRolls[i])
                }
                player.d.gainedDicePointsDisplay = player.d.gainedDicePoints
                player.d.dicePoints = player.d.dicePoints.add(player.d.gainedDicePoints)
                player.d.diceCooldown = new Decimal(1)
            },
            style: { width: '100px', "min-height": '100px' },
        },
    },
    bars: {
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(100).pow(x || getBuyableAmount(this.layer, this.id)).mul(100) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) && player.d.buyables[11].lt(100)},
            title() {
                return "You have " + format(player.d.dice, 0) + "/100 dice."
            },
            display() {
                return "Buys another dice.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(100)
                let growth = 100
                let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                player.d.dice = player.d.dice.add(1)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.d.diceRolls.push(
                    new Decimal(1)
                )
            },
            style: { width: '175px', height: '100px', }
        },
        12: {
            cost(x) { return new Decimal(2).pow(x || getBuyableAmount(this.layer, this.id)).mul(250) },
            effect(x) { return new getBuyableAmount(this.layer, this.id) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Dice Side Boost"
            },
            display() {
                return "which are increasing sides on dice by +" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(250)
                let growth = 2
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
        },
        13: {
            cost(x) { return new Decimal(4).pow(x || getBuyableAmount(this.layer, this.id)).mul(500) },
            effect(x) { return new Decimal(5).div(getBuyableAmount(this.layer, this.id).mul(0.02).add(1)) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) },
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "<br/> Autoroll"
            },
            display() {
                return "Automatically rolls the dice every " + format(tmp[this.layer].buyables[this.id].effect) + " seconds.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(500)
                let growth = 4
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
        },
        14: {
            cost(x) { return new Decimal(2.5).pow(x || getBuyableAmount(this.layer, this.id)).mul(1000) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            canAfford() { return player.d.dicePoints.gte(this.cost()) && player.d.buyables[14].lt(player.d.diceSides)},
            title() {
                return format(getBuyableAmount(this.layer, this.id), 0) + "/" + formatWhole(player.d.diceSides) + "<br/>Low Roll Removal"
            },
            display() {
                return "which are removing " + formatWhole(tmp[this.layer].buyables[this.id].effect) + " of the lowest rolls.\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Dice Points"
            },
            buy() {
                let base = new Decimal(1000)
                let growth = 2.5
                if (player.buyMax == false)
                {
                    let buyonecost = new Decimal(growth).pow(getBuyableAmount(this.layer, this.id)).mul(base)
                    player.d.dicePoints = player.d.dicePoints.sub(buyonecost)
                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else
                {
    
                let max = Decimal.affordGeometricSeries(player.d.dicePoints, base, growth, getBuyableAmount(this.layer, this.id))
                let cost = Decimal.sumGeometricSeries(max, base, growth, getBuyableAmount(this.layer, this.id))
                player.d.dicePoints = player.d.dicePoints.sub(cost)

                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
            }
            },
            style: { width: '175px', height: '100px', }
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
            "Dice": {
                buttonStyle() { return { 'color': 'white' } },
                unlocked() { return true },
                content:
                [
                    ["blank", "25px"],
                    ["row", [["buyable", 11], ["clickable", 11]]],
                    ["blank", "25px"],
                    ["raw-html", function () { return "You are rolling a " + formatWhole(player.d.diceSides) + ' sided dice.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "Current rolls: " + player.d.rollText + '.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["raw-html", function () { return "+" + formatWhole(player.d.gainedDicePointsDisplay) + ' DP.'}, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                    ["blank", "25px"],
                    ["row", [["buyable", 12], ["buyable", 13], ["buyable", 14]]],
    ]

            },
        },
    }, 

    tabFormat: [
        ["raw-html", function () { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, { "color": "white", "font-size": "12px", "font-family": "monospace" }],
        ["raw-html", function () { return "You have <h3>" + formatWhole(player.d.dicePoints) + "</h3> dice points." }, { "color": "white", "font-size": "24px", "font-family": "monospace" }],
                        ["row", [["clickable", 1]]],
                        ["microtabs", "stuff", { 'border-width': '0px' }],
        ],
    layerShown() { return player.startedGame == true && player.po.dice == true}
})
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }