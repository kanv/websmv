export function changeName(stateName) {
    return {
        type: 'CHANGE_NAME',
        payload: stateName
    }
}

export function changeValue(value) {
	return {
        type: 'CHANGE_VALUE',
        payload: value
    }
}


export function reset(){
	return {
		type: 'RESET'
	}
}
