import { DomElement } from "../domElement";
import { ICar } from "../types";

export class Line extends DomElement {

	startButton: HTMLElement;
	stopButton: HTMLElement;
	selectButton: HTMLElement;
	removeButton: HTMLElement;
	line: HTMLElement;
	car: HTMLElement;
	id: number;

	constructor(id: number) {
		super();
		this.startButton = this.createElement('button', 'side-button side-button_start active', 'start');
		this.stopButton = this.createElement('button', 'side-button side-button_stop', 'stop');
		(this.stopButton as HTMLButtonElement).disabled = true;
		this.selectButton = this.createElement('button', 'line-button line-button_select');
		this.removeButton = this.createElement('button', 'line-button line-button_remove');
		this.line = this.createElement('div', 'garage__line line');
		this.car = this.createElement('div', 'line__car car');
		this.id = id;
	}

	getLineNode(carData: ICar) {
		this.line.id = `${carData.id}`;

		const sideButtons = this.createElement('div', 'line__side-buttons');
		sideButtons.append(this.startButton, this.stopButton);

		const lineMain = this.createElement('div', 'line__main');
		const lineInfo = this.createElement('div', 'line__info');

		const lineButtons = this.createElement('div', 'line__buttons');
		lineButtons.append(this.selectButton, this.removeButton);

		const name = this.createElement('div', 'line__name');
		name.innerText = `${carData.name}`;

		this.car.innerHTML = `
		<svg class="svg-car" width="${window.screen.width > 650 ? 80 : 60}" height="30" viewBox="0 0 84 31" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="car__main" d="M82.6095 23.9579C82.6095 23.9579 84.6402 29.9107 82.5685 
				29.9107C80.497 29.9107 62.2853 29.9107 62.2853 29.9107H50.0722H9.83301L7.43318 27.0536H1.54451L0.999999 13.0064L2.09006 
				3.48215L14.0859 2.64929L17.7932 4.19644L17.8891 6.93644L11.0471 14.1686L16.1574 14.1964C16.1574 14.1964 17.1364 11.3393 
				20.1907 10.505C23.2449 9.67073 34.8037 7.05215 34.8037 7.05215L35.5666 13.4807C35.5666 13.4807 49.9368 13.4514 54.4058 
				14.1086C56.9833 14.488 63.116 15.007 68.7197 16.4286C72.9446 17.5 76.2991 21.3993 80.3859 22.8572L82.6095 23.9579Z" fill="${carData.color}"/>
				<path d="M75.779 27.68C75.779 27.68 83.3456 29.2286 81.3009 27.2629C81.3009 27.2629 
				76.1074 23.4821 63.4879 23.125L67.1517 27.9687L72.4116 29.7056L75.779 27.68Z" fill="${this.changeHexColorLighter(carData.color, 80)}"/>
				<path d="M34.7642 13.8393L34.5175 7.02286L18.4067 11.5179L17.0164 15.7143H29.448L34.7642 13.8393Z" fill="${this.changeHexColorLighter(carData.color, 80)}"/>
				<path d="M16.9344 0.178572L17.1798 5.71429H1.47669L1.72205 0L16.9344 0.178572Z" fill="${this.changeHexColorLighter(carData.color, 80)}"/>
				<path d="M12.2726 29.7544C10.2286 29.7544 8.57173 27.9456 8.57173 25.7143C8.57173 
				23.483 10.2286 21.6742 12.2726 21.6742C14.3165 21.6742 15.9734 23.483 15.9734 25.7143C15.9734 
				27.9456 14.3165 29.7544 12.2726 29.7544Z" fill="#D0CFCE"/>
				<path d="M61.0178 29.7544C58.9739 29.7544 57.317 27.9456 57.317 25.7143C57.317 23.483 58.9739 
				21.6742 61.0178 21.6742C63.0617 21.6742 64.7186 23.483 64.7186 25.7143C64.7186 27.9456 63.0617 
				29.7544 61.0178 29.7544Z" fill="#D0CFCE"/>
				<path d="M60.3634 30C58.1953 30 56.4376 28.0812 56.4376 25.7143C56.4376 23.3474 58.1953 21.4286 
				60.3634 21.4286C62.5316 21.4286 64.2892 23.3474 64.2892 25.7143C64.2892 28.0812 
				62.5316 30 60.3634 30Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M38.1174 15.7143C35.9493 15.7143 34.1917 13.7955 34.1917 11.4285C34.1917 
				9.0616 35.9493 7.14282 38.1174 7.14282C40.2856 7.14282 42.0432 9.0616 42.0432 11.4285C42.0432 
				13.7955 40.2856 15.7143 38.1174 15.7143Z" fill="black"/>
				<path d="M11.9456 30C9.77741 30 8.01978 28.0812 8.01978 25.7143C8.01978 23.3474 
				9.77741 21.4286 11.9456 21.4286C14.1137 21.4286 15.8713 23.3474 15.8713 25.7143C15.8713 
				28.0812 14.1137 30 11.9456 30Z" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M3.27601 25.7143H1.47669V1.42856H17.1798V5.71428L13.0087 10.1548" stroke="black" 
				stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M68.215 27.1429L69.5236 28.5714H82.6095V22.8571C82.6095 22.8571 65.5978 14.2857 
				48.5861 14.2857H22.4142" stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M51.2032 28.5714H19.797" stroke="black" stroke-width="2" stroke-miterlimit="10" 
				stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M35.5002 12.8571V7.14282C35.5002 7.14282 22.4143 7.14282 17.1799 14.2857" 
				stroke="black" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		`

		const finish = this.createElement('div', 'line__finish');

		lineInfo.append(lineButtons, name);
		lineMain.append(lineInfo, this.car, finish);
		this.line.append(sideButtons, lineMain);

		return this.line;
	}


	handleStartButton() {
		this.startButton.addEventListener('click', (e) => {
			console.log(e, e.target);
			console.log('SOMETHING');
		})
	}


	private changeHexColorLighter (col: string, amt: number) {
    let usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    const num = parseInt(col,16);

    let r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;

    let g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

addActiveClassToStopButton() {
	this.stopButton.classList.add('active');
}
}