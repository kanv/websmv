import findObjInArray from '../util/ArrayAdditions'
import {store} from '../app'

const initialState = {
    states:[]
};

export default function stateEditorReducer(state = initialState, action) {
  	switch (action.type) {
	    case 'ADD_STATE':{
			let copy = {...action.payload};
			let states = state.states.slice();
			let index = findObjInArray(states, copy.stateName, 'stateName');
			if(index == -1) {
				states.push(copy);
				createState(states, copy);
			}
			return { ...state, states: states };
		}
        case 'REMOVE_STATE':{
            let s = state.states.slice();
            let index = findObjInArray(s, action.payload.stateName, 'stateName')
            s.splice(index, 1);
            return { ...state, states: s};
		}
	    default:
	      	return state;
  }
}

function createState(states, state){
	switch(state.type) {
		case 'bool':{
			state.value = 'FALSE';
			break;
		}
		case 'array':{
			state.value = [];
			if (state.arrayType == 'bool'){
				for(let i = state.range[0]; i < state.range[1]; i++){
					state.value[i] = 'FALSE';
				}
			} else {
				let enums = store.getState().workspaceReducer.enums;
				let index = findObjInArray(enums, state.arrayType, 'stateName');
				if (index != -1){
					let index = findObjInArray(states, state.arrayType, 'stateName');
					if (index != -1){
						for(let i = state.range[0]; i < state.range[1]; i++){
							state.value[i] = states[index].range[0];
						}
					}
				}
			}
			break;
		}
		case 'enum':{
			let index = findObjInArray(states, state.stateName, 'stateName');
			if (index != -1){
				state.value = '';
				state.value = states[index].range[0];
			}
			break;
		}
	}
}
