import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import changeSourceCode from '../actions/SourceCodeEditorActions'

export class SimFlagsBox extends React.Component {

	static propTypes = {
        simFlags: React.PropTypes.object.isRequired,
        changeMode: React.PropTypes.func.isRequired
	};

	render() {
		let _this = this;
		return (
			<div>
            </div>
		);
	}
}