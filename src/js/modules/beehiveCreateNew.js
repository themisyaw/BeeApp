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
            const beehives = await this.getBeehives();
                console.log(beehives);
            const exists = beehives.some(beehive => beehive.beehiveNumber === this.newBeehiveNumberInput.value);
            if (exists) {
                this.newBeehiveNumberInput.value = '';
                // message ->  yparxei autos o arithmos
                return;
            }else{
                if(this.newBeehiveNumberInput.value.trim() === ""){
                    alert('Error!!!');
                    return;
                }
                const result = await this.addBeehive(beehiveNumber); 
              
                if (!result || !result.success) {
                    // message -> internet connection
                   alert('Error!!!');
                   return;
                }
                // message -> Saved :)
                this.newBeehiveNumberInput.value = '';
                return result;
            }
        } catch (error) {
            console.error('Save failed:', error);
            throw error; // Propagate the error for the caller to handle
        }
    } 
}

export default BeehiveCreateNew;
