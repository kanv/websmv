export function changeType(type) {
	return {
		type: 'CHANGE_TYPE',
		payload: type
	}
}

export function changeName(name) {
	return {
		type: 'CHANGE_NAME',
		payload: name
	}
}

export function addEnum(enumer) {
	return {
		type: 'ADD_ENUM',
		payload: enumer
	}
}

export function removeEnum(name) {
	return {
		type: 'REMOVE_ENUM',
		payload: name
	}
}

export function setRange(range) {
	return {
		type: 'SET_RANGE',
		payload: range
	}
}

export function setArrayType(arrayType) {
	return {
		type: 'SET_ARRAY_TYPE',
		payload: arrayType
	}
}

export function reset() {
	return {
		type: 'RESET',
		payload: ''
	}
}
