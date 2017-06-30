const initialState = {
	stateItem:{
		stateName: '',
		type: 'bool',
		value: '',
		range: [],
		arrayType: ''
	}
};

export default function StateItemReducer(state = initialState, action) {
  	switch (action.type) {
        case 'CHANGE_TYPE':{
            let s1 = {...state.stateItem, type: action.payload};
            if(s1.type == 'array'){
              s1.range = [0,0];
              s1.arrayType = 'bool';
			  s1.value = [];
            }
            else
              s1.range = [];
            return {...state, stateItem: s1};
        }
        case 'CHANGE_NAME':{
            let s2 = {...state.stateItem, stateName: action.payload};
            return {...state, stateItem: s2};
        }
        case 'ADD_ENUM':{
            let range = state.stateItem.range.slice();
            if(range.includes(action.payload)){
              return state;
            }
            range.push(action.payload);
            let tmp1 = {...state.stateItem, range: range};
            return {...state, stateItem: tmp1};
        }
        case 'REMOVE_ENUM':{
          let range = state.stateItem.range.slice();
          range.splice(action.payload - 1, 1);
          let tmp2 = {...state.stateItem, range: range};
          return {...state, stateItem: tmp2};
        }
        case 'SET_RANGE': {
          let tmp3 = {...state.stateItem, range: action.payload};
          return {...state, stateItem: tmp3};
        }
        case 'SET_ARRAY_TYPE': {
          let tmp4 = {...state.stateItem, arrayType: action.payload};
          return {...state, stateItem: tmp4};
        }
        case 'RESET': {
          return initialState;
        }
        default: return state;
    }
}
