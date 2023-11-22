import { LitElement, html, css } from "../libs/lit-html.js";

class TallyHeader extends LitElement {
	static styles = css`
		.header-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.header-wrapper h1 {
			font-size: 2rem;
		}

		.menu-button::part(base) {
			height: 4rem;
			width: 5rem;
			flex-direction: column;
			background-color: initial;
		}

		.menu-button::part(base):hover {
			background-color: var(--sl-color-neutral-100);
			border-color: var(--sl-color-neutral-300);
		}

		.menu-items::part(label) {
			font-size: 1.1rem;
		}

		.menu-icon {
			display: block;
			font-size: 2rem;
			color: #a7a7ac;
		}
	`;

	/**
	 * @returns {any}
	 */
	render() {
		return html`
			<div class="header-wrapper">
				<h1>Tally Count</h1>

				<sl-dropdown>
					<sl-button class="menu-button" slot="trigger" size="large">
						<sl-icon class="menu-icon" name="three-dots-vertical"></sl-icon>
					</sl-button>

					<sl-menu>
						<sl-menu-item
							class="menu-items"
							data-reset-counter
							value="reset-counter"
						>
							Reset Counter
						</sl-menu-item>
					</sl-menu>
				</sl-dropdown>
			</div>
		`;
	}
}

customElements.define("tally-header", TallyHeader);
