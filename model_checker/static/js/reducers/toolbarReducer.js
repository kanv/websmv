import buttonAttrs from '../util/buttonAttrs'

const initialState = {
   buttons: buttonAttrs,
   activeTool: 'move'
};

export default function toolbarReducer(state = initialState, action) {
  	switch (action.type) {
	    case 'CHANGE_ACTIVE_TOOL':
	      	return { ...state, activeTool: action.payload }
	    default:
	      	return state;
  }
}