const initialState = {
    formula: ' '
};

export default function TlBoxReducer(state = initialState, action) {
  	switch (action.type) {
	    case 'CHANGE_FORMULA':
	      	return { ...state, formula: action.payload };
	    default:
	      	return state;
  }
}
