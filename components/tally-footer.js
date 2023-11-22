import { LitElement, html, css } from "../libs/lit-html.js";

/**
 * `<tally-footer>' is a custom web component representing the footer section with
 * tally count increment/decrement action buttons.
 *
 * @element tally-footer
 * @fires {CustomEvent} tallyResetAction - Dispatches a custom event when the tally counter is reset <sl-menu-item> is clicked.
 * @fires {CustomEvent} tallyButtonAction - Dispatches a custom event when the tally counter's increment/decrement buttons are clicked.
 */
class TallyFooter extends LitElement {
	static styles = css`
		.buttons-wrapper {
			display: flex;
		}

		.buttons {
			flex-basis: 50%;
		}

		.buttons::part(base) {
			height: 10rem;
			flex-direction: column;
			background-color: initial;
		}

		.buttons::part(base):hover {
			background-color: var(--sl-color-neutral-100);
			border-color: var(--sl-color-neutral-300);
		}

		.buttons::part(base):active {
			background-color: var(--sl-color-neutral-0);
			border-color: var(--sl-color-neutral-300);
		}

		.button-icons {
			font-size: 2rem;
			color: #a7a7ac;
		}
	`;

	/**
	 *
	 * @returns {any}
	 */
	render() {
		return html`
			<div class="buttons-wrapper" slot="footer">
				<sl-button
					class="buttons"
					data-tally-action="decrement"
					@click=${this.#clickHandler}
				>
					<sl-icon class="button-icons" name="dash-lg"></sl-icon>
				</sl-button>

				<sl-button
					class="buttons"
					data-tally-action="increment"
					@click=${this.#clickHandler}
				>
					<sl-icon class="button-icons" name="plus-lg"></sl-icon>
				</sl-button>
			</div>
		`;
	}

	/**
	 * Handles the click event on the add/minus buttons to trigger a custom
	 * event for tally count increment and decrement actions.
	 *
	 * @param {Event} event
	 * @private
	 * @returns {void}
	 */
	#clickHandler(event) {
		const button = event.currentTarget;
		const detail = { action: button.dataset.tallyAction };

		this.dispatchEvent(
			new CustomEvent("tallyButtonAction", {
				bubbles: true,
				detail,
			})
		);

		// Shoelace <sl-button> method which removes focus from the button.
		button.blur();
	}
}

customElements.define("tally-footer", TallyFooter);
