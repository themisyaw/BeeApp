import { beeAppListBase } from './beeAppRequests.js';
import { beehiveForTrugos, beehiveForFood } from '../svgIcons/beehive.js';
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

        this.beehiveOld = _.cloneDeep(item);
        this.beehiveNew = _.cloneDeep(item);
        
        this._saveButtonDisplay();
    }

    handleDynamicEvents(event) {
        const { target } = event;
        console.log(event)
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
        const isSick = Object.values(item.arrwsties).some(value => value === true);
        const beehiveForFoodIcon = beehiveForFood(item.giaTaisma ?'': 'grayfilter');
        const beehiveForTrugosIcon = beehiveForTrugos(item.giaTrugo ?'': 'grayfilter');
        let htmlContent = `
            <div class="row my-3 py-2 bgWheat rounded shadow">
                <div class="col d-flex align-items-center">
                    <h6 class="m-0 text-dark px-3 py-2 rounded bglight">Beehive </h6>
                </div>
                <div class="col py-2 d-flex justify-content-end">
                    <input type="number" value="${this._escapeHTML(item.beehiveNumber)}" class="font-weight-bold beehiveNumInput w-50 text-center form-control rounded  bglight border-0 shadow" >
                </div>
            </div>
            <div class="rounded d-block shadow  row my-3 py-2 bgWheat" >
                <div class="col py-3 d-flex align-items-center justify-content-between "data-toggle="collapse" data-target="#collapse_beehiveType" >
                    <h6 class="m-0 text-dark px-3 py-2 rounded bglight">Type </h6>
                    <h6 class="m-0 text-dark px-3 py-2 rounded bglight">${item.beehiveType === 'Κυψέλη' ? 'Hive' : 'Nucleus colony'} </h6>
                </div>
                <div class="col p-0  collapse" id="collapse_beehiveType" style="box-sizing: border-box;transition: height 0.15s ease;">
                    <div class="d-flex align-items-center  p-2 pt-4 mx-2 ">
                        <input class="form-check-input " type="radio" name="beeTypeRadios" value="Κυψέλη" id="beeTypeKypseliInput" ${item.beehiveType === 'Κυψέλη' ? 'checked' : ''}>
                        <label class="form-check-label custom-radio bglight" for="beeTypeKypseliInput"></label>
                        <label class="my-0 ml-2 text-dark"  for="beeTypeKypseliInput">Hive</label>
                    </div>
                    <div class="d-flex align-items-center  p-2 pb-3 mx-2  ">
                        <input class="form-check-input " type="radio" name="beeTypeRadios" value="Παραφυάδα" id="beeTypeParafuadaInput" ${item.beehiveType === 'Παραφυάδα' ? 'checked' : ''}>
                        <label class="form-check-label text-dark custom-radio bglight" for="beeTypeParafuadaInput"></label>
                        <label class="my-0 ml-2 text-dark " for="beeTypeParafuadaInput">Nucleus colony</label>
                    </div>
                </div>
            </div>
            <div class=" rounded shadow row my-3 py-2 d-block bgWheat">
                <div class="col p-0  d-flex justify-content-between" data-toggle="collapse" data-target="#collapse_telara">
                    <div class="col d-flex align-items-start">
                        <h6 class="m-0 text-dark px-3 py-2 rounded bglight">Frames </h6>
                    </div>
                    <div class="col d-flex justify-content-end">
                        <span class=" text-dark px-3 py-2 bglight rounded"> <span class="telaraSpan text-end font-weight-bold ">${item.telara}</span> / 20</span>
                    </div>
                </div>
                 <div class="col collapse" id="collapse_telara">
                        <input type="range" min="0" max="20" class="telara bglight my-4 form-range  w-100" value="${item.telara || 0}">
                </div>
            </div>
            <div class=" rounded shadow row my-3 py-2 d-block bgWheat">
                <div class="col p-0  d-flex justify-content-between" data-toggle="collapse" data-target="#collapse_newtelara">
                    <div class="col d-flex align-items-start">
                        <h6 class="m-0 text-dark px-3 py-2 rounded bglight">New Frames </h6>
                    </div>
                    <div class="col d-flex justify-content-end">
                        <span class=" text-dark px-3 py-2 bglight rounded"> <span class="newTelaraSpan text-end font-weight-bold ">${item.newtelara}</span> / 20</span>
                    </div>
                </div>
                 <div class="col collapse" id="collapse_newtelara" >
                        <input type="range" min="0" max="20" class="newTelara bglight my-4 form-range  w-100" value="${item.newtelara || 0}">
                </div>
            </div>
            
            <div class=" rounded shadow row my-3 py-2 d-block bgWheat " >
                <div class="col p-0  d-flex justify-content-between" data-toggle="collapse" data-target="#collapse_beehiverating">
                    <div class="col d-flex align-items-start">
                        <h6 class="m-0 text-dark px-3 py-2 rounded bglight">Bee Rating </h6>
                    </div>
                    <div class="col d-flex justify-content-end ">
                        <span class=" text-dark px-3 py-2 bglight rounded"> <span class="beehiveRatingSpan text-end font-weight-bold ">${item.beehiverating}</span> %</span>
                    </div>
                </div>
                 <div class="col collapse" id="collapse_beehiverating">
                        <input type="range" class="bglight w-100 my-4 form-range" min="0" max="100" value="${item.beehiverating || 0}" id="beehiveRatingInput">
                </div>
            </div>
            <div class="rounded d-block shadow row my-3 py-2 bgWheat">
                <div class="col px-0 py-2 d-flex align-items-center " data-toggle="collapse" data-target="#collapse_flags">
                    <div class="col d-flex justify-content-between ">
                        <h6 class="m-0 text-dark px-3 py-2 rounded bglight">Flags ( feed/harvest) </h6>

                        <div class="">
                        ${beehiveForTrugosIcon}
                         ${beehiveForFoodIcon}
                        </div>
                       
                    </div>
                </div>
                <div class="col p-0 m-0 collapse" id="collapse_flags">
                    <div class="col pb-2 pt-4 ">
                        <div class="form-check">
                            <input ${item.giaTaisma ? 'checked' : ''} class="checkboxes rounded bglight form-check-input border-0 shadow " type="checkbox" value="" id="taismaCheckbox">
                            <label class="form-check-label text-dark m-0 ml-3" for="taismaCheckbox">For Feed</label>
                        </div>
                    </div>
                    <div class="col py-2 ">
                        <div class="form-check">
                            <input ${item.giaTrugo ? 'checked' : ''} class="checkboxes rounded bglight form-check-input border-0 shadow" type="checkbox" value="" id="trugosCheckbox">
                            <label class="form-check-label text-dark ml-3" for="trugosCheckbox">For Harvest</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rounded shadow row my-3 py-2 bgWheat ${isSick ? 'errorLightbg' : ''}">
            
                <div class="col-12 d-flex align-items-start  py-2" data-toggle="collapse" data-target="#collapse_arrwsties">
                    <h6 class="m-0 text-dark px-3 py-2 rounded bglight ${isSick ? 'errorLightbg errorbg' : ''}">Diseases</h6>
                </div>
                
                <div class="col arrwstiesForm collapse" id="collapse_arrwsties">
                    <div class="row row-cols-2 pl-3 pb-2 pt-4">
                    
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
                <div class="form-check ${(disease.value === 'askosfairwsi' || disease.value === 'kakibasilissa' || disease.value === 'orfano') ? 'col-5' : 'col-7'} my-2">
                    <input ${arrwsties[disease.value] ? 'checked' : ''} class="rounded checkboxes bglight form-check-input border-0 shadow" type="checkbox" value="${disease.value}" id="${disease.value}CheckBox">
                    <label class="ml-1 text-dark form-check-label" for="${disease.value}CheckBox">${disease.label}</label>
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
