import { DomElement } from "../domElement";

export class startRaceButton extends DomElement {

	startRaceButton: HTMLElement;


	constructor() {
		super();
		this.startRaceButton = this.createElement('button', 'race-button race-button_start active', 'start race');
	}

	drawToDom() {
		this.appendToBody(this.startRaceButton);
	}

	getStartButton() {
		return this.startRaceButton;
	}
}