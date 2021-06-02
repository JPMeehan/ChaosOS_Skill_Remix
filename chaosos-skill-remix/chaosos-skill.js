import { libWrapper } from "./lib/libWrapper/shim.js";

const MODULE_NAME = "chaosos-skill-remix"

console.log("foobar")

Hooks.once("setup", () => {
    patchActor5ePrepareData();
    patchActor5eRollSkill();
});

function patchActor5ePrepareData() {
    libWrapper.register(MODULE_NAME, "CONFIG.Actor.entityClass.prototype.prepareData", function patchedPrepareData(wrapped, ...args) {
        wrapped(...args);

        const skills = this.data.data.skills;
        for (let key in skills) {
            let skill = skills[key];
            let bonus = this.getFlag(MODULE_NAME, `${key}.${SKILL_BONUS_KEY}`) || 0;
            let bonusAsInt = parseInt(Number(bonus));
            if (!isNaN(bonusAsInt)) {
                skill.total += bonusAsInt;

                // recalculate passive score, taking observant feat into account
                const observant = this.data.flags.dnd5e?.observantFeat;
                const passiveBonus =
                    observant && CONFIG.DND5E.characterFlags.observantFeat.skills.includes(key) ? 5 : 0;
                skill.passive = 10 + skill.total + passiveBonus;
            }
        }
    }, "WRAPPER");
}

function patchActor5eRollSkill() {}