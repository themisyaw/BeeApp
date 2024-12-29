
import beehiveEditSave from "./modules/beehiveEditSave.js"; 
import BeeHivesList from "./modules/beehivesList.js"; 
import BeehivesForFeed from "./modules/beehivesForFeed.js"; 
import BeehiveCreateNew from "./modules/beehiveCreateNew.js";




class App {
    constructor() {
      this.beehivesList = new BeeHivesList(this);
      this.beehiveEditSave = new beehiveEditSave(this);
      this.beehivesForFeed = new BeehivesForFeed(this);
      this.beehiveCreateNew = new BeehiveCreateNew(this);
      
     
  
      this.beehiveEditSaveTab = document.querySelector(".beehiveEditSaveTab");
      this.beehivesListTab = document.querySelector(".beehivesListTab");
      this.beehivesForFeedTab = document.querySelector(".beehiveForFeedTab");
      this.newbeehiveForm = document.querySelector('.newbeehiveForm');
      this.addNewBeeHive = document.querySelector('.addNewBeeHive');
      this.harvestTotal=document.querySelector('.harvestTotal');
      this.beehivesTotal=document.querySelector('.beehivesTotal');
      this.feedTotal=document.querySelector('.feedTotal');

      

     
      this.spinner = document.querySelector(".animatedSection");
      this.spinnerSearchInput = document.querySelector(".animatedSectionSearchInput");
      this.spinnerForFeed = document.querySelector(".animatedSectionForFeed");
      
      this.init();
    }

    displayMessage(message, divClass,timer=true){
      document.querySelector('.messageDiv button').classList.remove('d-none');
      document.querySelector('.messageDiv').classList.remove('errorbg');
      document.querySelector('.messageDiv').classList.remove('bglight');
      document.querySelector('.messageDiv').classList.add('open',divClass);
      document.querySelector('.messageDiv h6').textContent=message;
      if(timer){
        document.querySelector('.messageDiv button').classList.add('d-none');
        setTimeout(() => {
          document.querySelector('.messageDiv').classList.remove('open');
        }, 2000);
      }
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

    async _bottomMenuBeehivesCounter(){
      let beehives = await this.beehivesList.getBeehives();
      
      this.beehivesTotal.innerHTML = beehives.length
      this.harvestTotal.innerHTML = beehives.filter((beehive) => beehive.giaTrugo === true).length;
      this.feedTotal.innerHTML = beehives.filter((beehive) => beehive.giaTaisma === true).length;

    }
    async init() {

      // Initial fetch for grocery items
      let beehives = await this.withSpinner(() => this.beehivesList.getBeehives(),this.spinner);
      let beehivesForTrugos = await this.withSpinner(() => this.beehivesList.getBeehives(),this.spinner);
      let beehivesForFeed = await this.withSpinner(() => this.beehivesList.getBeehivesForFeed(),this.spinner);
      console.log(beehives)
      this._bottomMenuBeehivesCounter();

      document.querySelector('.searchInput').addEventListener('blur',(e)=>{
        
        this.openSearchInputForm(e);
      })
      document.querySelector('.closeCreateNewForm').addEventListener('click',()=>{
        this.closeCreateBeehiveForm();
       
      })
      document.querySelector('.addNewBeeHive').addEventListener('click', async () => {
        try {
            const result = await this.beehiveCreateNew.addNewBeehive(); // Wait for addNewBeehive to complete
            

            if(result){
              beehives = await this.withSpinner(() => this.beehivesList.getBeehives(),this.spinner);
              this._bottomMenuBeehivesCounter();
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
        console.log('yo1');
        console.log(item)
      });
  
      document.querySelector(".openBeehivesListBtn").addEventListener("click", async (e) => {
        this._displayNoneTabs();
        beehives = await this.withSpinner(() => this.beehivesList.getBeehives(),this.spinner);
        
        this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab,null,e);
      });
  
      document.querySelector(".openBeehivesForFeedBtn").addEventListener("click", async (e) => {
        this._displayNoneTabs();
        beehivesForFeed = await this.withSpinner(() => this.beehivesForFeed.getBeehivesForFeed(),this.spinnerForFeed);
        beehivesForFeed = beehivesForFeed.filter((beehive) => beehive.giaTaisma === true);
        this.updateDisplay(this.beehivesForFeed, beehivesForFeed, this.beehivesForFeedTab, "feed",e);
      });
  
      document.querySelector(".openBeehivesForHarvestBtn").addEventListener("click", async (e) => {
        this._displayNoneTabs();
        beehivesForTrugos = await this.withSpinner(() => this.beehivesForFeed.getBeehives(),this.spinnerForFeed);
       
        this.updateDisplay(
          this.beehivesForFeed,
          beehivesForTrugos.filter((beehive) => beehive.giaTrugo === true),
          this.beehivesForFeedTab,
          "harvest",
          e
        );
      });
      // close message div
      document.querySelector('#closeDivBtn').addEventListener('click',this.closeDivMessage.bind(this));

      
  
      this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
    }
    closeDivMessage(){
      document.querySelector('.messageDiv').classList.remove('open');
    }
    
    
    
    async withSpinner(asyncFunction, spinner) {
      try {
        // Start spinner animation
        this.resetSpinner(spinner);
        spinner.classList.remove('d-none')
        spinner.classList.add('d-block')
  
        return await asyncFunction();
      } finally {
        spinner.classList.remove('d-block')
        spinner.classList.add('d-none')
        
      }
    }

  
    resetSpinner(spinner) {
      
      spinner.style.animation = "none"; 
      void spinner.offsetWidth; 
      spinner.style.animation = "loading 1s ease-in-out infinite"; 
    }

    _removeClickedBottomMenu(){
      const menuItems = document.querySelectorAll('.bottomMenuitemText');


      menuItems.forEach(item => {
        item.classList.remove('fw-600');
    });
    }
    updateDisplay(display, items, section, feedOrHarvest,e) {
     
      if(e){
        this._removeClickedBottomMenu();
        const menuItem = e.target.closest('.bottomMenuitemText');
        menuItem.classList.add('fw-600');
      }
      
      if (section) {
        section.classList.remove("d-none");
      }
     
      display.render(items, feedOrHarvest); 
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
        let beehives = await this.withSpinner(() => this.beehivesList.getBeehives(),this.spinner);
        
        this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
    }
    searchResults(beehives) {
      this._displayNoneTabs();
      
      this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
    }
    
    
  }
  
  new App();
  




