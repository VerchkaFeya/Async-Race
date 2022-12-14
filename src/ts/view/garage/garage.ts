import { DomElement } from "../domElement";
import { Line } from "./line";
import { carsDataWithIds, IGarageLine } from "../types";


export class Garage extends DomElement {

	visibleCars: IGarageLine[];

	constructor() {
		super();
		this.visibleCars = [];
	}

	getGarageNode() {
		const garage = this.createElement('div', 'garage');
		const garageWrapper = this.createElement('div', 'garage-wrapper');
		const insideWrapper = this. createElement('div', 'wrapper');
		garageWrapper.append(insideWrapper);
		garage.append(garageWrapper);
		return garage;
	}

	getGarageNodeWithLines(data: carsDataWithIds) {
		const garage = this.getGarageNode();
		const wrapper = garage.querySelector('.wrapper') as HTMLElement;
		this.appendCarLinesToNode(data, wrapper);
		return garage;
	}

	appendCarLinesToNode(data: carsDataWithIds, node: HTMLElement) {
		data.forEach((car) => {
			const line = new Line(car.id);
			const lineNode = line.getLineNode(car);
			node.append(lineNode);
		})
	}

	drawToDom(node: HTMLElement) {
		const body = document.querySelector('body') as HTMLElement;
		body.append(node);
	}
}
