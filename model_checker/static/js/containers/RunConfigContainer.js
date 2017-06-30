import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Buttons } from '../components/Buttons'
import { SimFlagsBox } from '../components/SimFlagsBox'
import * as rcAction from '../actions/RunConfigActions'
import changeTlType from '../actions/TlActions'
import changeFormula from '../actions/CtlBoxActions'
import TlContainer from './TlContainer'

export class RunConfigContainer extends React.Component {

	constructor(props){
		super(props);
		this.onClickRun = this.onClickRun.bind(this);
	}

	static propTypes = {
        runMode: React.PropTypes.string.isRequired,
        simFlags: React.PropTypes.object.isRequired,
        ctlFormulas: React.PropTypes.array.isRequired,
        ltlFormulas: React.PropTypes.array.isRequired,
        changeMode: React.PropTypes.func.isRequired,
		changeSimFlags: React.PropTypes.func.isRequired,
		addCtl: React.PropTypes.func.isRequired,
		removeCtl: React.PropTypes.func.isRequired,
		addLtl: React.PropTypes.func.isRequired,
		removeLtl: React.PropTypes.func.isRequired,
		run: React.PropTypes.func.isRequired,
		changeTlType: React.PropTypes.func.isRequired,
		changeFormula: React.PropTypes.func.isRequired,
		tlType: React.PropTypes.string.isRequired,
        states: React.PropTypes.array.isRequired,
		formula: React.PropTypes.string.isRequired,
		onClickRun: React.PropTypes.func.isRequired
	};

	onClickRun(){
		this.props.onClickRun(this.props.runMode);
	}

	render() {
		let _this = this;
		switch (_this.props.runMode) {
            case 'sim': {
                return (
                    <div>
                        <Buttons callback={_this.props.changeMode}
                                 active={_this.props.runMode}/>
                        <SimFlagsBox simFlags={_this.props.simFlags}
                                     changeMode={_this.props.changeMode}/>
						<div className="button-run" onClick={_this.props.onClickRun}>RUN</div>
                    </div>
                );
            }
            case 'tl': {
                return (
                    <div>
                        <Buttons callback={_this.props.changeMode}
                                 active={_this.props.runMode}/>
                        <TlContainer ctlFormulas={_this.props.ctlFormulas}
                                     ltlFormulas={_this.props.ltlFormulas}
                                     addCtl={_this.props.addCtl}
                                     removeCtl={_this.props.removeCtl}
                                     addLtl={_this.props.addLtl}
                                     removeLtl={_this.props.removeLtl}
									 changeTlType={_this.props.changeTlType}
									 changeFormula={_this.props.changeFormula}
                                     tlType={_this.props.tlType}
                                     states={_this.props.states}
                                     formula={_this.props.formula}/>
						<div className="button-run" onClick={_this.props.onClickRun}>RUN</div>
                    </div>
                );
            }
            default:
                return;
        }
	}
}

function mapStateToProps (state) {
	return {
		runMode: state.RunConfigReducer.runMode,
		simFlags: state.RunConfigReducer.simFlags,
		ctlFormulas: state.RunConfigReducer.ctlFormulas,
		ltlFormulas: state.RunConfigReducer.ltlFormulas,
		tlType: state.TlReducer.tlType,
        states: state.stateEditorReducer.states,
		formula: state.TlBoxReducer.formula
	}
}

function mapDispatchToProps(dispatch) {
	return {
		changeMode: bindActionCreators(rcAction.changeMode, dispatch),
		changeSimFlags: bindActionCreators(rcAction.changeSim, dispatch),
		addCtl: bindActionCreators(rcAction.addCtl, dispatch),
		removeCtl: bindActionCreators(rcAction.removeCtl, dispatch),
		addLtl: bindActionCreators(rcAction.addLtl, dispatch),
		removeLtl: bindActionCreators(rcAction.removeLtl, dispatch),
		run: bindActionCreators(rcAction.run, dispatch),
		changeTlType: bindActionCreators(changeTlType, dispatch),
		changeFormula: bindActionCreators(changeFormula, dispatch),
		onClickRun: bindActionCreators(rcAction.onClickRun, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RunConfigContainer)
