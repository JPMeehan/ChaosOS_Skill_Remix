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
        
    }, "WRAPPER");
}

function patchActor5eRollSkill() {}