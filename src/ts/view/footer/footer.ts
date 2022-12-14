import { DomElement } from "../domElement";

export class Footer extends DomElement {
	getFooterNode() {
		const footer = this.createElement('footer', 'footer');
		const gitHubLink = this.createElement('a', 'footer__item') as HTMLLinkElement;
		const rsLink = this.createElement('a', 'footer__item') as HTMLLinkElement;
		const year = this.createElement('p', 'footer__item') as HTMLElement;

		this.addLinkAttributesToElement(gitHubLink, "https://github.com/VerchkaFeya", "GitHub");
		this.addLinkAttributesToElement(rsLink, "https://rs.school/js/", "RS School");
		year.innerHTML = "2022";

		footer.append(gitHubLink);
		footer.append(rsLink);
		footer.append(year);
		return footer;
	}

	addLinkAttributesToElement(element: HTMLLinkElement, href: string, innerHtml: string) {
		element.href = `${href}`;
		element.innerHTML = `${innerHtml}`;
	}

	drawToDom() {
		const body = this.getBody();
		body.append(this.getFooterNode());
	}
}