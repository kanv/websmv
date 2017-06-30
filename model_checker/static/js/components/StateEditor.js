import React from 'react'

export class StateEditorItem extends React.Component {
    constructor(props) {
        super(props);
        this.enumItem = '';
        this.name = '';
        this.range = this.props.stateItem.range;
        this.onAdd = this.onAdd.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onAddEnum = this.onAddEnum.bind(this);
        this.onRemoveEnum = this.onRemoveEnum.bind(this);
        this.onEnumItemChange = this.onEnumItemChange.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeRangeLow = this.onChangeRangeLow.bind(this);
        this.onChangeRangeHigh = this.onChangeRangeHigh.bind(this);
        this.onChangeArrayType = this.onChangeArrayType.bind(this);
        this.reset = this.reset.bind(this);
    }

    static propTypes = {
        stateTypes:React.PropTypes.array.isRequired,
        stateItem:React.PropTypes.object.isRequired,
        stateEditorActions: React.PropTypes.func.isRequired,
        changeType: React.PropTypes.func.isRequired,
        changeName:React.PropTypes.func.isRequired,
        addEnum:React.PropTypes.func.isRequired,
        removeEnum:React.PropTypes.func.isRequired,
        setRange:React.PropTypes.func.isRequired,
        setArrayType:React.PropTypes.func.isRequired,
        reset:React.PropTypes.func.isRequired,
		addState:React.PropTypes.func.isRequired
    };

    onChangeName(e){
        this.props.changeName(e.target.value);
    }

    onChangeType(e) {
        this.props.changeType(e.target.value);
    }

    onAdd(e) {
		this.props.addState(this.props.stateItem);
        this.props.stateEditorActions(this.props.stateItem);
        this.reset();
    }

    reset(){
        this.props.reset();
        this.props.changeType('bool');
        this.range = [0,0];
        this.props.setRange(this.range);
        this.enumItem = '';
    }

    onAddEnum(e) {
      this.props.addEnum(this.enumItem);
    }

    onRemoveEnum(e) {
      this.props.removeEnum(e.target.value);
    }

    onEnumItemChange(e) {
      this.enumItem = e.target.value;
    }

    onChangeRangeLow(e){
      this.range[0] = e.target.value;
      this.props.setRange(this.range);
    }

    onChangeRangeHigh(e){
      this.range[1] = e.target.value;
      this.props.setRange(this.range);
    }

    onChangeArrayType(e) {
      this.props.setArrayType(e.target.value);
    }

    render() {
        let _this = this;
        switch(_this.props.stateItem.type){
          case 'bool':{
          return (
              <div className="state-item">
                    <div className="state-name-edit">
                      <input type="text" onChange={_this.onChangeName}
                          value={_this.props.stateItem.stateName}
                             placeholder="Var's name"/>
                      <span className="highlight"></span>
                      <span className="bar"></span>
                    </div>
                      <select className="state-type-edit"
					  		onChange={_this.onChangeType}
							value="bool">
                          <option value="bool">Bool</option>
                          <option value="enum">Enum</option>
                          <option value="array">Array</option>
                      </select>
                  <div className="round-button">
                  <div className="round-button-circle">
                      <a href="#" className="round-button"
                      onClick={_this.onAdd}>
                      +
                  </a></div></div>
              </div>
          );
        }
          case 'enum':{
            return (
              <div className="state-item">
                  <input type="name" className="state-name-edit" onChange={_this.onChangeName}
                      value={_this.props.stateItem.stateName}
                      placeholder="Var's name..."/>
				  <select className="state-type-edit"
						onChange={_this.onChangeType}
						value="enum">
					  <option value="bool">Bool</option>
					  <option value="enum">Enum</option>
					  <option value="array">Array</option>
				  </select>
              <div>
              {
                _this.props.stateItem.range.map((d)=>{
                  return (<div className="enum-item-edit" key={d}>
                  <div className="enum-item">{d}</div>
                  <div className="btn-add-enum">
                      <a  href="#"
                  value={d}
                         onClick={_this.onRemoveEnum}>-</a></div>
                  <div className="separator"/>
                  </div>
                );
              })
            }
            <input placeholder="Enumeration item..." className="enum-item-add" onChange={_this.onEnumItemChange}/>
            <div className="btn-add-enum" >
                <a href="#" onClick={_this.onAddEnum}>+</a></div>
            </div>
            <div className="round-button">
                  <div className="round-button-circle">
                      <a href="#" className="round-button"
                      onClick={_this.onAdd}>
                      +
                  </a></div></div>
              </div>
          );
          }
          case 'array':{
          return (
            <div className="state-item">
                  <input type="name" className="state-name-edit" onChange={_this.onChangeName}
                      value={_this.props.stateItem.stateName}
                      placeholder="Var's name..."/>
				  <select className="state-type-edit"
						onChange={_this.onChangeType}
						value="array">
					  <option value="bool">Bool</option>
					  <option value="enum">Enum</option>
					  <option value="array">Array</option>
				  </select>
                  <div>
                  <div className="label-state-range">Index from</div>
                  <input type="name" className="state-range-edit" onChange={_this.onChangeRangeLow}
                  value={_this.props.stateItem.range[0]}
                  placeholder="Index from..."/>
                  <div className="label-state-range">Index to</div>
                  <input type="name" className="state-range-edit" onChange={_this.onChangeRangeHigh}
                  value={_this.props.stateItem.range[1]}
                  placeholder="Index to..."/>
                    <select className="state-type-edit-arr" onChange={_this.onChangeArrayType}>
                      {
                        _this.props.stateTypes.map((d)=>{
                          return (
                                <option key={d} value={d}>{d}</option>
                              );
                        })
                      }
                      </select>
                  </div>
                <div className="round-button">
                  <div className="round-button-circle">
                      <a href="#" className="round-button"
                      onClick={_this.onAdd}>
                      +
                  </a></div></div>
                </div>
          );
        }
        }
    }
}
