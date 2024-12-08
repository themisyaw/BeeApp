import { beeAppListBase } from './beeAppRequests.js';


class BeehiveCreateNew extends beeAppListBase {
    constructor() {
        super();

        // Static Elements
       
        this.newBeehiveNumberInput = document.querySelector('.newBeehiveNumberInput');

    }
   
    async addNewBeehive() {
        try {
            const beehiveNumber = {
                "beehiveNumber": this.newBeehiveNumberInput.value
            };

            // prepei na checkarw an uparxei autos o arithos se alli kypseli
            const beehives = await this.getBeehives();
            console.log(beehives);
            const exists = beehives.some(beehive => beehive.beehiveNumber === this.newBeehiveNumberInput.value);
            if (exists) {
              
                this.newBeehiveNumberInput.value = '';
            }else{
                const result = await this.addBeehive(beehiveNumber); 
                console.log('Save successful:');
               
                this.newBeehiveNumberInput.value = '';
                return result;
            }
            
           
    
            
             // Return the result for use by the caller
        } catch (error) {
            console.error('Save failed:', error);
            throw error; // Propagate the error for the caller to handle
        }
    }
    

    
}

export default BeehiveCreateNew;
