import { beeAppListBase } from './beeAppRequests.js';
// import _ from 'lodash';
class beehiveEditSave extends beeAppListBase {
    constructor(app) {

        super();
        this.app = app;
        // Static Elements
        this.beehiveUl = document.querySelector('.beehiveUl');
        this.basicMenu = document.querySelector('.basicMenu');
        this.saveBtn = document.querySelector('.save');
        this.beehiveEditMenu = document.querySelector('.beehiveEditMenu');
        this.cancelBtn = document.querySelector('.cancelsave');
        this.deleteBeehiveBtn = document.querySelector('.deleteBeehiveBtn');
        this.harvestTotal=document.querySelector('.harvestTotal');
        this.beehivesTotal=document.querySelector('.beehivesTotal');
        this.feedTotal=document.querySelector('.feedTotal');
        // Data
        this.itemsIDforUpdate = [];
        this.beehiveOld = null;
        this.beehiveNew = null;
        this.beehiveID= null;

        // Bind Static Handlers
        this.saveHandler = this.save.bind(this);
        this.deleteHandler = this.deleteBeehive.bind(this);
        this.cancelHandler = this.cancelsave.bind(this);
        this.dynamicHandler = this.handleDynamicEvents.bind(this);
        

        // Attach Static Event Listeners
        this.initStaticListeners();
    }
    

    initStaticListeners() {
        
        this.saveBtn.addEventListener('click', this.saveHandler);
        this.deleteBeehiveBtn.addEventListener('click', this.deleteHandler);  
        this.cancelBtn.addEventListener('click', this.cancelHandler);
        this.beehiveUl.addEventListener('input', this.dynamicHandler); // For input changes
        this.beehiveUl.addEventListener('change', this.dynamicHandler); // For checkboxes/radios
        this.beehiveUl.addEventListener('click', this.dynamicHandler); // For clicks

    }

    async deleteBeehive() {
        if (!this.beehiveID || typeof this.beehiveID !== 'number') {
            throw new Error('Invalid beehive ID provided for deletion');
        }
        try {
            const result = await this.delete(`/wp-json/beehives/v1/delete?id=${Number(this.beehiveID)}`);
            // After deletion, navigate back to the beehive list
            if (result.success) {
                // message success
                this.app._bottomMenuBeehivesCounter();
                this.app.showBeehiveList();
            }else{
                // message fail
            }
        } catch (error) {
            console.error('Error occurred while deleting beehive:', error);
        }
    }

    async save() {
        try {
            const result = await this.saveBeehive(this.beehiveNew);
            console.log('Save successful:', result);
            this.app._bottomMenuBeehivesCounter();
            this.beehiveOld = JSON.parse(JSON.stringify(this.beehiveNew));
            this.cancelsave();
        } catch (error) {
            console.error('Save failed:', error);
        }
    }

    cancelsave() {
        this.render(this.beehiveOld);
    }

    render(item) {
        this.beehiveID = item.id;     
       
        this.beehiveUl.innerHTML = this._htmlAddRemoveListContent(item);
console.log('yo');
console.log(item)
        this.beehiveOld = _.cloneDeep(item);
        this.beehiveNew = _.cloneDeep(item);
        // this.beehiveOld = JSON.parse(JSON.stringify(item));
        // this.beehiveNew = JSON.parse(JSON.stringify(item));

        console.log(this.beehiveNew)
        console.log(this.beehiveOld)
        this._saveButtonDisplay();
    }

