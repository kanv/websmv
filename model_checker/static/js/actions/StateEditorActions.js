export function addState(state) {
	return {
		type: 'ADD_STATE',
		payload: state
	}
}

export function removeState(state) {
	return {
		type: 'REMOVE_STATE',
		payload: state
	}
}