import { Controls } from "./controls/controls";
import { Footer } from "./footer/footer";
import { Garage } from "./garage/garage";
import { callbackType, carsDataWithIds } from "./types";
import { Header } from "./header/header";
import { Winners } from "./winners/winners";
import { Pagination } from "./pagination/paginations";
import { generateButton } from "./controls/generate100Random";
import { startRaceButton } from "./controls/startRaceButton";
import { resetButton } from "./controls/resetButton";
import { TotalAmount } from "./totalAmount/totalAmount";

export class AppView {

	footer: Footer;
	header: Header;
	garage: Garage;
	winners: Winners;
	controls: Controls;
	pagination: Pagination;
	paginationWinners: Pagination;
	generateButton: generateButton;
	startRaceButton: startRaceButton;
	resetButton: resetButton;
	totalAmount: TotalAmount;
	winnersTotalAmount: HTMLElement;
	
	constructor() {
		this.footer = new Footer();
		this.header = new Header();
		this.garage = new Garage();
		this.winners = new Winners();
		this.controls = new Controls(); 
		this.pagination = new Pagination();
		this.paginationWinners = new Pagination();
		this.generateButton = new generateButton();
		this.resetButton = new resetButton();
		this.startRaceButton = new startRaceButton();
		this.totalAmount = new TotalAmount()
		this.winnersTotalAmount = document.createElement('p');
		}

	draw(data: carsDataWithIds) {
		this.header.drawToDom();

		this.generateButton.drawToDom();
		this.startRaceButton.drawToDom();
		const controlsWrapper = this.createElement('div', 'wrapper wrapper_controls');
		const raceButtonsContainer = this.createElement('div', 'race-buttons-container');
		raceButtonsContainer.append(this.startRaceButton.getStartButton());
		raceButtonsContainer.append(this.resetButton.getResetButton());
		controlsWrapper.append(this.controls.getControlsNode());
		controlsWrapper.append(this.generateButton.getGenerateButton());
		controlsWrapper.append(raceButtonsContainer);
		controlsWrapper.append(this.totalAmount.getTotalAmountNode());
		document.querySelector('.body')?.append(controlsWrapper);
		this.garage.drawToDom(this.garage.getGarageNodeWithLines(data));

		const table = this.winners.getTable();
		const tableWrapper = this.createElement('div', 'wrapper wrapper_table' );
		(tableWrapper as HTMLElement).style.display = 'none';
		this.winnersTotalAmount.innerText = 'total : 45';
		this.winnersTotalAmount.classList.add('total-amount-winners');
		tableWrapper.append(this.winnersTotalAmount);
		tableWrapper.append(table);
		document.querySelector('.body')?.append(tableWrapper);
		
		this.pagination.drawToDom();
		this.footer.drawToDom();
	}

	drawWinnersTable() {
		const table = this.winners.getTable();
		const tableWrapper = this.createElement('div', 'wrapper wrapper_table' );
		tableWrapper.append(table);
		document.querySelector('.body')?.append(tableWrapper);
	}


	resetView() {
		const body = document.querySelector('.body');
		(body as HTMLElement).innerHTML = '';
	}

	createElement(tag: string, className: string, innerText?: string) :HTMLElement {
		const element = document.createElement(tag) as HTMLElement;
		if (className) element.className = className;
		if (innerText) element.innerText = innerText;
		return element;
	}

	addListenerToWinnersButton(handler: callbackType) {
		this.header.winnerButton.addEventListener('click', () => {
			handler();
		})
	}

	addListenerToGarageButton(handler: callbackType) {
		this.header.garageButton.addEventListener('click', () => {
			handler();
		})
	}

	showWinnersView() {
		const controlsWrapper = document.querySelector('.wrapper_controls');
		const garage = document.querySelector('.garage');
		const table = document.querySelector('.wrapper_table');
		const pagination = document.querySelector('.pagination');

		(controlsWrapper as HTMLElement).style.display = 'none';
		(garage as HTMLElement).style.display = 'none';
		(table as HTMLElement).style.display = 'block';
		(pagination as HTMLElement).style.display = 'none';

		this.header.winnerButton.classList.add('active');
		this.header.garageButton.classList.remove('active');

	}

	showGarageView() {
		const controlsWrapper = document.querySelector('.wrapper_controls');
		const garage = document.querySelector('.garage');
		const table = document.querySelector('.wrapper_table');
		const pagination = document.querySelector('.pagination');

		(controlsWrapper as HTMLElement).style.display = 'flex';
		(garage as HTMLElement).style.display = 'block';
		(table as HTMLElement).style.display = 'none';
		(pagination as HTMLElement).style.display = 'flex';

		this.header.winnerButton.classList.remove('active');
		this.header.garageButton.classList.add('active');
	}


}