import {store} from '../app'

export function addVertex(vertex) {
	vertex.states = store.getState().stateEditorReducer.states.slice();
    return {
        type: "ADD_VERTEX",
        payload: vertex
    }
}

export function removeVertex(vertex) {
    return {
        type: "REMOVE_VERTEX",
        payload: vertex
    }
}

export function moveVertex(vertex, x, y) {
    return {
        type: "MOVE_VERTEX",
        payload: {vertex: vertex, x: x, y: y}
    }
}

export function addEdge(vertex1, vertex2) {
    return {
        type: "ADD_EDGE",
        payload: [vertex1, vertex2]
    }
}

export function removeEdge(vertices) {
    return {
        type: "REMOVE_EDGE",
        payload: vertices
    }
}

export function updateD3() {
    return {
        type: 'UPDATE_D3'
    }
}

export function changeInitVertex(vertex) {
    return {
        type: 'SET_INIT',
        payload: vertex
    }
}

export function changeSelectedVertex(vertex) {
    return {
        type: 'CHANGE_SELECTED',
        payload: vertex
    }
}

export function addState(state) {
  return {
    type: 'ADD_STATE_TO_GRAPH',
    payload: state
  }
}

export function removeState(state) {
  return {
    type: 'REMOVE_STATE_FROM_GRAPH',
    payload: state
  }
}

export function changeState(vertex, states){
  return {
    type: 'CHANGE_STATE',
    payload: [vertex, states]
  }
}

export function changeSelect(vertex, stateName, value){
  return {
    type: 'CHANGE_SELECT',
    payload: {vertex: vertex, stateName: stateName, value: value}
  }
}

export function changeSelectArr(vertex,	state, id, value){
  return {
    type: 'CHANGE_SELECT_ARR',
    payload: {vertex: vertex, state: state, id: id, value: value}
  }
}

export function addTransition(edge, transition){
  return {
    type: 'ADD_TRANSITION',
    payload: {edge: edge, transition: transition}
  }
}

export function removeTransition(edge, transition){
  return {
    type: 'REMOVE_TRANSITION',
    payload: {edge: edge, transition: transition}
  }
}


export function changeSourceCode(code){
	return {
		type: 'CHANGE_SRC',
		payload: code
	}
}