    handleDynamicEvents(event) {
        const { target } = event;

        // Beehive Number Input
        if (target.classList.contains('beehiveNumInput')) {
            this.beehiveNew.beehiveNumber = target.value;
        }

        // Checkboxes
        if (target.type === 'checkbox' && target.id === 'taismaCheckbox') {
            this.beehiveNew.giaTaisma = target.checked;
        }
        if (target.type === 'checkbox' && target.id === 'trugosCheckbox') {
            this.beehiveNew.giaTrugo = target.checked;
        }
        if (target.type === 'checkbox' && target.closest('.arrwstiesForm')) {
            const disease = target.value;
            this.beehiveNew.arrwsties[disease] = target.checked;
        }

        // Range Inputs
        if (target.classList.contains('telara')) {
            this.beehiveNew.telara = Number(target.value);
            document.querySelector('.telaraSpan').innerHTML = Number(target.value);
            console.log(this.beehiveNew.telara)
        }
        if (target.classList.contains('newTelara')) {
            this.beehiveNew.newtelara = Number(target.value);
            document.querySelector('.newTelaraSpan').innerHTML = Number(target.value);
        }
        if (target.id === 'beehiveRatingInput') {
            this.beehiveNew.beehiverating =target.value;
            document.querySelector('.beehiveRatingSpan').innerHTML = Number(target.value);
        }

        // Radio Buttons
        if (target.name === 'beeTypeRadios') {
            this.beehiveNew.beehiveType = target.value;
        }

        this._saveButtonDisplay();
    }

    _saveButtonDisplay() {
        // const isSame = JSON.stringify(this.beehiveOld) === JSON.stringify(this.beehiveNew);
        const isSame = _.isEqual(this.beehiveOld, this.beehiveNew);
        console.log('beehiveOld')
        console.log(this.beehiveOld)
        console.log('beehiveNew')
        console.log(this.beehiveNew)
        if (isSame) {
            this.beehiveEditMenu.classList.add('d-none');
            this.basicMenu.classList.remove('d-none');
        } else {
            this.beehiveEditMenu.classList.remove('d-none');

            this.basicMenu.classList.remove('d-block');
            this.basicMenu.classList.add('d-none');
        }
    }

