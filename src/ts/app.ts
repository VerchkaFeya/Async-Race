import { Model } from "./model/model";
import { getRandomCarName, generateRandomColor } from "./utils/utils";
import { AppView } from "./view/appView";
import { IAnimationData, IState, IStateWinners, IWinner, IWinnerWithID } from "./view/types";

export class App {
	
	view: AppView;
	model: Model;
	state: IState;
	animationData: IAnimationData;
	winnerPerRace: number;
	winnersList: number[];
	winnersState: IStateWinners;

	constructor() {
		this.view = new AppView();
		this.model = new Model();
		this.state = {actualPage: 1, totalAmount: 4, carsPerPage: 7};
		this.winnersState = {actualPage: 1, totalAmount: 0, winnersPerPage: 10}
		this.animationData = {};
		this.winnerPerRace = 0;
		this.winnersList = [];
		this.drawInitialView(this.state.actualPage, this.state.carsPerPage);
	}

	async start() {

		// PAGINATION LISTENERS
		this.view.pagination.firstButton.addEventListener('click', this.handlerFirstPageClick.bind(this));
		this.view.pagination.lastButton.addEventListener('click', this.handlerLastPageClick.bind(this));
		this.view.pagination.nextButton.addEventListener('click', this.handlerNextPageClick.bind(this));
		this.view.pagination.prevButton.addEventListener('click', this.handlerPrevPageClick.bind(this));

		// SWITCH VIEW LISTENERS
		this.view.addListenerToWinnersButton(this.handleWinnersButton.bind(this));
		this.view.addListenerToGarageButton(this.handleGarageButton.bind(this));

		// GENERATE BUTTON LISTENERS
		this.view.generateButton.generateButton.addEventListener('click', () => this.handlerGenerateCars(10)) ;

		// START / STOP RACE BUTTONS LISTENERS
		this.view.startRaceButton.startRaceButton.addEventListener('click', this.handleStartRaceButtonClick.bind(this));
		this.view.resetButton.resetButton.addEventListener('click', this.handleRaceResetButton.bind(this));

		// создание новой машины нажатием на кнопку CREATE 

		document.addEventListener('click', async (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('control-button__create')) {

				const name = (this.view.controls.createControl.inputName as HTMLInputElement).value;
				const color = (this.view.controls.createControl.inputColor as HTMLInputElement).value;

				this.createCar(name, color); // создание новой машины, добавление на сервер
				await this.drawCarsOnePage(this.state.actualPage, this.state.carsPerPage); // отрисовка машин
			}
		})

