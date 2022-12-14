import { DomElement } from "../domElement";

export class generateButton extends DomElement {

	generateButton: HTMLElement;

	constructor() {
		super();
		this.generateButton = this.createElement('button', 'control-button control-button_generate active', 'generate\n10 cars');
	}

	drawToDom() {
		const body = this.getBody();
		body.append(this.generateButton);
	}

	getGenerateButton() {
		return this.generateButton;
	}
}