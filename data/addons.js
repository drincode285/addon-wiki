// Centralized configuration for Teru's Addon Wiki
// To add a new add-on later:
// 1. Copy addons/_template.html to addons/your-addon-slug.html
// 2. Add a new object to the addons array below.
window.TERU_WIKI_CONFIG = {
  siteName: "Teru's Addon Wiki",
  author: "terutherabbit",
  curseforgeProfileUrl: "https://www.curseforge.com/members/terutherabbit/projects",
  addons: [
    {
      slug: "dungeons-of-relic",
      title: "New Dimension: Dungeons of Relic",
      shortTitle: "Dungeons of Relic",
      version: "1.0.0",
      mcVersion: "Bedrock 1.26.50+",
      category: "Dimension",
      tags: ["New Dimension", "Bosses", "3D Armor & Tools", "Enhanced Visuals"],
      summary: "Step into a brand-new dimension with slower days, Ancient City portals, two scenic biomes, the Goblin King boss, Soulfire Wyverns, and 3D Crystalline Armor & Tools upgraded from Netherite.",
      icon: "assets/img/pack_icon.png",
      wikiUrl: "addons/dungeons-of-relic.html",
      curseforgeUrl: "https://www.curseforge.com/minecraft-bedrock/addons/new-dimension-dungeons-of-relic"
    }
  ]
};
