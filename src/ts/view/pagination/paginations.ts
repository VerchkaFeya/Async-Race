import { DomElement } from "../domElement";

export class Pagination extends DomElement{

	prevButton: HTMLElement;
	nextButton: HTMLElement;
	firstButton: HTMLElement;
	lastButton: HTMLElement;
	actualPage: HTMLElement;

	constructor() {
		super();
		this.prevButton = this.createElement('button', 'page page_prev prev-btn disable', '<');
		this.firstButton = this.createElement('button', 'page page_first first-btn disable', '<<')
		this.nextButton = this.createElement('button', 'page page_next next-btn', '>');
		this.lastButton = this. createElement('button', 'page page_last last-btn', '>>');

		this.actualPage = this.createElement('button', 'pagination__page page active', '1');
	}

	getPaginationNode() {
		const paginationContainer = this.createElement('div', 'pagination');
		const pageContainer = this.createElement('div', 'pagination__page-container');

		paginationContainer.append(this.firstButton, this.prevButton);

		pageContainer.append(this.actualPage);

		paginationContainer.append(pageContainer);
		paginationContainer.append(this.nextButton, this.lastButton);
		return paginationContainer;
	}

	drawToDom() {
		const body = this.getBody();
		body.append(this.getPaginationNode());
	}

	changeActualPageNumber(page: number) {
		this.actualPage.textContent = `${page}`;
	}

	disablePage(...nodes: HTMLElement[]) {
		nodes.forEach(node => {
			node.classList.add('disable');
			(node as HTMLButtonElement).disabled = true;
		});
	}

	undisablePage(...nodes: HTMLElement[]) {
		nodes.forEach(node => {
			node.classList.remove('disable');
			(node as HTMLButtonElement).disabled = false;
		});
	}

}