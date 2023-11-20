// @ts-check

import { LitElement, html } from "../libs/lit-html.js";

import escapeHTML from "../utils/helpers.js";

const ALERT_TYPE_MAP = {
	primary: { variant: "primary", icon: "info-circle" },
	success: { variant: "success", icon: "check2-circle" },
	neutral: { variant: "neutral", icon: "gear" },
	warning: { variant: "warning", icon: "exclamation-triangle" },
	danger: { variant: "danger", icon: "exclamation-octagon" },
};

/**
 * `<tally-alert>` is a custom component that displays toast alerts using `<sl-alert>` from the Shoelace library.
 * The toast alert can be triggered implicitly or declaratively by means of using the `toast()
 *
 * @element tally-alert
 * @attr {string} message - The toast alert message to display.
 * @attr {"primary" | "success" | "neutral" | "warning" | "danger"} type - The alert type which determines the theme and icon used for the toast alert.
 * @attr {boolean} showToast - Controls the display of the toast alert. When set to true, shows the toast alert. Default is false.
 */
class TallyAlert extends LitElement {
	static properties = {
		message: { type: String },
		type: { type: String, reflect: true },
		showToast: { type: Boolean, reflect: true },
	};

	constructor() {
		super();
		this.showToast = false;
		this.type = "primary";
		this.message = "";
		this.renderRoot = undefined;
	}

	/**
	 *
	 * @returns {any}
	 */
	#slAlertTemplate() {
		return html`
			<sl-alert
				data-alert
				variant=${ALERT_TYPE_MAP[this.type].variant}
				duration="3000"
				closable
			>
				<sl-icon slot="icon" name=${ALERT_TYPE_MAP[this.type].icon}></sl-icon>
				<strong>TallyCount status:</strong><br />
				${escapeHTML(this.message)}
			</sl-alert>
		`;
	}

	/**
	 *
	 * @returns {any}
	 */
	render() {
		return html` ${this.showToast ? this.#slAlertTemplate() : ""} `;
	}

	/**
	 * Queries and selects the internal `<sl-alert>` component from the
	 * `shadowRoot`, triggering its `toast()` method. After the toast alert
	 * closes, it's completely removed from `ShadowDOM`. Subsequently, the
	 * `updateComplete()` read-only promise, another method of `<sl-alert>`,
	 * resolves, resulting in the `showToast` property being set to `false`.
	 *
	 * @param {object} changedProperties
	 */
	updated(changedProperties) {
		if (changedProperties.has("showToast") && this.showToast) {
			const alert = this.renderRoot?.querySelector("[data-alert]") ?? null;

			if (!alert)
				throw new Error(
					`The 'sl-alert' component could not be selected from shadowRoot: '${this.renderRoot}'`
				);

			alert.toast();

			alert.updateComplete.then(() => {
				this.showToast = false;
			});
		}
	}

	/**
	 *
	 * The method implicitly updates the `showToast` boolean property's value to true.
	 *
	 * @public
	 * @returns {void}
	 */
	toastAlert() {
		this.showToast = true;
	}
}

customElements.define("tally-alert", TallyAlert);
// <div data-container>${this.showToast ? this.#slAlertTemplate() : ""}</div>
