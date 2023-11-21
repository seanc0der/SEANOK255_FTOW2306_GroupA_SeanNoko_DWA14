// @ts-check

import { LitElement, html, css } from "../libs/lit-html.js";

import "./tally-header.js";
import "./tally-footer.js";

class TallyApp extends LitElement {
	static properties = {
		count: { type: Number, state: true },
	};

	static styles = css`
		* {
			box-sizing: border-box;
		}

		html {
			font-size: 100%;
		}

		body {
			font-family:
				system-ui,
				-apple-system,
				BlinkMacSystemFont,
				"Segoe UI",
				Roboto,
				Oxygen,
				Ubuntu,
				Cantarell,
				"Open Sans",
				"Helvetica Neue",
				sans-serif;
			padding: 0;
			margin: 0;
			color: #a7a7ac;
		}

		/* Tally container */

		.tally-container {
			width: 50%;
			display: block;
			margin: auto;
			margin-top: 200px;
		}

		.tally-container::part(base) {
			height: 550px;
			justify-content: space-between;
		}

		.tally-container::part(header) {
			border-bottom: none;
		}

		.tally.container::part(body) {
			height: 70px;
		}

		.tally-container::part(footer) {
			padding: 0;
		}

		/* Body */

		.body {
			font-size: 10rem;
			font-weight: 700;
			text-align: center;
			color: #31c48d;
			margin: 0;
		}
	`;

	constructor() {
		super();
		this.count = 0;
	}

	/**
	 *
	 * @returns {any}
	 */
	render() {
		return html`
			<sl-card class="tally-container">
				<tally-header slot="header"></tally-header>
				<p class="body">${this.count}</p>
				<tally-footer slot="footer"></tally-footer>
			</sl-card>
		`;
	}
}

customElements.define("tally-app", TallyApp);

// /* Container Footer */
