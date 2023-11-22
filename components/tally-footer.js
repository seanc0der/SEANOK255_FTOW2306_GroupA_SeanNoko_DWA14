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
				<sl-button class="buttons" data-minus-button>
					<sl-icon class="button-icons" name="dash-lg"></sl-icon>
				</sl-button>

				<sl-button class="buttons" data-plus-button>
					<sl-icon class="button-icons" name="plus-lg"></sl-icon>
				</sl-button>
			</div>
		`;
	}
}

customElements.define("tally-footer", TallyFooter);
