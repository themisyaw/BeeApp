
import beehiveEditSave from "./modules/beehiveEditSave.js"; 
import BeeHivesList from "./modules/beehivesList.js"; 
import BeehivesForFeed from "./modules/beehivesForFeed.js"; 
import BeehiveCreateNew from "./modules/beehiveCreateNew.js";




class App {
    constructor() {
      this.beehivesList = new BeeHivesList(this);
      this.beehiveEditSave = new beehiveEditSave(this);
      this.beehivesForFeed = new BeehivesForFeed();
      this.beehiveCreateNew = new BeehiveCreateNew();
      
     
  
      this.beehiveEditSaveTab = document.querySelector(".beehiveEditSaveTab");
      this.beehivesListTab = document.querySelector(".beehivesListTab");
      this.beehivesForFeedTab = document.querySelector(".beehiveForFeedTab");
      this.newbeehiveForm = document.querySelector('.newbeehiveForm');
      this.addNewBeeHive = document.querySelector('.addNewBeeHive');

      

     
      this.spinner = document.querySelector(".animatedSection");
      // this.animatedSection = document.querySelector(".animatedSection");
      this.init();
    }

    openCreateBeehiveForm() {
      this.newbeehiveForm.classList.toggle('open');
      const addNewIcon =document.querySelector('.addNewIcon');
      if (this.newbeehiveForm.classList.contains('open')) {
          addNewIcon.classList.remove('dashicons-plus-alt2');
          addNewIcon.classList.add('dashicons-minus');
        const inputField = this.newbeehiveForm.querySelector('.newBeehiveNumberInput');
        inputField.focus();
      }else{
        addNewIcon.classList.remove('dashicons-minus');
        addNewIcon.classList.add('dashicons-plus-alt2');
       
      }
  }
    openSearchInputForm(e) {
      console.log(e.target)
      const inputField = document.querySelector('.searchInput');
      const inputDiv = document.querySelector('.openSearchInput');

       inputField.classList.toggle('open');
     

      if (inputField.classList.contains('open')) {
       

        inputDiv.classList.remove('closeSearch');
        inputDiv.classList.add('openSearch');

        const inputField = document.querySelector('.searchInput');
        inputField.value="";
        inputField.focus();
       
      }else{
       
        inputDiv.classList.remove('openSearch');
        inputDiv.classList.add('closeSearch');
       
      }
     
    }
    closeCreateBeehiveForm() {
      this.newbeehiveForm.classList.remove('open');
      document.querySelector('.addNewIcon').classList.remove('dashicons-minus');
      document.querySelector('.addNewIcon').classList.add('dashicons-plus-alt2');
    }

    
    async init() {

      // Initial fetch for grocery items
      let beehives = await this.withSpinner(() => this.beehivesList.getBeehives());
      let beehivesForTrugos = await this.withSpinner(() => this.beehivesList.getBeehives());
      let beehivesForFeed = await this.withSpinner(() => this.beehivesList.getBeehivesForFeed());
      console.log(beehives)

      document.querySelector('.searchInput').addEventListener('blur',(e)=>{
        
        this.openSearchInputForm(e);
      })
      document.querySelector('.closeCreateNewForm').addEventListener('click',()=>{
        this.closeCreateBeehiveForm();
       
      })
      document.querySelector('.addNewBeeHive').addEventListener('click', async () => {
        try {
            const result = await this.beehiveCreateNew.addNewBeehive(); // Wait for addNewBeehive to complete
            console.log('Result from addNewBeehive:', );

            if(result){
              beehives = await this.withSpinner(() => this.beehivesList.getBeehives());
              this._displayNoneTabs();
              this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
            }
          
            
        } catch (error) {
            console.error('Error occurred while adding new beehive:', error);
        }
      });

      document.querySelector('.openAddNewBeehive').addEventListener('click',this.openCreateBeehiveForm.bind(this));
      document.querySelector('.searchIcon').addEventListener('click',this.openSearchInputForm.bind(this));


      document.querySelector(".beehivesListUL").addEventListener("click", (e) => {
       
        const itemElement = e.target.closest(".kypseli");
        const itemID = itemElement.dataset.id;
        if (!itemID) return;
        const item = beehives.find((item) => item.id == itemID);
       
        this._displayNoneTabs();
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
      
      this.spinner.style.animation = "none"; 
      void this.spinner.offsetWidth; 
      this.spinner.style.animation = "loading 1s ease-in-out infinite"; 
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
    
    async showBeehiveList() {
      this._displayNoneTabs();
        let beehives = await this.withSpinner(() => this.beehivesList.getBeehives());
        
        this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
    }
    searchResults(beehives) {
      this._displayNoneTabs();
      
      this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
    }
    
    
  }
  
  new App();
  




