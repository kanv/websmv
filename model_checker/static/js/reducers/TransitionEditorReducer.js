import findObjInArray from '../util/ArrayAdditions'
import {store} from '../app'

const initialState = {
    transition:{
		name: '',
		value: ''
	}
};

export default function TransitionEditorReducer(state = initialState, action) {
  	switch (action.type) {
	    case 'CHANGE_NAME':{
			let transition = {name: action.payload, value: ''};
			return { ...state, transition: transition};
		}
        case 'CHANGE_VALUE':{
			let transition = {...state.transition, value: action.payload};
			return { ...state, transition: transition};
		}
		case 'RESET':{
			let transition = createInit();
			return { ...state, transition: transition};
		}
	    default:
	      	return state;
	}
}

function createInit(){
	let state = store.getState().stateEditorReducer.states[0];
	switch(state.type){
		case 'bool':{
			return {name: state.stateName, value:'false'};
		}
		case 'enum':{
			return {name:state.stateName, value: state.range[0]};
		}
		case 'array':{
			switch (state.arrayType){
				case 'bool':{
					let arr = [];
					for(let i = state.range[0]; i < state.range[1]; i++){
						arr[i] = 'false';
					}
					return {name: state.stateName, value: arr};
				}
				default:{
					let arr = [];
					let enums = store.getState().workspaceReducer.enums;
					enums.map((e)=>{
						if(state.arrayType == e.name){
							for(let i = state.range[0]; i < state.range[1]; i++){
								arr[i] = e.range[0];
							}
						}
					})
					return {name: state.stateName, value: arr};
				}
			}
		}
	}
}
