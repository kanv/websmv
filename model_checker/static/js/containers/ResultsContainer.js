import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class ResultsContainer extends React.Component {

	static propTypes = {
        results: React.PropTypes.string.isRequired,
	};

	render() {
		let _this = this;
		return (
			<plaintext className="results-text-view">
			{_this.props.results}
			</plaintext>
		);
	};

	changeCode(e) {
		this.props.changeSourceCode(e.target.value);
	}
}

function mapStateToProps(state) {
	return {
		results: state.RunConfigReducer.result
	}
}

function mapDispatchToProps(dispatch) {
	return {
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
/**
 * Created by vital on 16.06.2017.
 */
