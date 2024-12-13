
import { beeAppListBase } from './beeAppRequests.js';

 class beehivesForFeed extends beeAppListBase {

    constructor() {
        super();
        
        this.beehiveUlForFeed = document.querySelector('.beehiveUlForFeed');
        this.saveBtn= document.querySelector('.saveForFeed');
        this.cancelsaveForFeed= document.querySelector('.cancelsaveForFeed');
        this.basicMenu= document.querySelector('.basicMenu');
        this.forfeedmenu= document.querySelector('.forfeedmenu');


        this.beehivesForFeedList;
        this.beehivesForFeedListNew;
        this.beehiveUlFed;
        this.feedOrHarvest;

        this.saveBtnHandler = this.saveForFeed.bind(this);
        this.beehiveUlForFeedHandler = this._onclickBeehiveForFeed.bind(this);
        this.cancelsaveForFeedHandler = this._cancelsave.bind(this);

        this.initStaticListeners();
    }

    initStaticListeners(){
        this.saveBtn.addEventListener('click', this.saveBtnHandler);
        this.beehiveUlForFeed.addEventListener('click', this.beehiveUlForFeedHandler);
        this.cancelsaveForFeed.addEventListener('click', this.cancelsaveForFeedHandler);
    }

    async saveForFeed() {
        try {
            if(this.feedOrHarvest==='harvest'){
                this.beehivesForFeedListNew.filter(beehive => beehive.giaTrugo === true);
            }
            if(this.feedOrHarvest==='feed'){
                this.beehivesForFeedListNew.filter(beehive => beehive.giaTaisma === true);
            }
            
            const result = await this.saveBeehive(this.beehivesForFeedListNew);
            console.log('Save successful:', result); // Handle success
           
            this.beehivesForFeedList = JSON.parse(JSON.stringify(this.beehivesForFeedListNew));  
            this._cancelsave();
        } catch (error) {
            console.error('Save failed:', error); // Handle error
        }
    }
    
    
    render(items,feedOrHarvest) {
        
        this.feedOrHarvest=feedOrHarvest;
        this.beehiveUlForFeed.innerHTML = this._htmlAddRemoveListContent(items);
        this.beehivesForFeedList = JSON.parse(JSON.stringify(items)); 
        this.beehivesForFeedListNew=JSON.parse(JSON.stringify(items));  
        this._saveButtonDisplay();
      
        
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
    
    _onclickBeehiveForFeed(e){
        
        const itemElement = e.target.closest('.beehiveForFeed');
        const itemID = itemElement?.dataset.id;
        const item = this.beehivesForFeedListNew.find(item => item.id == itemID);

        if (item) {
            if(this.feedOrHarvest === 'feed'){
                item.giaTaisma = !item.giaTaisma;
            }
            if(this.feedOrHarvest === 'harvest'){
                item.giaTrugo = !item.giaTrugo;
            }
        }

        if (itemElement.classList.contains('bg-dark')) {
            itemElement.classList.remove('bg-dark');
           
        } else {
            itemElement.classList.add('bg-dark');
            
        }
        this._saveButtonDisplay();

    }
    

    _cancelsave(){
        if(this.feedOrHarvest==='harvest'){
            this.render(this.beehivesForFeedList.filter(beehive => beehive.giaTrugo === true),this.feedOrHarvest);
        }
        if(this.feedOrHarvest==='feed'){
            this.render(this.beehivesForFeedList.filter(beehive => beehive.giaTaisma === true),this.feedOrHarvest);
        }
      
        
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
