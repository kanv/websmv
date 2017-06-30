import React from 'react'
import { connect } from 'react-redux'

export class ExecutionResultContainer extends React.Component {

	static propTypes = {
        result: React.PropTypes.string.isRequired
	};

	render() {
		let _this = this;
		return (
			<plaintext className="execution-result-container">
			{_this.props.result}
			</plaintext>
		);
	};
}

function mapStateToProps(state) {
	return {
		sourceCode: state.workspaceReducer.sourceCode
	}
}

function mapDispatchToProps(dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecutionResultContainer)
