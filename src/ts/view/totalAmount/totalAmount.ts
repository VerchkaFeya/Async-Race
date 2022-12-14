import { DomElement } from "../domElement";

export class TotalAmount extends DomElement {

	totalAmountNumber: HTMLElement;


	constructor() {
		super();
		this.totalAmountNumber = this.createElement('span', 'total-amount__number', '20');
	}

	getTotalAmountNode() {
		const totalAmount = this.createElement('div', 'total-amount', 'TOTAL: ');
		totalAmount.append(this.totalAmountNumber);
		return totalAmount;
	}

	setTotalAmountNumber(number: number) {
		this.totalAmountNumber.innerText = `${number}`;
	}
}