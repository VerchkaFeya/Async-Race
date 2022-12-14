import { DomElement } from "../domElement";
import { callbackType } from "../types";


export class Header extends DomElement {

	winnerButton: HTMLElement;
	garageButton: HTMLElement;
	title: HTMLElement;

	constructor () {
		super();
		this.winnerButton = this.createElement('button', 'header-button header-button_winners', 'winners');
		this.winnerButton.id = "winners-btn";
		this.garageButton = this.createElement('button', 'header-button header-button_garage active', 'garage');
		this.garageButton.id = 'garage-btn';
		this.title = this.createElement('h1', 'header__title');
		this.title.innerHTML = "Async race";
	}

	getHeaderNode() {
		const headerWrapper = this.createElement('div', 'wrapper');
		const header = this.createElement('header', 'header');
		const headerButtons = this.createElement('div', 'header__buttons');
		headerButtons.append(this.garageButton);
		headerButtons.append(this.winnerButton);
		header.append(this.title);
		header.append(headerButtons);
		headerWrapper.append(header);
		return headerWrapper;
	}

	drawToDom() {
		const body = this.getBody();
		body.prepend(this.getHeaderNode());
	}

	clickWinnersButton(handler: callbackType) {
		this.winnerButton.addEventListener('click', () => {
			handler();
		})
	}

	clickGarageButton(handler: callbackType) {
		this.garageButton.addEventListener('click', () => {
			handler();
		})
	}

	clickTitle(handler: callbackType) {
		this.title.addEventListener('click', () => {
			handler();
		})
	}


}