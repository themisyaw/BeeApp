
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
  
      this.spinner = document.querySelector(".animatedSection");
      // this.animatedSection = document.querySelector(".animatedSection");
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
        this._displayNoneTabs();
        beehives = await this.withSpinner(() => this.beehivesList.getBeehives());
        
        this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
      });
  
      document.querySelector(".openBeehivesForFeedBtn").addEventListener("click", async () => {
        this._displayNoneTabs();
        beehivesForFeed = await this.withSpinner(() => this.beehivesForFeed.getBeehivesForFeed());
        beehivesForFeed = beehivesForFeed.filter((beehive) => beehive.giaTaisma === true);
        this.updateDisplay(this.beehivesForFeed, beehivesForFeed, this.beehivesForFeedTab, "feed");
      });
  
      document.querySelector(".openBeehivesForHarvestBtn").addEventListener("click", async () => {
        this._displayNoneTabs();
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
        // Start spinner animation
        this.resetSpinner();
        this.spinner.style.display = "block";
  
        return await asyncFunction();
      } finally {
        // Stop spinner animation
        this.spinner.style.display = "none";
        
      }
    }
  
    resetSpinner() {
      // Force reflow to restart animation
      this.spinner.style.animation = "none"; // Stop current animation
      void this.spinner.offsetWidth; // Trigger reflow
      this.spinner.style.animation = "loading 1s ease-in-out infinite"; // Restart animation
    }
  
    updateDisplay(display, items, section, feedOrHarvest) {
     
  
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
  




