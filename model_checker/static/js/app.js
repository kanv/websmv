import React from 'react'
import {render} from 'react-dom'
import configureStore from './store/configureStore'
import StateEditorContainer from './containers/StateEditorContainer'
import DropdownContainer from './containers/DropdownContainer'
import WorkspaceContainer from './containers/WorkspaceContainer'
import SourceCodeEditorContainer from "./containers/SourceCodeEditorContainer";
import {Provider} from 'react-redux'
import RunConfigContainer from "./containers/RunConfigContainer";
import ResultsContainer from "./containers/ResultsContainer";

export const store = configureStore()

render(
	<Provider store={store}>
	<div className="dropdown">
		<DropdownContainer />
	</div>
	</Provider>,
	document.getElementById('dropdown-container')
);

render(
	<Provider store={store}>
	<div className="state-editor">
		<StateEditorContainer />
	</div>
	</Provider>,
	document.getElementById('state-editor-container')
);

render(
	<Provider store={store}>
	<div className="workspace">
		<WorkspaceContainer/>
	</div>
	</Provider>,
	document.getElementById('workspace-container')
);

render(
	<Provider store={store}>
	<div className="source-code">
		<SourceCodeEditorContainer/>
	</div>
	</Provider>,
	document.getElementById('source-code-editor-container')
);

render(
	<Provider store={store}>
	<div className="run-config">
		<RunConfigContainer/>
	</div>
	</Provider>,
	document.getElementById('run-config-container')
);

render(
	<Provider store={store}>
	<div className="results">
		<ResultsContainer/>
	</div>
	</Provider>,
	document.getElementById('results-container')
);

export default store;