		// обновление изменений новой машины UPDATE 
		document.addEventListener('click', async (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('control-button__update')) {

				const nameInput = this.view.controls.updateControl.inputName as HTMLInputElement;
				const name = nameInput.value;

				const carId = Number(nameInput.getAttribute('data-id'));
				const color = (this.view.controls.updateControl.inputColor as HTMLInputElement).value;

				await this.model.updateCar(carId, {
					name: name,
					color: color
				})

				this.view.controls.makeActiveCreateControlPanel();
				this.view.controls.makeDisableUpdateControlPanel();

				await this.drawCarsOnePage(this.state.actualPage, this.state.carsPerPage);
			}
		})

		// изменение машины выбор SELECT
		document.addEventListener('click', async (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('line-button_select')) {

				const line = this.findClosestElem(target, '.line') as HTMLElement;
				const id = line.id;

				const name = (line.querySelector('.line__name') as HTMLElement).innerText;

				this.view.controls.makeActiveUpdateControlPanel();
				this.view.controls.makeDisableCreateControlPanel();

				const inputName = this.view.controls.updateControl.inputName as HTMLInputElement;
				const inputColor = this.view.controls.updateControl.inputColor as HTMLInputElement;

				inputName.value = `${name}`;
				inputName.setAttribute('data-id', id);

				const actualCar= await this.model.getCar(Number(id));
				const actualColor = actualCar.color;
				
				inputColor.value = actualColor;
			}
		})

		// удаление машины на кнопку REMOVE
		document.addEventListener('click', async (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('line-button_remove')) { 
				const line = this.findClosestElem(target, '.line') as HTMLElement;
				const id = line.id;

				await this.model.deleteCar(Number(id));
				await this.model.deleteWinner(Number(id));
				await this.drawCarsOnePage(this.state.actualPage, this.state.carsPerPage);
			}
		})

		// получение скорости нажатием на кнопку  START
		document.addEventListener('click', async (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('side-button_start')) {
				const line = this.findClosestElem(target, '.line') as HTMLElement;
				this.handleStartButtonClick(line);
			}
		})
		// остановка машины на кнопку STOP
		document.addEventListener('click', async (e) => {
			const target = e.target as HTMLElement;
			if (target.classList.contains('side-button_stop')) {
				const line = this.findClosestElem(target, '.line') as HTMLElement;
				this.handleStopButtonClick(line);
			}
		})
	}

	handleWinnersButton() {
		this.view.showWinnersView();
		this.drawWinnersTable(this.winnersState.actualPage, this.winnersState.winnersPerPage);
		this.getWinnersList();
	}

	handleGarageButton() {
		this.view.showGarageView();
		this.view.winners.clearTable();
	}

	async handleStartButtonClick(node: HTMLElement) {
		const id = Number(node.id);
		this.disableStartButton(node);
		this.undisableStopButton(node);
		const velocityInfo = (await this.getCarVelocity(id));
		const velocity = velocityInfo.velocity;
		await this.switchCarToDriveMode(id, node, velocity);
	}

	async handleStopButtonClick(node: HTMLElement) {
		const id = Number(node.id);
		this.disableStopButton(node);
		this.undisableStartButton(node);
		cancelAnimationFrame(this.animationData[String(id)]);
		const car = node.querySelector('.car') as HTMLElement;
		this.returnCarToZeroPosition(car);
		if (node.querySelector('.engine-broke-message')) {
			node.querySelector('.engine-broke-message')?.remove();
		}
	}

	async handleStartRaceButtonClick() {
		const linesArray = document.querySelectorAll('.line');
		linesArray.forEach((line) => this.handleStartButtonClick(line as HTMLElement));
		(this.view.startRaceButton.startRaceButton as HTMLButtonElement).disabled = true;
		(this.view.resetButton.resetButton as HTMLButtonElement).disabled = false;
		(this.view.startRaceButton.startRaceButton as HTMLButtonElement).classList.remove('active');
		(this.view.resetButton.resetButton as HTMLButtonElement).classList.add('active');
		const lines = document.querySelectorAll('.line');
		lines.forEach(line => this.disableStopButton(line as HTMLElement));
	}

	handleRaceResetButton() {
		this.drawCarsOnePage(this.state.actualPage, this.state.carsPerPage);
		(this.view.resetButton.resetButton as HTMLButtonElement).disabled = true;
		(this.view.startRaceButton.startRaceButton as HTMLButtonElement).disabled = false;
		(this.view.resetButton.resetButton as HTMLButtonElement).classList.remove('active');
		(this.view.startRaceButton.startRaceButton as HTMLButtonElement).classList.add('active');
		const lines = document.querySelectorAll('.line');
		lines.forEach(line => this.disableStopButton(line as HTMLElement));
		this.winnerPerRace = 0;
	}

	async switchCarToDriveMode( id: number, node: HTMLElement, velocity: number) {
		try {
			this.animateCar(node, velocity, id);
			const response = await this.model.switchEngineToDriveMode(id);
			if(response === 500) {
				throw new Error;
			}
		} catch (e) {
			console.log('!!! OOPS engine broke down');
			cancelAnimationFrame(this.animationData[String(id)]);
			const car = node.querySelector('.car') as HTMLElement;
			if (car.style.transform !== `translateX(0px)`) {
				this.showEngineBrokeDownMessage(node);
			}
		}
}

	animateCar(line: HTMLElement, velocity: number, id: number) {
		const startTime = Date.now();
		let animID : number;
		const car = this.getElementFromNode(line, '.car');
		const finishWidth = 30;
		const widthSideButtons = 55;
		const finishDistanceFromRightSide = 0.08; // in percents
		const width = (line.offsetWidth * (1 - finishDistanceFromRightSide)) - finishWidth - widthSideButtons; // вычислили общую длину дива с трассой 
		let shiftLeft = 0;
		
		const step = async () => {
			const division = window.screen.width > 700 ? 40 : 90;
			const delta = velocity / division;
			shiftLeft += delta;
			car.style.transform = `translateX(${shiftLeft}px)`;
			if (shiftLeft < width) {
				animID =  requestAnimationFrame(step);
				this.animationData[`${id}`] = animID;
			} else {
				const endTime = Date.now()
				let deltaTime = (endTime - startTime) / 1000 ;
				deltaTime = Number(deltaTime.toFixed(2));
				if (this.winnerPerRace === 0 && (this.view.resetButton.resetButton as HTMLButtonElement).classList.contains('active')) {
					this.winnerPerRace = id;
					const winnerList = await this.getWinnersList();
					this.showWinnerTimeMessage(line, deltaTime);
					if (!winnerList.includes(id)) {
						this.createWinner(id, deltaTime);
					} else {
						this.updateWinner(id, deltaTime);
					}
				}
			}
		}
		step();
	}

