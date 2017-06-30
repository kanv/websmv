const initialState = {
   sourceCode: ''
};

export default function SourceCodeEditorReducer(state = initialState, action) {
  	switch (action.type) {
        case 'CHANGE_SOURCE_CODE':
	      	return { ...state, sourceCode: action.payload }
	    default:
	      	return state;
  }
}