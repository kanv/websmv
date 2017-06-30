import React from 'react'
import findObjInArray from '../util/ArrayAdditions'

export class StateItem extends React.Component {
    constructor(props) {
        super(props);
        this.select = [];
        this.onRemove = this.onRemove.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onChangeSelectArr = this.onChangeSelectArr.bind(this);
    }

    static propTypes = {
        state: React.PropTypes.object.isRequired,
        vertex: React.PropTypes.object.isRequired,
        enums: React.PropTypes.array.isRequired,
        removeState: React.PropTypes.func.isRequired,
        changeSelect: React.PropTypes.func.isRequired,
        changeSelectArr: React.PropTypes.func.isRequired
    };

    onRemove(event) {
        this.props.removeState({stateName: this.props.state.stateName, type: this.props.state.type});
    }

    onChangeSelect(e) {
        this.props.changeSelect(this.props.vertex,
			this.props.state.stateName, e.target.value);
    }

    onChangeSelectArr(e){
		this.props.changeSelectArr(this.props.vertex,
			this.props.state, e.target.id, e.target.value);
    }

    render() {
        let _this = this;
        let type, arrayLen, select = [];
        if (_this.props.state.type == 'array'){
        	arrayLen = _this.props.state.range[1] - _this.props.state.range[0];
        	switch (_this.props.state.arrayType){
				case 'bool':{
					for(let i = 0; i < arrayLen; i++) {
						_this.select.push(
						<li key={i}>
                        <div className="arr-select-container">
                        <div className="arr-select-label">Item {i}</div>
						<select id={i} className="state-edit-arr" onChange={_this.onChangeSelectArr}
						value={_this.props.state.value[i + _this.props.state.range[0]]}>
						<option value="TRUE">TRUE</option>
						<option value="FALSE">FALSE</option>
						</select>
                        </div>
						</li>);
					}
					break;
				}
				default:{
					let index = findObjInArray(_this.props.enums,
							_this.props.state.arrayType, 'stateName');
					if (index != -1){
						let state = _this.props.enums[index];
						for(let i = 0; i < arrayLen; i++) {
							_this.select.push(
							<li key={i}>
                            <div className="arr-select-container">
                                <div className="arr-select-label">Item {i}</div>
							<select key={'sel'+i} id={i} className="state-edit-arr" onChange={_this.onChangeSelectArr}
							value={state.value[i]}>
							{
								state.range.map((it)=>{
									return (
										<option key={'arrSel'+it} value={it}>{it}</option>
									);
								})
							}
							</select>
                            </div>
							</li>);
						}
					}
				}
        	}
        }
        switch (_this.props.state.type){
            case 'bool': {
                type = 'Boolean';
                return (
                  <div className="state-item">
                      <div type="state-name" className="state-name" value={_this.props.state.stateName}>{_this.props.state.stateName}</div>
                      <div className="state-type" >{type}</div>
                      <div className="label-var-value">Value</div>
                      <select className="state-edit" onChange={_this.onChangeSelect}
                              value={_this.props.state.value}>
                          <option value="TRUE">TRUE</option>
                          <option value="FALSE">FALSE</option>
                      </select>
                      <button className="state-remove" onClick={_this.onRemove}>-</button>
                  </div>
                )
            }
            break;
            case 'enum': {
                type = 'Enum';
                return (
                  <div className="state-item">
                      <label type="state-name" className="state-name" value={_this.props.state.stateName}>{_this.props.state.stateName}</label>
                          <label className="state-type" >{type}</label>
                      <select className="state-edit" onChange={_this.onChangeSelect}
                              value={_this.props.state.value}>
                          {
                            _this.props.state.range.map((val)=> {
                              return (
                                <option value={val}>{val}</option>
                              )
                            })
                          }
                      </select>
                          <button className="state-remove" onClick={_this.onRemove}>-</button>
                  </div>
                )
            }
            break;
            case 'array': {
                type = 'Array';
                return (
                  <div className="state-item">
                      <label type="state-name" className="state-name" value={_this.props.state.stateName}>{_this.props.state.stateName}</label>
                          <label className="state-type" >{type}</label>
                      <ul className="array-select-container">
                          {_this.select}
                      </ul>
                          <button className="state-remove" onClick={_this.onRemove}>-</button>
                  </div>
            );}
            break;
        }
    }
}
