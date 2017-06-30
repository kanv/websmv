import React from 'react'

export class LtlBox extends React.Component {

    constructor(props) {
        super(props);
        this.selected = '';
        this.binary = ['and', 'or', 'not', '()', '->', '<->'];
        this.ctl = ['G','F','X','U'];
        this.addState = this.addState.bind(this);
        this.changeFormula = this.changeFormula.bind(this);
        this.onAppend = this.onAppend.bind(this);
        this.changeState = this.changeState.bind(this);
        this.addLtl = this.addLtl.bind(this);
    }

	static propTypes = {
        formula: React.PropTypes.string.isRequired,
        states: React.PropTypes.array.isRequired,
        addLtl: React.PropTypes.func.isRequired,
        changeFormula: React.PropTypes.func.isRequired
	};

	render() {
		let _this = this;
		if ((_this.props.states.length != 0) && this.selected == ''){
		    this.selected = _this.props.states[0].stateName;
        }
		return (
			<div className="tl-box">
                <input className="tl-expr"
                       onChange={_this.changeFormula}
                       value={_this.props.formula}
                placeholder="TL expression"/>
                <div className="boolean-operators-box">
                    {
                        _this.binary.map((b) => {
                            return (
                                <button className="btn-boolean"
                                        key={b}
                                        value={b}
                                        onClick={_this.onAppend}>
                                    {b}
                                </button>
                            )
                        })
                    }
                </div>
                <div className="ltl-operators-box">
                    {
                        _this.ctl.map((b) => {
                            return (
                                <button className="btn-ctl"
                                        key={b}
                                        value={b}
                                        onClick={_this.onAppend}>
                                    {b}
                                </button>
                            )
                        })
                    }
                </div>
                <div className="state-insert-box">
                    <select className="state-select" onChange={_this.changeState}>
                        {
                            _this.props.states.map( (st) => {
                                return (
                                    <option key={st.stateName} value={st.stateName}>
                                        {st.stateName}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button className="btn-add-state-tl"
                            onClick={_this.addState}>
                        Add
                    </button>
                </div>
                <button className="btn-add-tl-expr" onClick={this.addLtl}>
                    Add
                </button>
            </div>
		);
	}

	addLtl(){
	    this.props.addLtl(this.props.formula);
	    this.props.changeFormula('');
    }

	addState() {
        this.props.changeFormula(this.props.formula.concat(this.selected+' '));
	}


    changeFormula(event) {
        this.props.changeFormula(event.target.value);
    }

    onAppend(event) {
        this.props.changeFormula(this.props.formula.concat(event.target.value+' '));
    }

    changeState(event) {
        this.selected = event.target.value;
    }
}

// function mapStateToProps (state) {
// 	return {
// 		formula: state.CtlBoxReducer.formula
// 	}
// }
//
// function mapDispatchToProps(dispatch) {
// 	return {
// 		changeFormula: bindActionCreators(changeFormula, dispatch)
// 	}
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(CtlBox)
