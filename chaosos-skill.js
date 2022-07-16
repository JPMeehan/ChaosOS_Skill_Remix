import { libWrapper } from "./lib/libWrapper/shim.js";

const MODULE_NAME = "chaosos-skill-remix"

console.log("foobar")

Hooks.once("setup", () => {
    patchActor5ePrepareData();
    patchActor5eRollSkill();
});



Hooks.once('setup', async function dnd5eExtenderSetup() {
    console.log(MODULE_ID, '|', `Initializing ${MODULE_ID}`);

    // Set a class name on the body so our css overrides will take effect
    // $('body').addClass('dnd5e-extender');

    // registerRenderActorSheet5eHook()
    // patchActor5e_prepareDerivedData();
    // patchEntityCollection_importFromCollection();
    // registerSettings();
    addCustomConfig();

    // Load Handlebars templates last as it is comparatively expensive and
    // we need to beat dnd5e starting to set up
    await loadTemplates(Object.values(flattenObject(TEMPLATES)));

    Hooks.call(`DND5eExtenderReady`);
});

function patchActor5ePrepareData() {
    libWrapper.register(MODULE_NAME, "CONFIG.Actor.entityClass.prototype.prepareData", function patchedPrepareData(wrapped, ...args) {
        wrapped(...args);

        const skills = this.data.data.skills;
        
    }, "WRAPPER");
}

function addCustomConfig() {
    const customAbilities = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_ABILITIES);
    for (let { abbreviation, title } of customAbilities) {
        CONFIG.DND5E.abilities[abbreviation] = title;
        CONFIG.DND5E.abilityAbbreviations[abbreviation] = abbreviation;

        // Inject the label and abbreviation for each custom ability as a translation
        const capitalizedAbbr = abbreviation.charAt(0).toUpperCase() + abbreviation.slice(1);
        setProperty(game.i18n.translations.DND5E, `Ability${capitalizedAbbr}`, title);
        setProperty(game.i18n.translations.DND5E, `Ability${capitalizedAbbr}Abbr`, abbreviation);
    }

    const customSkills = game.settings.get(MODULE_ID, SETTINGS.CUSTOM_SKILLS);
    for (let { abbreviation, title } of customSkills) {
        CONFIG.DND5E.skills[abbreviation] = title;

        // Inject the title for each custom skill as a translation
        const capitalizedAbbr = abbreviation.charAt(0).toUpperCase() + abbreviation.slice(1);
        setProperty(game.i18n.translations.DND5E, `Skill${capitalizedAbbr}`, title);
    }
}

function patchActor5eRollSkill() {}