// @ts-check

const DEFAULT_COUNT = 0;
const MIN_COUNT = -10;
const MAX_COUNT = 10;

/**
 * @typedef {"normal" | "min-reached" | "max-reached"} State;
 * @typedef {"increment" | "decrement" | "resetCounter"} Action;
 */

/**
 * @callback RunAction
 * @param {Action} action The action to perform on the tally state machine.
 */

/**
 * @typedef {object} Methods
 * @prop {RunAction} runAction Method for performing an action on the tally state machine.
 * @prop {State} state The current state of the tally state machine.
 * @prop {number} count The current count of the tally state machine.
 */

/**
 * A state machine for the TallyCount app, defining possible states and actions
 * that can be performed on the tally count. Displays toast alerts for certain
 * state transitions or successful count resets.
 *
 * @returns {Methods}
 */
const createTallyStateMachine = () => {
	/** @type {State} */
	let state = "normal";

	/** @type {number} */
	let count = DEFAULT_COUNT;

	/**
	 * Displays toast alerts based on the current state and action performed.
	 * @param {State} currentState The current state of the tally state machine.
	 * @param {Action} action The action performed.
	 * @returns {void}
	 * @throws Throws an error if the 'tally-alert' component is not found in the DOM.
	 */
	const toastAlert = (currentState, action) => {
		let alertTitle;
		let alertMessage;
		let alertType;

		if (currentState === "max-reached" || currentState === "min-reached") {
			const minOrMax = currentState.includes("min")
				? "Min-Count reached:"
				: "Max-Count reached:";

			alertTitle = minOrMax;
			alertMessage = `Unable to ${action} tally`;
			alertType = "danger";
		}

		if (action === "resetCounter") {
			alertTitle = "Success";
			alertMessage = "Tally Count successfully reset to 0.";
			alertType = "success";
		}

		const tallyAlert = document.querySelector("tally-alert");

		if (!(tallyAlert instanceof HTMLElement)) {
			throw new Error(
				"Could not find the 'tally-alert' custom component in the DOM"
			);
		}

		// @ts-ignore method exists for the <tally-alert> custom component
		tallyAlert.title = alertTitle;

		// @ts-ignore method exists for the <tally-alert> custom component
		tallyAlert.message = alertMessage;

		// @ts-ignore method exists for the <tally-alert> custom component
		tallyAlert.type = alertType;

		// @ts-ignore method exists for the <tally-alert> custom component
		tallyAlert.toastAlert();
	};

	/**
	 * Increments the counter by `1` and updates the state based on `MAX_COUNT`.
	 * @returns {void}
	 */
	const increment = () => {
		if (count !== MAX_COUNT) {
			count += 1;
			state = "normal";
		} else {
			state = "max-reached";
		}
	};

	/**
	 * Decrements the counter by `1` and updates the state based on `MIN_COUNT`.
	 * @returns {void}
	 */
	const decrement = () => {
		if (count !== MIN_COUNT) {
			count -= 1;
			state = "normal";
		} else {
			state = "min-reached";
		}
	};

	/**
	 * Resets counter to `0` and triggers the toast alert for count reset.
	 * @returns {void}
	 */
	const resetCounter = () => {
		count = DEFAULT_COUNT;
		state = "normal";

		// As the 'resetCounter' action is applicable in all transitions,
		// the toast alert for the successful count reset is triggered here.
		toastAlert(state, "resetCounter");
	};

	/**
	 * The tally state machine's possible transitions wherein each state houses
	 * the actions, and their respective high order functions, possible for each
	 * phase/ state.
	 *
	 */
	const transitions = {
		normal: {
			increment: () => increment(),
			decrement: () => decrement(),
			resetCounter: () => resetCounter(),
		},
		"min-reached": {
			increment: () => increment(),
			decrement: () => toastAlert(state, "decrement"),
			resetCounter: () => resetCounter(),
		},
		"max-reached": {
			increment: () => toastAlert(state, "increment"),
			decrement: () => decrement(),
			resetCounter: () => resetCounter(),
		},
	};

	/** @type {RunAction} */
	const runAction = (action) => transitions[state][action]();

	return {
		runAction,

		get state() {
			return state;
		},
		set state(value) {
			throw new Error("Cannot change the state directly");
		},
		get count() {
			return count;
		},
		set count(value) {
			throw new Error("Cannot change the count directly");
		},
	};
};

const tallyStateMachine = createTallyStateMachine();

export default tallyStateMachine;
