import { beeAppListBase } from './beeAppRequests.js';

class beehiveEditSave extends beeAppListBase {
    constructor() {
        super();

        // Static Elements
        this.beehiveUl = document.querySelector('.beehiveUl');
        this.basicMenu = document.querySelector('.basicMenu');
        this.saveBtn = document.querySelector('.save');
        this.beehiveEditMenu = document.querySelector('.beehiveEditMenu');
        this.cancelBtn = document.querySelector('.cancelsave');

        // Data
        this.itemsIDforUpdate = [];
        this.beehiveOld = null;
        this.beehiveNew = null;

        // Bind Static Handlers
        this.saveHandler = this.save.bind(this);
        this.cancelHandler = this.cancelsave.bind(this);
        this.dynamicHandler = this.handleDynamicEvents.bind(this);

        // Attach Static Event Listeners
        this.initStaticListeners();
    }

    initStaticListeners() {
        this.saveBtn.addEventListener('click', this.saveHandler);
        this.cancelBtn.addEventListener('click', this.cancelHandler);
        this.beehiveUl.addEventListener('input', this.dynamicHandler); // For input changes
        this.beehiveUl.addEventListener('change', this.dynamicHandler); // For checkboxes/radios
        this.beehiveUl.addEventListener('click', this.dynamicHandler); // For clicks
    }

    async save() {
        try {
            const result = await this.saveBeehive(this.beehiveNew);
            console.log('Save successful:', result);

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
        this.beehiveUl.innerHTML = this._htmlAddRemoveListContent(item);
        this.beehiveOld = JSON.parse(JSON.stringify(item));
        this.beehiveNew = JSON.parse(JSON.stringify(item));
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
            this.beehiveNew.telara = target.value;
        }
        if (target.classList.contains('newTelara')) {
            this.beehiveNew.newtelara = Number(target.value);
        }
        if (target.id === 'beehiveRatingInput') {
            this.beehiveNew.beehiverating = target.value;
        }

        // Radio Buttons
        if (target.name === 'beeTypeRadios') {
            this.beehiveNew.beehiveType = target.value;
        }

        this._saveButtonDisplay();
    }

    _saveButtonDisplay() {
        const isSame = JSON.stringify(this.beehiveOld) === JSON.stringify(this.beehiveNew);
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
                        <input ${item.giaTaisma ? 'checked' : ''} class="form-check-input" type="checkbox" value="" id="taismaCheckbox">
                        <label class="form-check-label" for="taismaCheckbox"></label>
                    </div>
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <label>For Trugos </label>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input ${item.giaTrugo ? 'checked' : ''} class="form-check-input" type="checkbox" value="" id="trugosCheckbox">
                        <label class="form-check-label" for="trugosCheckbox"></label>
                    </div>
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <label>Telara </label>
                </div>
                <div class="col">
                    <input type="range" min="0" max="20" class="telara form-range" value="${item.telara || 0}">
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <label>New Telara </label>
                </div>
                <div class="col">
                    <input type="range" min="0" max="20" class="newTelara" value="${item.newtelara || 0}">
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <label>Type </label>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="beeTypeRadios" value="Κυψέλη" id="beeTypeKypseliInput" ${item.beehiveType === 'Κυψέλη' ? 'checked' : ''}>
                        <label class="form-check-label" for="beeTypeKypseliInput">Beehive</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="beeTypeRadios" value="Παραφυάδα" id="beeTypeParafuadaInput" ${item.beehiveType === 'Παραφυάδα' ? 'checked' : ''}>
                        <label class="form-check-label" for="beeTypeParafuadaInput">Queen births</label>
                    </div>
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <label>Bee Rating </label>
                </div>
                <div class="col">
                    <label for="beehiveRatingInput" class="form-label">Beehive Rate</label>
                    <input type="range" class="form-range" min="0" max="100" value="${item.beehiverating || 0}" id="beehiveRatingInput">
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <label>Diseases</label>
                </div>
                <form class="col d-block arrwstiesForm">
                    ${this._generateCheckboxes(item.arrwsties)}
                </form>
            </div>
        `;
        
        return htmlContent;
    }
    
    _generateCheckboxes(arrwsties) {
        const diseaseList = [
            { value: 'askosfairwsi', label: 'askosfairwsi' },
            { value: 'baroa', label: 'baroa' },
            { value: 'kakibasilissa', label: 'kakibasilissa' },
            { value: 'nozemiasi', label: 'nozemiasi' },
            { value: 'orfano', label: 'orfano' },
            { value: 'amerikanikiSipsogonia', label: 'amerikanikiSipsogonia' }
        ];
        
        return diseaseList.map(disease => {
            return `
                <div class="form-check">
                    <input ${arrwsties[disease.value] ? 'checked' : ''} class="form-check-input" type="checkbox" value="${disease.value}" id="${disease.value}CheckBox">
                    <label class="form-check-label" for="${disease.value}CheckBox">${disease.label}</label>
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
