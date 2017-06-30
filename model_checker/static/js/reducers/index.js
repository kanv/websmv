import {combineReducers} from 'redux'
import workspaceReducer from './workspaceReducer'
import stateEditorReducer from './stateEditorReducer'
import SourceCodeEditorReducer from './SourceCodeEditorReducer'
import RunConfigReducer from './RunConfigReducer'
import TlReducer from './TlReducer'
import TlBoxReducer from './TlBoxReducer'
import StateItemReducer from './StateItemReducer'
import TransitionEditorReducer from './TransitionEditorReducer'

export default combineReducers({
	workspaceReducer,
	stateEditorReducer,
	SourceCodeEditorReducer,
	RunConfigReducer,
	TlReducer,
	TlBoxReducer,
	StateItemReducer,
	TransitionEditorReducer
})