async getWinnersList() {
	const winners = await this.model.getAllWinners();
	const array: number [] = [];
	winners.forEach((winner: IWinnerWithID) => array.push(winner.id));
	return array;
}

	async createWinner(id: number, time: number) {
		await this.model.createWinner({
			id: id,
			wins: 1,
			time: time
		})
	}

	async getWinner(id: number) {
		await this.model.getWinner(id);
	}

	async updateWinner(id: number, time: number) {
		const winner = await this.model.getWinner(id);
		let winnerWins = winner.wins;
		let  winnerTime = winner.time;
		winnerTime = time < winnerTime ? time : winnerTime;
		winnerWins++;
		this.model.updateWinner(id, {wins: winnerWins, time: winnerTime});
	}

	showWinnerTimeMessage(node: HTMLElement, deltaTime: number) {
		const message = document.createElement('p');
		message.classList.add('winner-message');
		message.textContent = `WINNER! time: ${deltaTime}`;
		node.append(message);
	}

	stopAnimateCar(animId: number) {
		cancelAnimationFrame(animId);
	}

	returnCarToZeroPosition(node: HTMLElement) {
		node.style.transform = `translateX(0px)`;
	}

	showEngineBrokeDownMessage(node: HTMLElement) {
		const message = document.createElement('p');
		message.classList.add('engine-broke-message');
		message.textContent = 'Oops, car engine has broken!';
		node.append(message);
	}

	disableStartButton(node: HTMLElement) {
		const startButton = node.querySelector('.side-button_start') as HTMLButtonElement;
		startButton.disabled = true;
		startButton.classList.remove('active');
	}

	disableStopButton(node: HTMLElement) {
		const stopButton = node.querySelector('.side-button_stop') as HTMLButtonElement;
		stopButton.disabled = true;
		stopButton.classList.remove('active');
	}

	undisableStartButton(node: HTMLElement) {
		const startButton = node.querySelector('.side-button_start') as HTMLButtonElement;
		startButton.disabled = false;
		startButton.classList.add('active');
	}

	undisableStopButton(node: HTMLElement) {
		const stopButton = node.querySelector('.side-button_stop') as HTMLButtonElement;
		stopButton.disabled = false;
		stopButton.classList.add('active');
	}

	async drawInitialView (page: number, carsPerPage: number) {
		this.drawCarsOnePage(page, carsPerPage);
		this.view.totalAmount.setTotalAmountNumber(this.state.totalAmount);
	}

	async drawCarsOnePage(page: number, carsPerPage: number) {
		const data = await this.model.getCars(page, carsPerPage);
		const cars = data.items;
		const totalCarAmount = Number(data.count);
		this.changeTotalAmount(totalCarAmount);
		this.view.resetView();
		this.view.draw(cars);
	}

	async drawWinnersTable(page: number, winnersPerPage: number) {
		this.view.winners.clearTable();
		const winners = await this.model.getWinnersArray(page, winnersPerPage);
		const totalAmount = (await this.model.getWinners(1, 1)).totalAmount;
		const winnersArray = Array.from(winners);
		winnersArray.forEach(async (winner, index) => {
			const carId = (winner as IWinner).id as number;
			const car = await this.model.getCar(carId);
			this.view.winners.addNewRow(winner as IWinner, car, index+1);
		});
		(document.querySelector('.total-amount-winners') as HTMLElement).innerText = `TOTAL: ${totalAmount}`;
	}

	async getCarVelocity(id: number) {
		const velocity = await this.model.startEngine(id);
		return velocity;
	}

	private createCar(name: string, color: string) {
		this.model.createCar({
			name: name,
			color: color
		})
	}

	private findClosestElem(target: HTMLElement, selector: string) {
		return target.closest(selector);
	}

	private getElementFromNode(node: HTMLElement, selector: string) {
		return node.querySelector(selector) as HTMLElement;
	}

	// PAGINATION handlers 

	async handlerFirstPageClick() {
		this.setActualPage(1);
		await this.drawCarsOnePage(1, this.state.carsPerPage);
		this.view.pagination.changeActualPageNumber(this.state.actualPage);
		this.view.pagination.disablePage(this.view.pagination.firstButton, this.view.pagination.prevButton);
		this.view.pagination.undisablePage(this.view.pagination.lastButton, this.view.pagination.nextButton);
		this.handleRaceResetButton();
	}

	async handlerLastPageClick() {
		await this.setTotalAmount();
		const lastPageNumber = Math.ceil(this.state.totalAmount / this.state.carsPerPage);
		this.setActualPage(lastPageNumber);
		await this.drawCarsOnePage(lastPageNumber, 7);
		this.view.pagination.changeActualPageNumber(this.state.actualPage);
		this.view.pagination.disablePage(this.view.pagination.lastButton, this.view.pagination.nextButton);
		this.view.pagination.undisablePage(this.view.pagination.firstButton, this.view.pagination.prevButton);
		this.handleRaceResetButton();
	}

	async handlerNextPageClick() {
		await this.setTotalAmount();
		const lastPageNumber = Math.ceil(this.state.totalAmount / this.state.carsPerPage)
		if (this.state.actualPage < lastPageNumber) {
			this.state.actualPage++;
		}
		this.drawCarsOnePage(this.state.actualPage, 7);
		this.view.pagination.changeActualPageNumber(this.state.actualPage);
		if (this.state.actualPage === lastPageNumber) {
			this.view.pagination.disablePage(this.view.pagination.nextButton, this.view.pagination.lastButton);
		}
		this.view.pagination.undisablePage(this.view.pagination.prevButton, this.view.pagination.firstButton);
		this.handleRaceResetButton();
	}

	async handlerPrevPageClick() {
		await this.setTotalAmount();
		if (this.state.actualPage > 1) {
			this.state.actualPage--;
		}
		this.drawCarsOnePage(this.state.actualPage, 7);
		this.view.pagination.changeActualPageNumber(this.state.actualPage);
		if (this.state.actualPage === 1) {
			this.view.pagination.disablePage(this.view.pagination.prevButton, this.view.pagination.firstButton);
		}
		this.view.pagination.undisablePage(this.view.pagination.nextButton, this.view.pagination.lastButton);
		this.handleRaceResetButton();
	}

	// ---------------------------------

	async setTotalAmount() {
		const data = await this.model.getCars(1, 7);
		const totalCarAmount = Number(data.count);
		this.state.totalAmount = totalCarAmount; // устанавливает в стейт
	}

	private setActualPage(page: number) {
		this.state.actualPage = page;
	}

	changeTotalAmount(amount: number) {
		this.state.totalAmount = amount;
		this.view.totalAmount.setTotalAmountNumber(amount); // меняет на вью 
	}

	generateRandomCar() {
		const name = getRandomCarName();
		const color = generateRandomColor();
		return {name: name, color: color};
	}

	async handlerGenerateCars(num: number) {
		while (num > 0) {
			const car = this.generateRandomCar();
			this.createCar(car.name, car.color);
			num--;
		}
		this.drawCarsOnePage(this.state.actualPage, this.state.carsPerPage);
	}

}