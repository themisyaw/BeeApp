
import { beeAppListBase } from './beeAppRequests.js';

 class beehivesForFeed extends beeAppListBase {

    constructor() {
        super();
        
        this.beehiveUlForFeed = document.querySelector('.beehiveUlForFeed');
        this.saveBtn= document.querySelector('.saveForFeed');
        this.basicMenu= document.querySelector('.basicMenu');
        this.forfeedmenu= document.querySelector('.forfeedmenu');


        this.beehivesForFeedList;
        this.beehivesForFeedListNew;
        this.beehiveUlFed;
        this._addBeehiveEvents();
    }
    
    render(items) {
        this.beehiveUlForFeed.innerHTML = ''; 
        console.log(`Rendering items for feed `);
        
        items.filter(beehive => beehive.giaTaisma === true);
        console.log(items)
        this.beehivesForFeedList = JSON.parse(JSON.stringify(items)); 
        this.beehivesForFeedListNew=JSON.parse(JSON.stringify(items));  
        this.beehiveUlForFeed.insertAdjacentHTML("afterbegin", this._htmlAddRemoveListContent(this.beehivesForFeedList));
    }
    _ForSave(obj1, obj2) {

        if(JSON.stringify(obj1) === JSON.stringify(obj2)){
            return false;
        }else{
            return true;
        }
       
    }
    _saveButtonDisplay(){
        if(this._ForSave(this.beehivesForFeedListNew,this.beehivesForFeedList)){
             this.forfeedmenu.classList.remove('d-none');
             this.forfeedmenu.classList.add('d-block');

             this.basicMenu.classList.remove('d-block');
             this.basicMenu.classList.add('d-none');

        }else{
            this.forfeedmenu.classList.remove('d-block');
            this.forfeedmenu.classList.add('d-none');

            this.basicMenu.classList.remove('d-none');
            this.basicMenu.classList.add('d-block');
        }
    }
    _addBeehiveEvents() {
        this.beehiveUlForFeed.addEventListener('click', (e) => {
            
            const itemElement = e.target.closest('.beehiveForFeed');
            console.log(itemElement)
            const itemID = itemElement?.dataset.id;
            // if (!itemID) return;
    
            const item = this.beehivesForFeedListNew.find(item => item.id == itemID);
            console.log(item);
    
            if (item) {
                item.giaTaisma = !item.giaTaisma;
            }
    
            if (itemElement.classList.contains('bg-dark')) {
                itemElement.classList.remove('bg-dark');
            } else {
                itemElement.classList.add('bg-dark');
            }
           
    
            this._saveButtonDisplay();
        });
    
        document.querySelector('.cancelsaveForFeed').addEventListener('click', () => {
            // Clear the list before inserting new items
            this.beehiveUlForFeed.innerHTML = ''; 
            
            // Reset the list
            this.beehivesForFeedListNew = JSON.parse(JSON.stringify(this.beehivesForFeedList));
            
            // Re-render the content
            this.beehiveUlForFeed.insertAdjacentHTML("afterbegin", this._htmlAddRemoveListContent(this.beehivesForFeedList));
            this._saveButtonDisplay();
            
        });
    }
    
    _htmlAddRemoveListContent(items) {
        let htmlContent = "";
        items.forEach(item => {
            htmlContent += `
                <div class="beehiveForFeed m-2" data-id="${item.id}">
                    <h4 class="p-2 text-center">${item.beehiveNumber}</h4>
                </div>
            `;
        });
        return htmlContent;
    }
    
    
   
    
   
}
export default beehivesForFeed;
