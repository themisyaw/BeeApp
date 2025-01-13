import { beeAppListBase } from './beeAppRequests.js';


class BeehiveCreateNew extends beeAppListBase {

    constructor(app) {
        super();
        this.app = app;
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
                this.app.displayMessage('This beehive number already exist!','errorbg',false);
                return;
            }else{
                if(this.newBeehiveNumberInput.value.trim() === ""){
                    this.app.displayMessage('Add a beehive number','errorbg',false);
                    return;
                }
                const result = await this.addBeehive(beehiveNumber); 
              
                if (!result || !result.success) {
                    this.app.displayMessage('Check your Internet Connection','errorbg');
                   return;
                }
                this.app.displayMessage('Successfully saved !!!','bglight');
                this.newBeehiveNumberInput.value = '';
                return result;
            }
        } catch (error) {
            console.error('Save failed:', error);
            throw error; 
        }
    } 
}

export default BeehiveCreateNew;