    _htmlAddRemoveListContent(item) {
        let htmlContent = `
            <div class="row my-3 py-2 bgWheat rounded shadow">
                <div class="col d-flex align-items-center">
                    <h5 class="m-0 text-dark px-3 py-2 rounded bglight">Beehive </h5>
                </div>
                <div class="col-7 py-2">
                    <input type="number" value="${this._escapeHTML(item.beehiveNumber)}" class="font-weight-bold beehiveNumInput w-50 text-center form-control rounded  bglight border-0 shadow" >
                </div>
            </div>
            <div class="rounded shadow row my-3 py-2 d-block bgWheat">
                <div class="col px-0 py-2 d-flex">
                    <div class="col d-flex  ">
                        <h5 class="m-0 text-dark px-3 py-2 rounded bglight">For Feed </h5>
                    </div>
                    <div class="col-7 ">
                        <div class="form-check">
                            <input ${item.giaTaisma ? 'checked' : ''} class="checkboxes rounded bglight form-check-input border-0 shadow " type="checkbox" value="" id="taismaCheckbox">
                            <label class="form-check-label m-0" for="taismaCheckbox"></label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="rounded shadow row my-3 py-2 d-block bgWheat">
        
                <div class="col px-0 d-flex py-2">
                    <div class="col d-flex  ">
                        <h5 class="m-0 text-dark px-3 py-2 rounded bglight">For Trugos </h5>
                    </div>
                    <div class="col-7 ">
                        <div class="form-check">
                            <input ${item.giaTrugo ? 'checked' : ''} class="checkboxes rounded bglight form-check-input border-0 shadow" type="checkbox" value="" id="trugosCheckbox">
                            <label class="form-check-label text-dark" for="trugosCheckbox"></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" rounded shadow row my-3 py-2 d-block bgWheat">
                <div class="col px-0 py-2 d-flex">
                    <div class="col d-flex align-items-center">
                        <h5 class="m-0 text-dark px-3 py-2 rounded bglight">Frames </h5>
                    </div>
                    <div class="col-7">
                        <div class="text-right pt-2">
                        <span class=" text-dark px-3 py-2 bglight rounded"> <span class="telaraSpan text-end font-weight-bold ">${item.telara}</span> / 20</span>
                        </div>
                        
                        <input type="range" min="0" max="20" class="telara bglight my-4 form-range  w-100" value="${item.telara || 0}">
                    </div>
                </div>

            </div>

            <div class=" rounded shadow row my-3 py-2 d-block bgWheat">
        
                <div class="col px-0 py-2 d-flex">
                    <div class="col d-flex align-items-center">
                        <h5 class="m-0 text-dark px-3 py-2 rounded bglight">New Frames </h5>
                    </div>
                    <div class="col-7">
                        <div class="text-right pt-2">
                        <span class=" text-dark px-3 py-2 bglight rounded"> <span class="newTelaraSpan text-end font-weight-bold  ">${item.newtelara}</span> / 20</span>
                        </div>
                       
                        <input type="range" min="0" max="20" class="bglight newTelara my-4 w-100" value="${item.newtelara || 0}">
                    </div>
                </div>
            </div>
    
            <div class="rounded shadow row my-3 py-2 bgWheat">
                <div class="col d-flex align-items-center ">
                    <h5 class="m-0 text-dark px-3 py-2 rounded bglight">Type </h5>
                </div>
                <div class="col-7">
                    <div class="d-flex align-items-center my-1 py-1">
                        <input class="form-check-input " type="radio" name="beeTypeRadios" value="Κυψέλη" id="beeTypeKypseliInput" ${item.beehiveType === 'Κυψέλη' ? 'checked' : ''}>
                        <label class="form-check-label custom-radio bglight" for="beeTypeKypseliInput"></label>
                        <label class="my-0 ml-2 text-dark"  for="beeTypeKypseliInput font-weight-bold">Hive</label>
                    </div>
                    <div class="d-flex align-items-center  my-1 py-1">
                        <input class="form-check-input " type="radio" name="beeTypeRadios" value="Παραφυάδα" id="beeTypeParafuadaInput" ${item.beehiveType === 'Παραφυάδα' ? 'checked' : ''}>
                        <label class="form-check-label text-dark custom-radio bglight" for="beeTypeParafuadaInput"></label>
                        <label class="my-0 ml-2 text-dark" for="beeTypeParafuadaInput font-weight-bold">Nucleus colony</label>
                    </div>
                </div>
            </div>
    
            <div class="rounded shadow row my-3 py-2 bgWheat">
                <div class="col d-flex align-items-center  ">
                    <h5 class="m-0 text-dark px-3 py-2 rounded bglight">Bee Rating </h5>
                </div>
                <div class="col-7 py-2">
                    <div class="text-right pt-2">
                        <span class=" text-dark px-3 py-2 bglight rounded"> <span class="beehiveRatingSpan text-end font-weight-bold ">${item.beehiverating}</span> %</span>
                    </div>
                    <input type="range" class="bglight w-100 my-4 form-range" min="0" max="100" value="${item.beehiverating || 0}" id="beehiveRatingInput">

                </div>
                
              
            </div>
    
            <div class="rounded shadow row my-3 py-2 bgWheat">
                <div class="col d-flex align-items-start  py-2">
                    <h5 class="m-0 text-dark px-3 py-2 rounded bglight">Diseases</h5>
                </div>
                <div class="col-7 d-block arrwstiesForm">
                    <div>
                        ${this._generateCheckboxes(item.arrwsties)}
                    </div>
                </div>
            </div>
        `;
        
        return htmlContent;
    }
    
    _generateCheckboxes(arrwsties) {
        const diseaseList = [
            { value: 'askosfairwsi', label: 'Chalkbrood' },
            { value: 'baroa', label: 'Varroa ' },
            { value: 'kakibasilissa', label: 'Bad queen' },
            { value: 'nozemiasi', label: 'Nosema ' },
            { value: 'orfano', label: 'Orphaned ' },
            { value: 'amerikanikiSipsogonia', label: 'American foulbrood' }
        ];
        
        return diseaseList.map(disease => {
            return `
                <div class="form-check my-2">
                    <input ${arrwsties[disease.value] ? 'checked' : ''} class="rounded checkboxes bglight form-check-input border-0 shadow" type="checkbox" value="${disease.value}" id="${disease.value}CheckBox">
                    <label class="ml-3 text-dark form-check-label" for="${disease.value}CheckBox">${disease.label}</label>
                </div>
            `;
        }).join('');
    }

    _escapeHTML(str) {
        if (typeof str !== 'string') return str;
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

export default beehiveEditSave;
