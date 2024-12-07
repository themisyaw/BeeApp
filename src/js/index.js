
import beehiveEditSave from "./modules/beehiveEditSave.js"; 
import BeeHivesList from "./modules/beehivesList.js"; 
import BeehivesForFeed from "./modules/beehivesForFeed.js"; 

class App {
    constructor() {
      this.beehivesList = new BeeHivesList();
      this.beehiveEditSave = new beehiveEditSave();
      this.beehivesForFeed = new BeehivesForFeed();
  
      this.beehiveEditSaveTab = document.querySelector(".beehiveEditSaveTab");
      this.beehivesListTab = document.querySelector(".beehivesListTab");
      this.beehivesForFeedTab = document.querySelector(".beehiveForFeedTab");
  
      this.spinner = document.querySelector(".animated-element");
  
      this.init();
    }
  
    async init() {
      // Initial fetch for grocery items
      let beehives = await this.withSpinner(() => this.beehivesList.getBeehives());
      let beehivesForTrugos = await this.withSpinner(() => this.beehivesList.getBeehives());
      let beehivesForFeed = await this.withSpinner(() => this.beehivesList.getBeehivesForFeed());
  
      document.querySelector(".beehivesListUL").addEventListener("click", (e) => {
        const itemElement = e.target.closest(".kypseli");
        const itemID = itemElement.dataset.id;
        const item = beehives.find((item) => item.id == itemID);
        if (!itemID) return;
        this.updateDisplay(this.beehiveEditSave, item, this.beehiveEditSaveTab);
      });
  
      document.querySelector(".openBeehivesListBtn").addEventListener("click", async () => {
        
        beehives = await this.withSpinner(() => this.beehivesList.getBeehives());
        
        this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
      });
  
      document.querySelector(".openBeehivesForFeedBtn").addEventListener("click", async () => {
        beehivesForFeed = await this.withSpinner(() => this.beehivesForFeed.getBeehivesForFeed());
        beehivesForFeed = beehivesForFeed.filter((beehive) => beehive.giaTaisma === true);
        this.updateDisplay(this.beehivesForFeed, beehivesForFeed, this.beehivesForFeedTab, "feed");
      });
  
      document.querySelector(".openBeehivesForHarvestBtn").addEventListener("click", async () => {
        beehivesForTrugos = await this.withSpinner(() => this.beehivesForFeed.getBeehives());
       
        this.updateDisplay(
          this.beehivesForFeed,
          beehivesForTrugos.filter((beehive) => beehive.giaTrugo === true),
          this.beehivesForFeedTab,
          "harvest"
        );
      });
  
      this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
    }
  
    async withSpinner(asyncFunction) {
      try {
     
        this.spinner.style.display = "block"; // Show spinner
        return await asyncFunction(); // Execute the async function
      } finally {
        this.spinner.style.display = "none"; // Hide spinner
      }
    }
  
    updateDisplay(display, items, section, feedOrHarvest) {
      this._displayNoneTabs();
  
      if (section) {
        section.classList.remove("d-none");
      }
  
      display.render(items, feedOrHarvest); // Render new content
    }
  
    _displayNoneTabs() {
      if (this.beehiveEditSaveTab) {
        this.beehiveEditSaveTab.classList.remove("d-block");
      }
      this.beehivesListTab.classList.remove("d-block");
      if (this.beehiveEditSaveTab) {
        this.beehiveEditSaveTab.classList.add("d-none");
      }
      this.beehivesListTab.classList.add("d-none");
      if (this.beehivesForFeedTab) {
        this.beehivesForFeedTab.classList.add("d-none");
      }
      this.beehivesForFeedTab.classList.add("d-none");
    }
  }
  
  new App();
  




