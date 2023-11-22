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

		.menu {
			padding: 0;
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
			padding: 0.8rem;
			font-size: 1.2rem;
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

					<sl-menu class="menu">
						<sl-menu-item
							class="menu-items"
							data-tally-action="resetCounter"
							value="reset-counter"
							@click=${this.#clickHandler}
						>
							Reset Counter
						</sl-menu-item>
					</sl-menu>
				</sl-dropdown>
			</div>
		`;
	}

	#clickHandler(event) {
		const menuItem = event.currentTarget;
		const menuItemData = { action: menuItem.dataset.tallyAction };

		this.dispatchEvent(
			new CustomEvent("tallyResetAction", {
				bubbles: true,
				detail: menuItemData,
			})
		);
	}
}

customElements.define("tally-header", TallyHeader);
