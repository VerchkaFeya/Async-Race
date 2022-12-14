import { DomElement } from "../domElement";

export class resetButton extends DomElement {

	resetButton: HTMLElement;

	constructor() {
		super();
		this.resetButton = this.createElement('button', 'race-button race-button_reset', 'reset');
		(this.resetButton as HTMLButtonElement).disabled = true; 
	}

	drawToDom() {
		this.appendToBody(this.resetButton);
	}

	getResetButton() {
		return this.resetButton;
	}
}