import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Buttons } from '../components/Buttons'
import changeActiveTool from '../actions/ToolbarContainerActions'
import {addState, removeState} from '../actions/StateEditorActions'
import { StateEditorContainer } from '../containers/StateEditorContainer'

export class ToolbarContainer extends React.Component {

	static propTypes = {
		buttonAttrs: React.PropTypes.array.isRequired,
		activeTool: React.PropTypes.string.isRequired,
		toolbarActions: React.PropTypes.func.isRequired,
        addState: React.PropTypes.func.isRequired,
        removeState: React.PropTypes.func.isRequired,
		states: React.PropTypes.array.isRequired
	};

	render() {
		let _this = this;
		return (
			<div>
			<Buttons buttonAttrs={_this.props.buttonAttrs}
                     toggleActive={_this.props.toolbarActions}
                     activeTool={_this.props.activeTool}/>
			<StateEditorContainer states={_this.props.states}
                                  addState={_this.props.addState}
                                  removeState={_this.props.removeState}/>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		buttonAttrs: state.toolbarReducer.buttons,
		activeTool: state.toolbarReducer.activeTool,
        states: state.stateEditorReducer.states
	}
}

function mapDispatchToProps(dispatch) {
	return {
		toolbarActions: bindActionCreators(changeActiveTool, dispatch),
        addState: bindActionCreators(addState, dispatch),
        removeState: bindActionCreators(removeState, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer)