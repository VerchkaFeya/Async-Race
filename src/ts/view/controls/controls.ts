import { DomElement } from "../domElement";

class Control extends DomElement {

	inputName: HTMLElement;
	inputColor: HTMLElement;
	button: HTMLElement;
	controlNode: HTMLElement;

	constructor() {
		super();
		this.inputName = this.createElement('input', 'input-name') as HTMLInputElement;
		(this.inputName as HTMLInputElement).type = 'text';
		(this.inputName as HTMLInputElement).placeholder = "Name...";
		(this.inputName as HTMLInputElement).autocomplete = "off";

		this.inputColor = this.createElement('input', 'input-color') as HTMLInputElement;
		(this.inputColor as HTMLInputElement).type = 'color';

		this.button = this.createElement('button', 'control-button');

		this.controlNode = this.getControlNode();
	}

	private getControlNode() {
		const control = this.createElement('div', 'car-control');
		const colorAndBtnContainer = this.createElement('div', "car-control__color-and-button-container");
		const color = this.createElement('div', 'car-control__color');
			const label = this.createElement('label', 'label');
			(label as HTMLElement).setAttribute('for', 'color-create');
		color.append(label, this.inputColor);
		colorAndBtnContainer.append(color, this.button);
		control.append(this.inputName, colorAndBtnContainer);
		return control;
	}
}


export class Controls extends DomElement {

	createControl: Control;
	updateControl: Control;

	constructor() {
		super();
		this.createControl = new Control();
		this.createControl.controlNode.classList.add('active');
		this.createControl.controlNode.classList.add('car-control_create');
		this.createControl.inputColor.id = 'color-create';
		this.createControl.button.classList.add('control-button__create');
		this.createControl.button.classList.add('active');
		this.createControl.button.textContent = 'Create';

		this.updateControl = new Control();
		this.updateControl.controlNode.classList.add('car-control_update');
		this.updateControl.inputColor.id = 'color-update';
		(this.updateControl.inputColor as HTMLInputElement).disabled = true;
		(this.updateControl.inputColor as HTMLElement).style.cursor = 'default';
		(this.updateControl.inputName as HTMLInputElement).disabled = true;
		this.updateControl.button.classList.add('control-button__update');
		this.updateControl.button.textContent = 'Update';
		(this.updateControl.button as HTMLButtonElement).disabled = true;

	}

	getControlsNode() {
		const controls = this.createElement('div', 'controls');
		controls.append(this.createControl.controlNode);
		controls.append(this.updateControl.controlNode);
		return controls;
	}

	drawToDom() {
		const body = this.getBody();
		body.append(this.getControlsNode());
	}

	makeActiveUpdateControlPanel() {
		
		const inputColor = this.updateControl.inputColor as HTMLInputElement;
		const inputName = this.updateControl.inputName as HTMLInputElement;
		const updateButton = this.updateControl.button as HTMLButtonElement;

		this.undisableNodes(inputColor, inputName, updateButton);
		this.makeCursorPointer(inputColor, updateButton);

		this.addActiveClass(updateButton, this.updateControl.controlNode);
	}

	makeActiveCreateControlPanel() {
		const inputColor = this.createControl.inputColor as HTMLInputElement;
		const inputName = this.createControl.inputName as HTMLInputElement;
		const updateButton = this.createControl.button as HTMLButtonElement;

		this.undisableNodes(inputColor, inputName, updateButton);
		this.makeCursorPointer(inputColor, updateButton);

		this.addActiveClass(updateButton, this.createControl.controlNode);
	}

	makeDisableUpdateControlPanel() {
		const inputColor = this.updateControl.inputColor as HTMLInputElement;
		const inputName = this.updateControl.inputName as HTMLInputElement;
		const updateButton = this.updateControl.button as HTMLButtonElement;

		this.disableNodes(inputColor, inputName, updateButton);
		this.makeCursorDefault(inputColor, updateButton);

		this.removeActiveClass(updateButton, this.updateControl.controlNode);
	}

	makeDisableCreateControlPanel() {
		const inputColor = this.createControl.inputColor as HTMLInputElement;
		const inputName = this.createControl.inputName as HTMLInputElement;
		const updateButton = this.createControl.button as HTMLButtonElement;

		this.disableNodes(inputColor, inputName, updateButton);
		this.makeCursorDefault(inputColor, updateButton);

		this.removeActiveClass(updateButton, this.createControl.controlNode);
	}

}