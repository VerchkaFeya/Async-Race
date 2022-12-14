import { engineData, ICar, IWinner } from "../view/types";

export class Model {

	baseLink: string;
	garage: string;
	engine: string;
	winners: string;

	constructor() {
		this.baseLink = 'http://127.0.0.1:3000';
		this.garage = `${this.baseLink}/garage`;
		this.engine = `${this.baseLink}/engine`;
		this.winners = `${this.baseLink}/winners`;
	}

	async getCars(page: number, limit = 7) {
		const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
		const cars = await response.json();
		const count = response.headers.get('X-Total-Count');
		return {count: count, items: cars};
	}

	async getWinners(page: number, limit = 7) {
		const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}`);
		const winners = await response.json();
		const totalAmount = response.headers.get('X-Total-Count');
		return {winners: winners, totalAmount: totalAmount};
	}

	async getWinnersArray(page: number, limit = 10) {
		const response = await fetch(`${this.winners}?_page=${page}&_limit=${limit}`);
		const winners = await response.json();
		return winners;
	}

	async getAllWinners() {
		const response = await fetch(`${this.winners}`);
		const winners = await response.json();
		return winners;
	}

	async getCar(id: number) {
		const response = await fetch(`${this.garage}/${id}`);
		const car = await response.json();
		return car;
	}

	async getWinner(id: number) {
		const response = await fetch(`${this.winners}/${id}`);
		const winner = await response.json();
		return winner;
	}

	async createCar(body: ICar) {
		const response = await fetch(`${this.garage}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			},
		});
		const cars = await response.json();
		return cars;
	}

	async createWinner(body: IWinner) {
		const response = await fetch(`${this.winners}`, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			},
		});
		const winners = await response.json();
		return winners;
	}

	async updateCar(id: number, body: ICar) {
		const response = await fetch(`${this.garage}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const cars = response.json();
		return cars;
	}

	async updateWinner (id: number, body: IWinner) {
		const response = await fetch(`${this.winners}/${id}`, {
			method: 'PUT',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const winners = response.json();
		return winners;
	}

	async deleteCar(id: number) {
		await fetch(`${this.garage}/${id}`, {
			method: 'DELETE'
		})
	}

	async deleteWinner(id: number) {
		await fetch(`${this.winners}/${id}`, {
			method: 'DELETE'
		})
	}

	async startEngine(id: number) : Promise<engineData> {
		const response = await fetch(`${this.engine}?id=${id}&status=started`, {
			method: 'PATCH'
		});
		const body = await response.json();
		return body;
	}

	async stopEngine(id: number) : Promise<engineData> {
		const response = await fetch(`${this.engine}?id=${id}&status=stopped`, {
			method: 'PATCH'
		});
		const body = await response.json();
		return body;
	}

	async switchEngineToDriveMode(id: number) {
		const responce = await fetch(`${this.engine}?id=${id}&status=drive`, {
			method: 'PATCH'
		});
		return responce.status;
	}
}