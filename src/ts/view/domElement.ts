import { buttonOrInputElemArray } from "./types";

export class DomElement {

	createElement(tag: string, className: string, innerText?: string) :HTMLElement {
		const element = document.createElement(tag) as HTMLElement;
		if (className) element.className = className;
		if (innerText) element.innerText = innerText;
		return element;
	}

	getBody() {
		return document.querySelector('body') as HTMLElement;
	}

	removeActiveClass(...nodes : HTMLElement[]) {
		nodes.forEach((node) => node.classList.remove('active'));
	}

	addActiveClass(...nodes : HTMLElement[]) {
		nodes.forEach((node) => node.classList.add('active'));
	}
	

	disableNodes(...nodes : buttonOrInputElemArray) {
		nodes.forEach((node) => node.disabled = true);
	}

	undisableNodes(...nodes : buttonOrInputElemArray){
		nodes.forEach((node) => node.disabled = false);
	}

	makeCursorPointer(...nodes : buttonOrInputElemArray) {
		nodes.forEach((node) => node.style.cursor = 'pointer');
	}	

	makeCursorDefault(...nodes : buttonOrInputElemArray) {
		nodes.forEach((node) => node.style.cursor = 'default');
	}	

	appendToBody(node: HTMLElement) {
		const body = this.getBody();
		body.append(node);
	}
}