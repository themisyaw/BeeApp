
import { beeAppListBase } from './beeAppRequests.js';
import { beehiveIcon } from '../svgIcons/beehive.js';


 class BeeHivesList extends beeAppListBase {
    constructor() {
        super();
        this.openGroceryAddRemoveBtn = document.querySelector('.openGroceryAddRemoveBtn');
        this.beehivesListUL = document.querySelector('.beehivesListUL');
        
        console.log('beehivesListUL:', this.beehivesListUL);
        
    }
    events(){
        if(this.openGroceryAddRemoveBtn){
            this.openGroceryAddRemoveBtn.addEventListener('click',this.render);
        }
    }
    render(items) {
        
        console.log(`Rendering items gia arxiki `);
        console.log(items);
        
        // document.querySelector('.save').classList.remove('d-block');
        // document.querySelector('.save').classList.add('d-none');
        
        console.log(`Rendering after items`);
        this._bottomMenuDisplay();
        this.beehivesListUL.innerHTML = ''; 
        this.beehivesListUL.insertAdjacentHTML("afterbegin", this._htmlAddRemoveListContent(items));
        
    }
    _bottomMenuDisplay(){
        document.querySelector('.openBeehivesListBtn').classList.remove('d-block');
        document.querySelector('.openBeehivesListBtn').classList.add('d-none');

        // document.querySelector('.openGroceryAddRemoveBtn').classList.remove('d-none');
        // document.querySelector('.openGroceryAddRemoveBtn').classList.add('d-block');
    }
    
    _htmlAddRemoveListContent(array){
        array.sort((a, b) => a.beehiveNumber - b.beehiveNumber);
        let htmlContent='';
        array.forEach(item => {
                htmlContent += `
                <div class="py-4 my-3 shadow rounded text-start col-12 mx-2 kypseli" data-id="${item.id}">
                <div class="row p-0 m-0">
                    
                    <div class="col">
                        <h5 class="text-dark" >Beehive ${item.beehiveNumber}</h5>
                        <h6 class="text-dark" >:  ${item.telara}</h6>
                    
                    </div>
                    <div class="col-4 p-0 text-center">
                        
                        ${beehiveIcon}
                       
                    </div>
                </div>
                
            
                
            </div>



               
            `;
        });
        return htmlContent;
    }
}
export default BeeHivesList;
