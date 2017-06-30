import {store} from '../app'
import createSourceCode from './createSourceCode'

const initialState = {
    runMode: 'sim',
    simFlags: {},
    ctlFormulas: [],
    ltlFormulas: [],
    result: ''
};

export default function RunConfigReducer(state = initialState, action) {
  	switch (action.type) {
        case 'CHANGE_MODE':{
            return {...state, runMode: action.payload};
        }
        case 'CHANGE_SIM': {
            return {...state, simFlags: action.payload}
        }
        case  'ADD_CTL': {
            if (state.ctlFormulas.includes(action.payload))
                return state;
            else{
				let tmp = { ...state, ctlFormulas: state.ctlFormulas.concat(action.payload)};
				let graph = {...store.getState().workspaceReducer.graph};
				let states = store.getState().stateEditorReducer.states.slice();
				store.getState().workspaceReducer.sourceCode = createSourceCode(graph,
						states, tmp.ctlFormulas, tmp.ltlFormulas);
				return tmp;
			}
        }
        case 'REMOVE_CTL': {
            let ctl = state.ctlFormulas.slice();
            ctl.splice(ctl.indexOf(action.payload),1);
			let graph = {...store.getState().workspaceReducer.graph};
			let states = store.getState().stateEditorReducer.states.slice();
			store.getState().workspaceReducer.sourceCode = createSourceCode(graph,
					states, ctl, state.ltlFormulas);
            return {...state, ctlFormulas: ctl};
        }
        case 'ADD_LTL': {
            if (state.ltlFormulas.includes(action.payload))
                return state;
            else{
				let tmp = {...state, ltlFormulas: state.ltlFormulas.concat(action.payload)};
				let graph = {...store.getState().workspaceReducer.graph};
				let states = store.getState().stateEditorReducer.states.slice();
				store.getState().workspaceReducer.sourceCode = createSourceCode(graph,
						states, state.ctlFormulas, tmp.ltlFormulas);
				return tmp;
			}
        }
        case 'REMOVE_LTL': {
            let ltl = state.ltlFormulas.slice();
            ltl.splice(ltl.indexOf(action.payload),1);
			let graph = {...store.getState().workspaceReducer.graph};
			let states = store.getState().stateEditorReducer.states.slice();
			store.getState().workspaceReducer.sourceCode = createSourceCode(graph,
					states, state.ctlFormulas, ltl);
            return {...state, ltlFormulas: ltl};
        }
        case 'RUN': {
            return {...state, result: action.payload}
        }
        default:
            return state;
  	}
}
