
import { beeAppListBase } from './beeAppRequests.js';

 class beehiveEditSave extends beeAppListBase {
    constructor() {
        super();
        
        this.beehiveUl = document.querySelector('.beehiveUl');
        // Beehive values
        
        this.saveBtn=document.querySelector('.save');
        this.itemsIDforUpdate=[];
        this.beehiveOld;
        this.beehiveNew;
    }
    
    async save() {
        try {
            const result = await this.addBeehive(this.beehiveNew);
            console.log('Save successful:', result); // Handle success
            this.saveBtn.setAttribute('disabled', true);
            this.saveBtn.classList.remove('d-block');
            this.saveBtn.classList.add('d-none');
        } catch (error) {
            console.error('Save failed:', error); // Handle error
        }
    }
    
    _filterChanges(obj1, obj2) {

        if(JSON.stringify(obj1) === JSON.stringify(obj2)){
            return true;
        }else{
            return false;
        }
       
    }
    _saveButtonDisplay(){
        
        if(this._filterChanges(this.beehiveOld,this.beehiveNew)){
            this.saveBtn.setAttribute('disabled', true);
            this.saveBtn.classList.remove('d-block');
            this.saveBtn.classList.add('d-none');
            
        }else{
            // this.saveBtn.classList.remove('d-none');
            this.saveBtn.removeAttribute('disabled');
            this.saveBtn.classList.remove('d-none');
            this.saveBtn.classList.add('d-block');
        }
    }
  
    
    render(item) {
        this.beehiveUl.innerHTML = ''; 
        console.log(`Rendering items `);
        this.beehiveOld = JSON.parse(JSON.stringify(item));  
        this.beehiveNew = JSON.parse(JSON.stringify(item));  
        console.log(item);
        console.log( this.beehiveOld);   
        
         
         this.beehiveUl.insertAdjacentHTML("afterbegin", this._htmlAddRemoveListContent(item));
        // console.log(`Rendering after items`);
       
        this._addBeehiveEvents();
        this._bottomMenuDisplay();
        // this._bottomMenuDisplay();
        // this._saveButtonDisplay();
    }
    _bottomMenuDisplay(){
        document.querySelector('.openBeehivesListBtn ').classList.remove('d-none');
        document.querySelector('.openBeehivesListBtn ').classList.add('d-block');

        // document.querySelector('.openGroceryAddRemoveBtn').classList.remove('d-none');
        // document.querySelector('.openGroceryAddRemoveBtn').classList.add('d-block');
    }
    _escapeHTML(str) {
        if (typeof str !== "string") {
            return str; // Return the original value if it's not a string
        }
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    _addBeehiveEvents(){
        //save btn
        this.saveBtn.addEventListener('click',this.save.bind(this));
        // beehive Name
        this.beehiveNumInput = document.querySelector('.beehiveNumInput');
        if(this.beehiveNumInput){
            
            this.beehiveNumInput.addEventListener('keyup',()=>{
                this.beehiveNew.beehiveNumber = this.beehiveNumInput.value;
                this._saveButtonDisplay();
            });
        }
        // For food
        this.beehiveForFeedCheckbox = document.querySelector('#taismaCheckbox');
        if(this.beehiveForFeedCheckbox){
            this.beehiveForFeedCheckbox.addEventListener('click',()=>{
                if(this.beehiveForFeedCheckbox.checked){
                    console.log('einai')
                    this.beehiveNew.giaTaisma=true;
                }else{
                    this.beehiveNew.giaTaisma=false;
                }
                this._saveButtonDisplay();
            });
        }
        // For trugos
        this.beehiveForTrugosCheckbox = document.querySelector('#trugosCheckbox');
        if(this.beehiveForTrugosCheckbox){
            this.beehiveForTrugosCheckbox.addEventListener('click',()=>{
                if(this.beehiveForTrugosCheckbox.checked){
                    console.log('einai')
                    this.beehiveNew.giaTrugo=true;
                }else{
                    this.beehiveNew.giaTrugo=false;
                }
                this._saveButtonDisplay();
            });
        }
         // Diseases form
         this.beehiveArrwstiesCheckboxes = document.querySelectorAll('.arrwstiesForm input[type="checkbox"]');
         if(this.beehiveArrwstiesCheckboxes){
            this.beehiveArrwstiesCheckboxes.forEach(checkbox => {
                checkbox.addEventListener("click",  () =>{
                    console.log(`${checkbox.value} is ${checkbox.checked ? "checked" : "unchecked"}`);
                    const arrwstia = checkbox.value;
                    this.beehiveNew.arrwsties[arrwstia] =checkbox.checked;
                    // Perform additional actions here
                    this._saveButtonDisplay();
                });
            });
         }
        // Telara
        this.beehiveTelaraInput = document.querySelector('.telara');
        if(this.beehiveTelaraInput){
            this.beehiveTelaraInput.addEventListener('change',()=>{
                this.beehiveNew.telara= Number(this.beehiveTelaraInput.value);
                console.log(this.beehiveOld)
                console.log('telara new -> '+ this.beehiveNew.telara)
                this._saveButtonDisplay();
            });
        }
        // New Telara
        this.beehiveNewTelaraInput = document.querySelector('.newTelara');
        if(this.beehiveNewTelaraInput){
            this.beehiveNewTelaraInput.addEventListener('change',()=>{
                this.beehiveNew.newtelara= Number(this.beehiveNewTelaraInput.value);
                console.log("Slider value:", this.beehiveNewTelaraInput.value,this.beehiveNew);
                this._saveButtonDisplay();
            });
        }
        // beehive Rating 
        this.beehiveRatingInput = document.querySelector('#beehiveRatingInput');
        if(this.beehiveRatingInput){
            this.beehiveRatingInput.addEventListener('change',()=>{
                this.beehiveNew.beehiverating= this.beehiveRatingInput.value;
                this._saveButtonDisplay();
            });
        }
        // beehive Type 
        this.beehiveTypeRadios = document.getElementsByName('beeTypeRadios');
        if(this.beehiveTypeRadios){
            this.beehiveTypeRadios.forEach(radio => {
                radio.addEventListener("change", ()=>{
                    this.beehiveNew.beehiveType = radio.value;
                    this._saveButtonDisplay();
                });
            });
        }
    }
    _htmlAddRemoveListContent(item) {
        let htmlContent = `

            <div class="row">
                <div class="col">
                    <label>Beehive </label>
                </div>
                <div class="col">
                    <input type="text" value="${this._escapeHTML(item.beehiveNumber)}" class="beehiveNumInput">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label>For Feed </label>
                </div>
                <div class="col">
                       <div class="form-check">
                        <input ${item.giaTaisma===true ? 'checked' : ' '} class="form-check-input" type="checkbox" value="" id="taismaCheckbox">
                        <label class="form-check-label" for="taismaCheckbox">
                            
                        </label>
                    </div>                   
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>For Trugos </label>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input ${item.giaTrugo===true ? 'checked' : ' '} class="form-check-input" type="checkbox" value="" id="trugosCheckbox">
                        <label class="form-check-label" for="trugosCheckbox">
                        
                        </label>
                        </div>    
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label>Telara </label>
                </div>
                <div class="col">
                    <input type="range" min="0" max="20" class="telara form-range" value="${(this._escapeHTML(item.telara) === null || '' ? 0 : Number(this._escapeHTML(item.telara)))}">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>New Telara </label>
                </div>
                <div class="col">
                    <input type="range" min="0" max="20" class="newTelara" value="${(this._escapeHTML(item.newtelara) === null || '' ? 0 : Number(this._escapeHTML(item.newtelara)))}">
                </div>
            </div>


            <div class="row">
                <div class="col">
                    <label>Type </label>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" ${item.beehiveType==='Κυψέλη' ? 'checked' : ''} name="beeTypeRadios" value="Κυψέλη" id="beeTypeKypseliInput">
                        <label class="form-check-label" for="beeTypeKypseliInput">
                            Beehive
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="beeTypeRadios" id="beeTypeParafuadaInput" value="Παραφυάδα" ${item.beehiveType==='Παραφυάδα' ? 'checked' : ''}>
                        <label class="form-check-label" for="beeTypeParafuadaInput">
                            Queen births
                        </label>
                    </div>
                    
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label>Bee Rating </label>
                </div>
                <div class="col">
                    <label for="beehiveRatingInput" class="form-label">Beehive Rate</label>
                    <input type="range" class="form-range" min="0" max="100" value="${Number(this._escapeHTML(item.beehiverating))}" id="beehiveRatingInput">
                   
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label>Diseases</label>
                </div>
                <form class="col d-block arrwstiesForm">
                    <div class="form-check">
                        <input ${item.arrwsties.askosfairwsi===true ? 'checked' : ' '} class="form-check-input" type="checkbox" value="askosfairwsi" id="askosfairwsiCheckBox">
                        <label class="form-check-label" for="askosfairwsiCheckBox">
                            askosfairwsi
                        </label>
                    </div>

                    <div class="form-check">
                        <input ${item.arrwsties.baroa===true ? 'checked' : ' '} class="form-check-input" type="checkbox" value="baroa" id="baroaCheckBox">
                        <label class="form-check-label" for="baroaCheckBox">
                            baroa
                        </label>
                    </div>
                    <div class="form-check">
                        <input ${item.arrwsties.kakibasilissa===true ? 'checked' : ' '} class="form-check-input" type="checkbox" value="kakibasilissa" id="kakibasilissaCheckBox">
                        <label class="form-check-label" for="kakibasilissaCheckBox">
                            kakibasilissa
                        </label>
                    </div>
                    <div class="form-check">
                        <input ${item.arrwsties.nozemiasi===true ? 'checked' : ' '} class="form-check-input" type="checkbox" value="nozemiasi" id="nozemiasiCheckBox">
                        <label class="form-check-label" for="nozemiasiCheckBox">
                            nozemiasi
                        </label>
                    </div>
                    <div class="form-check">
                        <input ${item.arrwsties.orfano===true ? 'checked' : ' '} class="form-check-input" type="checkbox" value="orfano" id="orfanoCheckBox">
                        <label class="form-check-label" for="orfanoCheckBox">
                            orfano
                        </label>
                    </div>
                    <div class="form-check">
                        <input ${item.arrwsties.amerikanikiSipsogonia===true ? 'checked' : ' '} class="form-check-input" type="checkbox" value="amerikanikiSipsogonia" id="amerikanikiSipsogoniaCheckBox">
                        <label class="form-check-label" for="amerikanikiSipsogoniaCheckBox">
                            amerikanikiSipsogoni
                        </label>
                    </div>
                </form>
            </div>
        `;
        return htmlContent;
    }
    
   
    
    // addItemToList(event, listItem) {
    //     event.preventDefault();

    //     // Prevent action if the delete button was clicked
    //     if (event.target.classList.contains('btn-delete-item')) return;
    
    //     const isInList = listItem.dataset.list === 'true'; // Get current state
    //     const id = parseInt(listItem.dataset.id); // Get item ID
    //     let newListState;
    
    //     if (isInList) {
    //         // If item is already in the list, remove it
    //         listItem.classList.remove('inList');
    //         listItem.querySelector('span').classList.remove("dashicons-minus");
    //         listItem.querySelector('span').classList.add("dashicons-plus-alt2");
    
    //         newListState = false; // Update state
    //         listItem.dataset.list = 'false'; // Update DOM
    //     } else {
    //         // If item is not in the list, add it
    //         listItem.classList.add('inList');
    //         listItem.querySelector('span').classList.remove("dashicons-plus-alt2");
    //         listItem.querySelector('span').classList.add("dashicons-minus");
    
    //         newListState = true; // Update state
    //         listItem.dataset.list = 'true'; // Update DOM
    //     }
    
    //     // Update `itemsIDforUpdate` array
    //     const existingItem = this.itemsIDforUpdate.find(item => item.id === id);
    //     console.log(existingItem);
    //     if (existingItem) {
    //         existingItem.newListTrack = newListState;
    //     }
    //     console.log(`Add clicked for item ID: ${listItem.dataset.id}`);
    //     console.log('new list');
    //     console.log(this.itemsIDforUpdate)
    //     console.log('old list')
    //     console.log(this.itemsBeforeSave)
    //     // Add logic to handle adding item
    //     this._saveButtonDisplay();
    // }


    // }
    // _bottomMenuDisplay(){
    //     document.querySelector('.openGroceryAddRemoveBtn').classList.remove('d-block');
    //     document.querySelector('.openGroceryAddRemoveBtn').classList.add('d-none');

    //     document.querySelector('.openGroceryListBtn').classList.remove('d-none');
    //     document.querySelector('.openGroceryListBtn').classList.add('d-block');
    // }

    // deleteItem(event, listItem) {
    //     event.preventDefault();
    //     console.log(`Delete clicked for item ID: ${listItem.dataset.id}`);
    //     // Add logic to handle deleting item
    // }
   
}
export default beehiveEditSave;
