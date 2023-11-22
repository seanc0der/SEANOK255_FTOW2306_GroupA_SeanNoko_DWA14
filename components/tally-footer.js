import { LitElement, html, css } from "../libs/lit-html.js";

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
					@click=${this.clickHandler}
				>
					<sl-icon class="button-icons" name="dash-lg"></sl-icon>
				</sl-button>

				<sl-button
					class="buttons"
					data-tally-action="increment"
					@click=${this.clickHandler}
				>
					<sl-icon class="button-icons" name="plus-lg"></sl-icon>
				</sl-button>
			</div>
		`;
	}

	clickHandler(event) {
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
