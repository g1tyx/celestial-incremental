﻿addLayer("m", {
    name: "Mods", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    row: 1,
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,

        codeExperience: new Decimal(0),
        codeExperienceToGet: new Decimal(0),
        codeExperiencePause: new Decimal(0),
        codeExperienceEffect: new Decimal(1),

        linesOfCode: new Decimal(0),
        linesOfCodePerSecond: new Decimal(0),

        mods: new Decimal(0),
        modsEffect: new Decimal(1),
        modsToGet: new Decimal(1),
        modsReq: new Decimal(100),

        modSoftcap: new Decimal(1),
        modSoftcapStart: new Decimal(10),

        modMax: false,
    }},
    automate() {
        if (hasMilestone("ip", 17)) {
            buyBuyable("m", 11)
            buyBuyable("m", 12)
            buyBuyable("m", 13)
            buyBuyable("m", 14)
        }
        if (hasMilestone("s", 17)) {
            buyBuyable("m", 15)
            buyBuyable("m", 16)
            buyBuyable("m", 17)
            buyBuyable("m", 18)
        }
    },
    branches: ["gh"],
    nodeStyle() {},
    tooltip: "Mods",
    color: "#1377BF",
    update(delta) {
        let onepersec = new Decimal(1)

        // START OF CODE EXPERIENCE MODIFIERS
        player.m.codeExperienceToGet = player.t.trees.div(1e7).pow(0.3)
        player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(buyableEffect("m", 11))
        player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(levelableEffect("pet", 201)[0])
        player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(player.d.diceEffects[10])
        if (hasUpgrade("ad", 21) && !inChallenge("ip", 14)) player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(upgradeEffect("ad", 21))

        // CHALLENGE MODIFIERS
        if (inChallenge('ip', 15)) player.m.codeExperienceToGet = player.m.codeExperienceToGet.pow(0.65)
        if (inChallenge("ip", 18)) player.m.codeExperienceToGet = player.m.codeExperienceToGet.pow(0.6)
        if (player.de.antidebuffIndex.eq(5)) player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(player.de.antidebuffEffect)
        if (inChallenge("tad", 11)) player.m.codeExperienceToGet = player.m.codeExperienceToGet.pow(0.4)
        if (inChallenge("tad", 11)) player.m.codeExperienceToGet = player.m.codeExperienceToGet.pow(buyableEffect("de", 17))

        // CONTINUED REGULAR MODIFIERS
        player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(player.i.preOTFMult)
        player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(player.co.cores.code.effect[0])

        // POWER MODIFIERS
        player.m.codeExperienceToGet = player.m.codeExperienceToGet.pow(player.co.cores.code.effect[1])

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        player.m.codeExperienceToGet = player.m.codeExperienceToGet.div(player.po.halterEffects[8])
        if (inChallenge("ip", 18) && player.m.codeExperience.gt(player.m.codeExperience.mul(0.2 * delta))) {
            player.m.codeExperience = player.m.codeExperience.sub(player.m.codeExperience.mul(0.2 * delta))
        }
        if (player.r.timeReversed) player.m.codeExperienceToGet = player.m.codeExperienceToGet.mul(0)

        // CODE EXPERIENCE PER SECOND
        if (hasMilestone("ip", 22)) player.m.codeExperience = player.m.codeExperience.add(player.m.codeExperienceToGet.mul(Decimal.mul(delta, 0.1)))

        // CODE EXPERIENCE RESET CODE
        if (player.m.codeExperiencePause.gt(0)) {
            layers.m.codeExperienceReset();
        }
        player.m.codeExperiencePause = player.m.codeExperiencePause.sub(1)

        // CODE EXPERIENCE EFFECT
        player.m.codeExperienceEffect = player.m.codeExperience.add(1).log(1e100).add(1).pow(2)

        //----------------------------------------

        // MOD SOFTCAP START (IMPORTANT FOR LINES OF CODE MODIFIERS)
        player.m.modSoftcapStart = new Decimal(10)
        player.m.modSoftcapStart = player.m.modSoftcapStart.add(buyableEffect("gh", 19))

        // START OF LINES OF CODE MODIFIERS
        player.m.linesOfCodePerSecond = player.m.codeExperience.pow(1.5)
        player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(buyableEffect("m", 12))
        player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(levelableEffect("pet", 202)[0])
        player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(player.d.diceEffects[9])
        if (hasUpgrade("ip", 23) && !inChallenge("ip", 14)) player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(upgradeEffect("ip", 23))

        // CHALLENGE MODIFIERS
        if (player.m.mods.gte(player.m.modSoftcapStart)) player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.div(player.pe.pestEffect[5])

        // CONTINUED REGULAR MODIFIERS
        if (hasUpgrade("ad", 18) && !inChallenge("ip", 14)) player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(upgradeEffect("ad", 18))
        player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(buyableEffect("p", 12))
        if (player.pol.pollinatorEffects.butterfly.enabled) player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(player.pol.pollinatorEffects.butterfly.effects[0])
        player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(player.i.preOTFMult)

        // POWER MODIFIERS

        // MOD SOFTCAP CODE
        if (player.m.mods.gte(player.m.modSoftcapStart)) {
            player.m.modSoftcap = Decimal.pow(player.m.mods.add(1).sub(player.m.modSoftcapStart), 0.5)
            player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.div(player.m.modSoftcap)
        }

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.div(player.po.halterEffects[9])
        if (player.r.timeReversed) player.m.linesOfCodePerSecond = player.m.linesOfCodePerSecond.mul(0)

        // LINES OF CODE PER SECOND
        player.m.linesOfCode = player.m.linesOfCode.add(player.m.linesOfCodePerSecond.mul(delta))

        //----------------------------------------

        // START OF MOD MODIFIERS
        player.m.modsToGet = new Decimal(1)
        if (hasUpgrade("g", 21)) player.m.modsToGet = player.m.modsToGet.mul(upgradeEffect("g", 21))
        player.m.modsToGet = player.m.modsToGet.mul(levelableEffect("pet", 203)[1])
        if (hasMilestone("r", 19)) player.m.modsToGet = player.m.modsToGet.mul(player.r.pentMilestone9Effect[1])
        player.m.modsToGet = player.m.modsToGet.mul(player.d.diceEffects[8])
        player.m.modsToGet = player.m.modsToGet.mul(levelableEffect("pet", 302)[1])
        if (hasUpgrade("ip", 23) && !inChallenge("ip", 14)) player.m.modsToGet = player.m.modsToGet.mul(upgradeEffect("ip", 23))
        if (hasUpgrade("ad", 18) && !inChallenge("ip", 14)) player.m.modsToGet = player.m.modsToGet.mul(upgradeEffect("ad", 18))
        if (hasUpgrade("ip", 33) && !inChallenge("ip", 14)) player.m.modsToGet = player.m.modsToGet.mul(upgradeEffect("ip", 33))
        if (player.de.antidebuffIndex.eq(4)) player.m.modsToGet = player.m.modsToGet.mul(player.de.antidebuffEffect)
        if (player.pol.pollinatorsIndex == 6) player.m.modsToGet = player.m.modsToGet.mul(player.pol.pollinatorsEffect[11])
        if (player.pol.pollinatorEffects.butterfly.enabled) player.m.modsToGet = player.m.modsToGet.mul(player.pol.pollinatorEffects.butterfly.effects[1])
        player.m.modsToGet = player.m.modsToGet.mul(buyableEffect("p", 12))
        player.m.modsToGet = player.m.modsToGet.mul(player.i.preOTFMult)
        player.m.modsToGet = player.m.modsToGet.mul(player.co.cores.code.effect[2])
        if (hasUpgrade("cs", 702)) player.m.modsToGet = player.m.modsToGet.mul(1e15)

        // POWER MODIFIERS
        if (hasUpgrade("hpw", 1043)) player.m.modsToGet = player.m.modsToGet.pow(1.1)
        player.m.modsToGet = player.m.modsToGet.pow(player.cs.scraps.code.effect)
        if (hasUpgrade("cs", 703)) player.m.modsToGet = player.m.modsToGet.pow(1.1)

        // ABNORMAL MODIFIERS, PLACE NEW MODIFIERS BEFORE THIS
        player.m.modsToGet = player.m.modsToGet.div(player.po.halterEffects[10])
        if (inChallenge("ip", 18) && player.m.mods.gt(player.m.mods.mul(0.3 * delta))) {
            player.m.mods = player.m.mods.sub(player.m.mods.mul(0.3 * delta))
        }

        // MOD EFFECT
        player.m.modEffect = player.m.mods.div(6).pow(1.2).add(1)

        // MOD REQUIREMENT
        player.m.modsReq = player.m.mods.pow(1.45).add(100)
        player.m.modsReq = player.m.modsReq.div(levelableEffect("pet", 203)[1])
        if (hasUpgrade("cs", 702)) player.m.modsReq = player.m.modsReq.pow(5)

        // MOD GAIN CODE
        if (player.m.linesOfCode.gte(player.m.modsReq)) {
            player.m.mods = player.m.mods.add(player.m.modsToGet)
            player.m.linesOfCode = new Decimal(0)
        }
    },
    clickables: {
        2: {
            title() { return "Buy Max On" },
            canClick() { return player.m.modMax == false },
            unlocked() { return true },
            onClick() {
                player.m.modMax = true
            },
            style: { width: '75px', minHeight: '50px', }
        },
        3: {
            title() { return "Buy Max Off" },
            canClick() { return player.m.modMax == true  },
            unlocked() { return true },
            onClick() {
                player.m.modMax = false
            },
            style: { width: '75px', minHeight: '50px', }
        },
        11: {
            title() { return "<h3>Reset everything except grasshop and pent for code experience. <br>(Req: 10,000,000 trees and 1e65 celestial points)" },
            canClick() { return player.m.codeExperienceToGet.gte(1) && player.points.gte(1e65) && player.t.trees.gte(10000000) },
            unlocked() { return true },
            onClick() {
                player.m.codeExperiencePause = new Decimal(3)
                player.m.codeExperience = player.m.codeExperience.add(player.m.codeExperienceToGet)
            },
            style: { width: '400px', minHeight: '100px', borderRadius: '15px' },
        },
    },
    codeExperienceReset() {
        player.points = new Decimal(0)
        player.r.rank = new Decimal(0)
        player.r.tier = new Decimal(0)
        if (hasMilestone("r", 14) && !inChallenge("ip", 14)) {player.r.tetr = new Decimal(10)} else {player.r.tetr = new Decimal(0)}
        player.r.ranksToGet = new Decimal(0)
        player.r.tiersToGet = new Decimal(0)
        player.r.tetrsToGet = new Decimal(0)
        player.r.pentToGet = new Decimal(0)

        player.r.factorUnlocks = [true, true, true, false, false, false, false, false]
        player.r.factorGain = new Decimal(1)

        player.r.factorPower = new Decimal(0)
        player.r.factorPowerEffect = new Decimal(1)
        player.r.factorPowerPerSecond = new Decimal(0)
        player.r.powerFactorUnlocks = [true, true, true, false, false, false, false, false]

        player.f.buyables[11] = new Decimal(0)
        player.f.buyables[12] = new Decimal(0)
        player.f.buyables[13] = new Decimal(0)
        player.f.buyables[14] = new Decimal(0)
        player.f.buyables[15] = new Decimal(0)
        player.f.buyables[16] = new Decimal(0)
        player.f.buyables[17] = new Decimal(0)
        player.f.buyables[18] = new Decimal(0)
        player.f.buyables[19] = new Decimal(0)
        player.f.buyables[21] = new Decimal(0)
        player.f.buyables[22] = new Decimal(0)
        player.f.buyables[23] = new Decimal(0)
        player.f.buyables[24] = new Decimal(0)
        player.f.buyables[25] = new Decimal(0)
        player.f.buyables[26] = new Decimal(0)
        player.f.buyables[27] = new Decimal(0)

        player.p.prestigePoints = new Decimal(0)

        if (!hasMilestone("ip", 11)) {
            for (let i = 0; i < player.p.upgrades.length; i++) {
                if (+player.p.upgrades[i] < 24) {
                    player.p.upgrades.splice(i, 1);
                    i--;
                }
            }
        }
        player.t.buyables[11] = new Decimal(0)
        player.t.buyables[12] = new Decimal(0)
        player.t.buyables[13] = new Decimal(0)
        player.t.buyables[14] = new Decimal(0)
        player.t.buyables[15] = new Decimal(0)
        player.t.buyables[16] = new Decimal(0)
        player.t.buyables[17] = new Decimal(0)
        player.t.buyables[18] = new Decimal(0)

        player.f.factorPower = new Decimal(0)

        player.t.leaves = new Decimal(0)
        player.t.trees = new Decimal(0)

        player.g.buyables[11] = new Decimal(0)
        player.g.buyables[12] = new Decimal(0)
        player.g.buyables[13] = new Decimal(0)
        player.g.buyables[14] = new Decimal(0)
        player.g.buyables[15] = new Decimal(0)
        player.g.buyables[16] = new Decimal(0)
        player.g.buyables[17] = new Decimal(0)
        player.g.buyables[18] = new Decimal(0)

        if (!hasMilestone("ip", 11)) {
            for (let i = 0; i < player.g.upgrades.length; i++) {
                if (+player.g.upgrades[i] < 17) {
                    player.g.upgrades.splice(i, 1);
                    i--;
                }
            }
        }
        player.g.grass = new Decimal(0)
        player.g.savedGrass = new Decimal(0)
        player.g.grassCount = new Decimal(0)
        player.g.grassTimer = new Decimal(0)

        player.g.goldGrass = new Decimal(0)
        player.g.savedGoldGrass = new Decimal(0)
        player.g.goldGrassCount = new Decimal(0)
        player.g.goldGrassTimer = new Decimal(0)
    },
    bars: {
        modbar: {
            unlocked: true,
            direction: RIGHT,
            width: 476,
            height: 50,
            progress() {
                if (player.m.linesOfCodePerSecond.div(20).gt(player.m.modsReq)) return new Decimal(1)
                return player.m.linesOfCode.div(player.m.modsReq)
            },
            baseStyle: {backgroundColor: "rgba(0,0,0,0.5)"},
            fillStyle: {backgroundColor: "#1377BF"},
            textStyle: {fontSize: "14px"},
            display() {
                if (player.m.linesOfCodePerSecond.div(20).gt(player.m.modsReq)) return "There is currently an excess of code."
                let str = format(player.m.linesOfCode) + "/" + format(player.m.modsReq) + " (+" + format(player.m.linesOfCodePerSecond) + "/s)<br>Lines of code to make a mod."
                if (player.m.mods.gte(player.m.modSoftcapStart)) str = str.concat("<br><small style='color:red;font-size:12px'>After " + formatWhole(player.m.modSoftcapStart) + " mods, lines of code are divided by " + format(player.m.modSoftcap) + "</small>")
                return str
            },
        },
    },
    upgrades: {},
    buyables: {
        11: {
            costBase() { return new Decimal(4) },
            costGrowth() { return new Decimal(1.3) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.m.mods},
            pay(amt) { player.m.mods = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.8).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Code Experience Multiplier"
            },
            display() {
                return "which are boosting code experience gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("ip", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("ip", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        12: {
            costBase() { return new Decimal(6) },
            costGrowth() { return new Decimal(1.35) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.m.mods},
            pay(amt) { player.m.mods = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).pow(0.9).mul(0.25).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Lines of Code Multiplier"
            },
            display() {
                return "which are boosting lines of code gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("ip", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("ip", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        13: {
            costBase() { return new Decimal(9) },
            costGrowth() { return new Decimal(1.4) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.m.mods},
            pay(amt) { player.m.mods = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Golden Grass Value Multiplier"
            },
            display() {
                return "which are boosting golden grass value by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("ip", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("ip", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        14: {
            costBase() { return new Decimal(15) },
            costGrowth() { return new Decimal(1.5) },
            purchaseLimit() { return new Decimal(1000) },
            currency() { return player.m.mods},
            pay(amt) { player.m.mods = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).add(1) },
            unlocked() { return true },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Basic Multiplier"
            },
            display() {
                return "which are boosting point, factor power, and prestige point gain by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
            },
            buy(mult) {
                if (mult != true && !hasMilestone("ip", 17)) {
                    let buyonecost = new Decimal(this.costGrowth()).pow(getBuyableAmount(this.layer, this.id)).mul(this.costBase())
                    this.pay(buyonecost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                } else {
                    let max = Decimal.affordGeometricSeries(this.currency(), this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (max.gt(this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)))) { max = this.purchaseLimit().sub(getBuyableAmount(this.layer, this.id)) }
                    let cost = Decimal.sumGeometricSeries(max, this.costBase(), this.costGrowth(), getBuyableAmount(this.layer, this.id))
                    if (!hasMilestone("ip", 17)) this.pay(cost)

                    setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(max))
                }
            },
            style: { width: '275px', height: '150px', }
        },
        15: {
            costBase() { return new Decimal(1e60) },
            costGrowth() { return new Decimal(100) },
            purchaseLimit() { return new Decimal(250) },
            currency() { return player.m.mods},
            pay(amt) { player.m.mods = this.currency().sub(amt) },
            effect(x) {
                return getBuyableAmount(this.layer, this.id).pow(0.75).mul(0.005).add(1)
            },
            unlocked() { return hasUpgrade("bi", 113) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "Antimatter Softcap Reducer"
            },
            display() {
                return "which are boosting antimatter softcap base by x" + format(tmp[this.layer].buyables[this.id].effect, 3) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
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
            style: {width: '275px', height: '150px'},
        },
        16: {
            costBase() { return new Decimal(1e65) },
            costGrowth() { return new Decimal(1e5) },
            purchaseLimit() { return new Decimal(100) },
            currency() { return player.m.mods},
            pay(amt) { player.m.mods = this.currency().sub(amt) },
            effect(x) { return new getBuyableAmount(this.layer, this.id).mul(0.1).add(1) },
            unlocked() { return hasUpgrade("bi", 113) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "NIP Base Booster"
            },
            display() {
                return "which are raising negative infinity points base formula by ^" + format(tmp[this.layer].buyables[this.id].effect, 1) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
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
            style: {width: '275px', height: '150px'},
        },
        17: {
            costBase() { return new Decimal(1e80) },
            costGrowth() { return new Decimal(1e10) },
            purchaseLimit() { return new Decimal(50) },
            currency() { return player.m.mods},
            pay(amt) { player.m.mods = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(8, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return hasUpgrade("bi", 113) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "AD Octupler"
            },
            display() {
                return "which are boosting antimatter dimensions by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
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
            style: {width: '275px', height: '150px'},
        },
        18: {
            costBase() { return new Decimal(1e100) },
            costGrowth() { return new Decimal(1e20) },
            purchaseLimit() { return new Decimal(25) },
            currency() { return player.m.mods},
            pay(amt) { player.m.mods = this.currency().sub(amt) },
            effect(x) { return Decimal.pow(2, getBuyableAmount(this.layer, this.id)) },
            unlocked() { return hasUpgrade("bi", 113) },
            cost(x) { return this.costGrowth().pow(x || getBuyableAmount(this.layer, this.id)).mul(this.costBase()) },
            canAfford() { return this.currency().gte(this.cost()) },
            title() {
                return "NIP Doubler"
            },
            display() {
                return "which are boosting negative infinity points by x" + format(tmp[this.layer].buyables[this.id].effect) + ".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Mods"
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
            style: {width: '275px', height: '150px'},
        },
    },
    milestones: {},
    challenges: {},
    infoboxes: {},
    microtabs: {},
    tabFormat: [
        ["raw-html", () => { return "You have <h3>" + format(player.points) + "</h3> celestial points (" + format(player.gain) + "/s)." }, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
        ["row", [
            ["raw-html", () => { return "You have <h3>" + format(player.m.codeExperience) + "</h3> Code Experience" }, {color: "#1377BF", fontSize: "24px", fontFamily: "monospace"}],
            ["raw-html", () => { return "(+" + format(player.m.codeExperienceToGet) + ")"}, () => {
                let look = {fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}
                if (player.m.codeExperienceToGet.gt(1)) {look.color = "#1377BF"} else {look.color = "gray"}
                return look
            }],
        ]],
        ["raw-html", () => {return hasUpgrade("cs", 701) ? "Boosts factor base by x" + format(player.m.codeExperienceEffect) : ""}, {color: "#1377BF", fontSize: "20px", fontFamily: "monospace"}],
        ["blank", "15px"],
        ["clickable", 11],
        ["blank", "25px"],
        ["style-column", [
            ["blank", "10px"],
            ["row", [
                ["raw-html", () => { return "You have " + formatWhole(player.m.mods) + " mods"}, {color: "white", fontSize: "24px", fontFamily: "monospace"}],
                ["raw-html", () => { return player.m.linesOfCodePerSecond.div(20).gt(player.m.modsReq) ? "(+" + format(player.m.modsToGet, 1) + "/s)" : "(+" + format(player.m.modsToGet, 1) + ")"}, {color: "white", fontSize: "24px", fontFamily: "monospace", marginLeft: "10px"}],
            ]],
            ["raw-html", () => {return "Boosts tree gain by x" + format(player.m.modEffect) + "."}, {color: "white", fontSize: "16px", fontFamily: "monospace"}],
            ["blank", "10px"],
            ["bar", "modbar"],
            ["blank", "10px"],
        ], {width: "550px", backgroundColor: "#031726", border: "3px solid #ccc", borderRadius: "15px"}],
        ["blank", "25px"],
        ["style-row", [
            ["ex-buyable", 11], ["ex-buyable", 12], ["ex-buyable", 13], ["ex-buyable", 14],
            ["ex-buyable", 15], ["ex-buyable", 16], ["ex-buyable", 17], ["ex-buyable", 18]
        ], {maxWidth: "1200px"}],
        ["blank", "25px"],
    ],
    layerShown() { return player.startedGame == true && hasMilestone("r", 14) }
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
