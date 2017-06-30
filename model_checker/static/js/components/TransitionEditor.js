import React from 'react'
import findObjInArray from '../util/ArrayAdditions';

export class TransitionEditor extends React.Component {
    constructor(props) {
        super(props);
		this.select = {};
		this.selectArr = [];
		this.arrVals = [];
		this.onChangeStateName = this.onChangeStateName.bind(this);
		this.onChangeArrValue = this.onChangeArrValue.bind(this);
		this.onChangeValue = this.onChangeValue.bind(this);
		this.onAddTransition = this.onAddTransition.bind(this);
    }

	componentWillMount(){
		this.props.reset();

	}

    static propTypes = {
        states:React.PropTypes.array.isRequired,
        edge:React.PropTypes.object.isRequired,
        enums:React.PropTypes.array.isRequired,
		transition:React.PropTypes.object.isRequired,
		changeName:React.PropTypes.func.isRequired,
		changeValue:React.PropTypes.func.isRequired,
		addTransition:React.PropTypes.func.isRequired,
		reset:React.PropTypes.func.isRequired,
    };

	onChangeStateName(e){
		this.props.changeName(e.target.value);
		let name = this.props.transition.name;
		let index = findObjInArray(this.props.states, name, 'stateName');
		if (index != -1 && this.props.states[index].type == 'array') {
			let state = {...this.props.states[index]};
			let i = findObjInArray(_this.props.enums,
				state.arrayType, 'stateName');
			if (i != -1){
				let enumm = _this.props.enums[index];
				this.arrVals = [];
				for(let j = state.range[0]; j < state.range[1]; j++){
					this.arrVals.push(enumm.range[0]);
				}
			}
		}
	}

	onChangeValue(e){
		this.props.changeValue(e.target.value);
	}

	onChangeArrValue(e){
		this.arrVals[e.target.id] = e.target.value;
		this.props.changeValue(this.arrVals);
	}

	onAddTransition(e){
		this.props.addTransition(this.props.edge, this.props.transition);
		this.props.reset();
		this.arrVals = [];
	}

    render() {
		let _this = this;
		_this.select = <select onChange={_this.onChangeStateName}
					value={_this.props.transition.name}>
					{
						_this.props.states.map((st)=>{
							return(
								<option key={st.stateName} value={st.stateName}>
								{st.stateName}
								</option>
							);
						})
					}
					</select>
		let name = _this.props.transition.name;
		let index = findObjInArray(_this.props.states, name, 'stateName');
		if (index != -1) {
			let state = {..._this.props.states[index]};
			if(state.type == 'array'){
				arrayLen = state.range[1] - state.range[0];
	        	switch (_this.props.state.arrayType){
					case 'bool':{
						for(let i = 0; i < arrayLen; i++) {
							_this.arrVals[i] = 'false';
							_this.selectArr.push(
							<li key={i}>
							<label>{parseInt(state.range[0]) + i}</label>
							<select id={i} className="state-edit-arr" onChange={_this.onChangeArrValue}
							value="true">
							<option value="true">TRUE</option>
							<option value="false">FALSE</option>
							</select>
							</li>);
						}
						break;
					}
					default:{
						let index = findObjInArray(_this.props.enums,
								state.arrayType, 'stateName');
						if (index != -1){
							let enumm = _this.props.enums[index];
							for(let i = 0; i < arrayLen; i++) {
								_this.selectArr.push(
								<li key={i}>
								<label>{parseInt(state.range[0]) + i}</label>
								<select key={'selTr'+i} id={i} className="state-edit-arr" onChange={_this.onChangeSelectArr}
								value={enumm.range[0]}>
								{
									enumm.range.map((it)=>{
										return (
											<option key={'arrSel'+it} value={it}>{it}</option>
										);
									})
								}
								</select>
								</li>);
							}
						}
					}
	        	}
			}
			switch(state.type){
				case 'bool':{
					return(
						<div>
						{
							_this.select
						}
						<select onChange={_this.onChangeValue}
								value="true">
							<option value="true">TRUE</option>
							<option value="false">FALSE</option>
						</select>
						<button onClick={_this.onAddTransition}>+</button>
						</div>
					)
				}
				case 'enum':{
					return(
						<div>
						{
							_this.select
						}
						<select onChange={_this.onChangeValue}
								value={state.range[0]}>
						{
							state.range.map((r)=>{
								return (
									<option key={'tr'+r} value={r}>{r}</option>
								)
							})
						}
						</select>
						<button onClick={_this.onAddTransition}>+</button>
						</div>
					)
				}
				case 'array':{
					return (
						<div>
						{
							_this.select
						}
						<ul className="array-select-container">
							{_this.selectArr}
						</ul>
						<button onClick={_this.onAddTransition}>+</button>
	                  </div>)
				}
			}
		} else return(<div/>)
	}
}
