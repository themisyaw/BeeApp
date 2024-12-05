
import beehiveEditSave from "./modules/beehiveEditSave.js"; 
import BeeHivesList from "./modules/beehivesList.js"; 
import BeehivesForFeed from "./modules/beehivesForFeed.js"; 

 class App {
    constructor() {
        this.beehivesList = new BeeHivesList();
        this.beehiveEditSave = new beehiveEditSave();
        this.beehivesForFeed = new BeehivesForFeed();


        this.beehiveEditSaveTab = document.querySelector(".beehiveEditSaveTab");
        this.beehivesListTab = document.querySelector('.beehivesListTab');
        this.beehivesForFeedTab = document.querySelector('.beehiveForFeedTab');
       
        this.init();
    }
    async init() {
        // Initial fetch for grocery items
        let beehives = await this.beehivesList.getBeehives();
        let beehivesForFeed = await this.beehivesList.getBeehivesForFeed();
        console.log('BeeHives from API');
        console.log(beehives)
       
        document.querySelector('.beehivesListUL').addEventListener('click',(e)=>{
            const itemElement = e.target.closest('.kypseli');
            console.log(e.target)
            console.log(itemElement)
            const itemID =itemElement.dataset.id;
            const item =beehives.find(item => item.id == itemID);
            if(!itemID)return;
            this.updateDisplay(this.beehiveEditSave, item, this.beehiveEditSaveTab);
            
        });

        document.querySelector('.openBeehivesListBtn').addEventListener('click', async () => {
            
            // Re-fetch updated data before displaying the list
            beehives = await this.beehivesList.getBeehives();
            this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
        });

        document.querySelector('.openBeehivesForFeedBtn').addEventListener('click', async () => {
            // Re-fetch updated data before displaying the list
            
            beehivesForFeed = await this.beehivesForFeed.getBeehivesForFeed();

            this.updateDisplay(this.beehivesForFeed, beehivesForFeed, this.beehivesForFeedTab);
        });

        this.updateDisplay(this.beehivesList, beehives, this.beehivesListTab);
    }

    updateDisplay(display, items, section) {
         this._displayNoneTabs();
          console.log(section)
          console.log(items)
          if(section){
            section.classList.remove('d-none');
          }
       
          
        display.render(items); // Render new content
    }
    
    _displayNoneTabs(){
        
        if(this.beehiveEditSaveTab){
            this.beehiveEditSaveTab.classList.remove('d-block');
        }
        this.beehivesListTab.classList.remove('d-block');
        if(this.beehiveEditSaveTab){
            this.beehiveEditSaveTab.classList.add('d-none');
        }
        this.beehivesListTab.classList.add('d-none');
        if(this.beehivesForFeedTab){
            this.beehivesForFeedTab.classList.add('d-none');
        }
        this.beehivesForFeedTab.classList.add('d-none');
    }

}

new App();




