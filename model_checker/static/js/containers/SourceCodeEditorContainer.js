import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import changeSourceCode from '../actions/SourceCodeEditorActions'

export class SourceCodeEditorContainer extends React.Component {

	constructor(props) {
		super(props);
		this.changeCode = this.changeCode.bind(this);
	};

	static propTypes = {
        sourceCode: React.PropTypes.string.isRequired,
        changeSourceCode: React.PropTypes.func.isRequired
	};

	render() {
		let _this = this;
		return (
			// <input className="source-code-editor"
            //            onChange={_this.changeCode}
            //            value={_this.props.sourceCode}/>
			<plaintext className="source-code-editor">
			{_this.props.sourceCode}
			</plaintext>
		);
	};

	changeCode(e) {
		this.props.changeSourceCode(e.target.value);
	}
}

function mapStateToProps(state) {
	return {
		sourceCode: state.workspaceReducer.sourceCode
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeSourceCode: bindActionCreators(changeSourceCode, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SourceCodeEditorContainer)
