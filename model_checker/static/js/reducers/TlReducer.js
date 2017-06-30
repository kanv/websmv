const initialState = {
    tlType:'ctl'
};

export default function TlReducer(state = initialState, action) {
  	switch (action.type) {
	    case 'CHANGE_TL_TYPE':
	      	return { ...state, tlType: action.payload };
	    default:
	      	return state;
  }
}
