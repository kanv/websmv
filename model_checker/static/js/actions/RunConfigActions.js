import fetch from 'isomorphic-fetch'

export function changeMode(state) {
    return {
        type: 'CHANGE_MODE',
        payload: state
    }
}

export function changeSim(state) {
    return {
        type: 'CHANGE_SIM',
        payload: state
    }
}

export function addCtl(state) {
    return {
        type: 'ADD_CTL',
        payload: state
    }
}

export function removeCtl(state) {
    return {
        type: 'REMOVE_CTL',
        payload: state
    }
}

export function addLtl(state) {
    return {
        type: 'ADD_LTL',
        payload: state
    }
}

export function removeLtl(state) {
    return {
        type: 'REMOVE_LTL',
        payload: state
    }
}

export function run(state) {
    return {
        type: 'RUN',
        payload: state
    }
}

export function onClickRun(runMode) {
    console.log("in onClickRun");
    return dispatch => {
        switch (runMode) {
            case 'sim': {
                return fetch('/api/simulate')
                    .then(response => response.json())
                    .then(json => dispatch(run(json)))
            }
            case 'tl': {
                return fetch('/api/verify')
                    .then(response => response.json())
                    .then(json => dispatch(run(json)))
            }
        }
    }
}