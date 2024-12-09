
import { beeAppListBase } from './beeAppRequests.js';
import { beehiveIcon, beehiveForTrugos, beehiveForFood } from '../svgIcons/beehive.js';


 class BeeHivesList extends beeAppListBase {
    constructor(app) {
        super();
        this.app = app;
        // elements
        this.openGroceryAddRemoveBtn = document.querySelector('.openGroceryAddRemoveBtn');
        this.beehivesListUL = document.querySelector('.beehivesListUL');
        this.searchInput = document.querySelector('.searchInput');
        //data
        this.beehiveResults=[];
        // handlers
        this.inputHandler = this.searchDisplayBeehives.bind(this);
        this.init();
    }

    async searchDisplayBeehives(){
        const beehiveNumber = this.searchInput.value;
        
        if(this.searchInput.value.trim() === ""){
            this.app.showBeehiveList();
        }else{
            const searchResuls = await this.searchBeehives(beehiveNumber);
            this.beehiveResults = searchResuls ? [searchResuls] : [];
            console.log(beehiveNumber)
            this.app.searchResults(this.beehiveResults);
        }
        
    }

    init(){
        this.searchInput.addEventListener('keyup', this.inputHandler);
       
    }

    
  
    render(items) {
        
        this.beehivesListUL.innerHTML = ''; 
        this.beehivesListUL.insertAdjacentHTML("afterbegin", this._htmlAddRemoveListContent(items));
    }
    
    getStars(rating, maxStars = 5) {
       
        const stars = Math.round((rating / 100) * maxStars);// Generate the star display
        const fullStar = '<span class=" align-items-center justify-content-center starRatingFill dashicons dashicons-star-filled"></span>';  // You can use an icon or image here
        const emptyStar = '<span class=" align-items-center  justify-content-center starRatingEmpty dashicons dashicons-star-empty"></span>'; // You can use an icon or image here
        return fullStar.repeat(stars) + emptyStar.repeat(maxStars - stars);
    }
    
    _htmlAddRemoveListContent(array){
        
        let htmlContent='';
        
        array.forEach(item => {
            const rating = 75; // Replace this with your actual rating value
            const starsDisplay = this.getStars(item.beehiverating);
            const isSick = Object.values(item.arrwsties).some(value => value === true);
            const beehiveForFoodIcon = beehiveForFood(item.giaTaisma ?'': 'grayfilter');
            const beehiveForTrugosIcon = beehiveForTrugos(item.giaTrugo ?'': 'grayfilter');
           
                htmlContent += `
                <div class="kypselianimatedElement">
                    <div class="my-2 px-1 d-flex justify-content-end">
                        <div class="">
                        ${beehiveForTrugosIcon}
                        </div>
                        <div class="">
                            ${beehiveForFoodIcon}
                        </div>
                    </div>
                    <div data-id="${item.id}"  class=" ${isSick ? 'errorLightbg' : ''} d-block mb-3 row p-0 shadow bgWheat align-items-end justify-content-center rounded text-start  mx-2 kypseli">
                        <div class="py-1 d-flex justify-content-between">
                            <div class="p-0">
                                <span class="${isSick ? 'errorbg' : ''} text-dark beehiveNumberSpan bglight rounded px-3 py-2 text-center fw-700 ">${item.beehiveNumber}</span>
                            </div>
                            <div class="mr-2 d-flex align-items-center">
                                <span class="bgRatingStars d-flex rounded-pill starsRating py-1 my-1 px-2">${starsDisplay}</span> 
                            </div>
                        </div>
                        <div class="px-1 py-3">
                            <div class="text-center">${beehiveIcon}</div>
                            <div class="d-flex justify-content-between mx-2 pt-3  border-bottom border-light ">
                                <div class="  d-flex mb-1  align-items-end">
                                
                                    <h6 class="roboto-regular m-0 fs-13">Frames</h6>
                                </div>
                                <div class="mb-1   p-0 text-center ">
                                    <h6 class="roboto-light m-0 fs-13"><span class="fs-16 bglight rounded-pill px-3 roboto-regular color-warning">${item.telara}</span> / 20</h6>
                                </div>
                            </div>
                           
                        </div>
                   
                    </div>

                </div>
            `;
        });
        return htmlContent;
    }
}
export default BeeHivesList;
