import React from 'react'
import { CtlBox } from '../components/CtlBox'
import { LtlBox } from '../components/LtlBox'

export default class TlContainer extends React.Component {

    constructor(props) {
        super(props);
        this.removeCtl = this.removeCtl.bind(this);
        this.removeLtl = this.removeLtl.bind(this);
        this.changeTlType = this.changeTlType.bind(this);
    }

	static propTypes = {
	    tlType: React.PropTypes.string.isRequired,
        ctlFormulas: React.PropTypes.array.isRequired,
        ltlFormulas: React.PropTypes.array.isRequired,
        addCtl: React.PropTypes.func.isRequired,
        removeCtl: React.PropTypes.func.isRequired,
        addLtl: React.PropTypes.func.isRequired,
        removeLtl: React.PropTypes.func.isRequired,
        states: React.PropTypes.array.isRequired,
        formula: React.PropTypes.string.isRequired,
        changeFormula: React.PropTypes.func.isRequired,
        changeTlType: React.PropTypes.func.isRequired
	};

	render() {
		let _this = this;
		switch (_this.props.tlType) {
            case 'ctl': {
                return (
                    <div>
                        <div className="btn-box-tl">
                            <div className="tl-type-label">Temporal logic type</div>
                            <button className="button-list-tl-active"
                                    value="ctl"
                                    onClick={this.changeTlType}>
                                CTL
                            </button>
                            <button className="button-list-tl-inactive"
                                    value="ltl"
                                    onClick={this.changeTlType}>
                                LTL
                            </button>
                        </div>
                        <ul className="tl-expr-list">
                            <li key="ctl-edit" className="tl-expr-item-edit">
                                <CtlBox addCtl={_this.props.addCtl}
                                        states={_this.props.states}
                                        formula={_this.props.formula}
                                        changeFormula={_this.props.changeFormula}/>
                            </li>
                            {
                                this.props.ctlFormulas.map( (ctl) => {
                                    return(
                                        <li key={ctl} className="tl-expr-item">
                                            <label type="tl-item-label"
                                                   className="tl-item-label">
                                                {ctl}
                                            </label>
                                            <button className="btn-remove-formula"
                                                    onClick={this.removeCtl}
                                                    id={ctl}>
                                                -
                                            </button>
                                        </li>
                                    )
                                })}
                            {    this.props.ltlFormulas.map( (ltl) => {
                                    return(
                                        <li key={ltl} className="tl-expr-item">
                                            <label type="tl-item-label"
                                                   className="tl-item-label">
                                                {ltl}
                                            </label>
                                            <button className="btn-remove-formula"
                                                    onClick={this.removeLtl}
                                                    id={ltl}>
                                                -
                                            </button>
                                        </li>
                                    )
                                })}
                        </ul>
                    </div>
                );
            }
            case 'ltl': {
                return (
                    <div>
                        <div className="btn-box-tl">
                            <div className="tl-type-label">Temporal logic type</div>
                            <button className="button-list-tl-inactive"
                                    value="ctl"
                                    onClick={this.changeTlType}>
                                CTL
                            </button>
                            <button className="button-list-tl-active"
                                    value="ltl"
                                    onClick={this.changeTlType}>
                                LTL
                            </button>
                        </div>
                        <div className="tl-expr-list">
                                <LtlBox addLtl={_this.props.addLtl}
                                        states={_this.props.states}
                                        formula={_this.props.formula}
                                        changeFormula={_this.props.changeFormula}/>
                            {
                                this.props.ctlFormulas.map( (ctl) => {
                                    return(
                                        <div key={ctl} className="tl-expr-item">
                                            <label className="tl-item-label">
                                                {ctl}
                                            </label>
                                            <button className="btn-remove-formula"
                                                    onClick={this.removeCtl}
                                                    id={ctl}>
                                                -
                                            </button>
                                            <div className="separator"/>
                                        </div>
                                    )
                                })}
                            {    this.props.ltlFormulas.map( (ltl) => {
                                    return(
                                        <div key={ltl} className="tl-expr-item">
                                            <label className="tl-item-label">
                                                {ltl}
                                            </label>
                                            <button className="btn-remove-formula"
                                                    onClick={this.removeLtl}
                                                    id={ltl}>
                                                -
                                            </button>
                                            <div className="separator"/>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                );
            }
            default:
                return;
        }
	}

	removeCtl(e) {
	    this.props.removeCtl(e.target.id);
    }

    removeLtl(e) {
	    this.props.removeLtl(e.target.id);
    }

    changeTlType(e) {
	    this.props.changeTlType(e.target.value);
	    this.props.changeFormula('');
    }
}