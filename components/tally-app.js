// @ts-check

import { LitElement, html, css } from "../libs/lit-html.js";

import tallyStateMachine from "../modules/stateMachine/tally-state-machine.js";

import "./tally-header.js";
import "./tally-footer.js";

/**
 * `<tally-app>` is a custom web component designed for tally counting. It
 * provides actions to increment, decrement, or reset the tally counter.
 *
 * @element tally-app
 * @fires {CustomEvent} tallyResetAction - Fires a custom event when the tally counter is reset.
 * @fires {CustomEvent} tallyButtonAction - Fires a custom event when the tally counter increment/decrement buttons are clicked.
 */
class TallyApp extends LitElement {
	static properties = {
		count: { state: true },
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
		this.count = tallyStateMachine.count;
	}

	/**
	 *
	 * @returns {any}
	 */
	render() {
		return html`
			<sl-card
				class="tally-container"
				@tallyResetAction=${this.#alterTallyHandler}
			>
				<tally-header slot="header"></tally-header>
				<p class="body">${this.count}</p>
				<tally-footer
					slot="footer"
					@tallyButtonAction=${this.#alterTallyHandler}
				></tally-footer>
			</sl-card>
		`;
	}

	/**
	 * A customEvent handler which executes the passed action (`increment`,
	 * `decrement`, or `resetCounter`) on the tally count via the
	 * `tallyStateMachine` object's `runAction` method call.
	 *
	 *
	 * @param {CustomEvent} event
	 * @returns {void}
	 */
	#alterTallyHandler(event) {
		const { action } = event.detail;

		if (action === "resetCounter") {
			tallyStateMachine.runAction(action);
		} else {
			tallyStateMachine.runAction(action);
		}

		this.count = tallyStateMachine.count;
	}
}

customElements.define("tally-app", TallyApp);
