import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {StateEditorItem} from "../components/StateEditor";
import {StateItem} from "../components/StateItem";
import {EdgeView} from '../components/EdgeView';
import * as wsActions from '../actions/WorkspaceActions';
import * as siActions from '../actions/StateItemActions';
import * as seActions from '../actions/StateEditorActions';
import findObjInArray from '../util/ArrayAdditions';

export class StateEditorContainer extends React.Component {

    constructor(props) {
        super(props);
        this.stateTypes = ['bool'];
    };

	static propTypes = {
	    graph: React.PropTypes.object.isRequired,
	    stateItem:React.PropTypes.object.isRequired,
	    changeState: React.PropTypes.func.isRequired,
	    removeStateFromGraph: React.PropTypes.func.isRequired,
	    addStateToGraph: React.PropTypes.func.isRequired,
	    changeType: React.PropTypes.func.isRequired,
	    changeName:React.PropTypes.func.isRequired,
	    addEnum:React.PropTypes.func.isRequired,
	    removeEnum:React.PropTypes.func.isRequired,
	    setRange:React.PropTypes.func.isRequired,
	    setArrayType:React.PropTypes.func.isRequired,
	    reset: React.PropTypes.func.isRequired,
	    changeSelect:React.PropTypes.func.isRequired,
	    changeSelectArr:React.PropTypes.func.isRequired,
	    enums:React.PropTypes.array.isRequired,
		addTransition:React.PropTypes.func.isRequired,
		removeTransition:React.PropTypes.func.isRequired,
		changeName: React.PropTypes.func.isRequired,
		changeValue:React.PropTypes.func.isRequired,
		reset:React.PropTypes.func.isRequired
	};

	render() {
        let _this = this;
        if(_this.props.graph.selected != ''){
			let vs = _this.props.graph.vertices;
			let index = findObjInArray(vs, _this.props.graph.selected, 'name');
			if(index != -1){
				let v = vs[index];
				v.states.map((st)=>{
					if(!this.stateTypes.includes(st.type) && st.type != 'enum' && st.stype != 'array'){
						this.stateTypes.push(st.type);
					} else
					if((!this.stateTypes.includes(st.stateName))&&(st.type=='enum')){
						this.stateTypes.push(st.stateName);
					}
				})
         	return (
				<div className="state-list-div">
					<div className="state-editor-header">State editor</div>
					<ul className="state-list">
						<StateEditorItem
								stateEditorActions={_this.props.addStateToGraph}
								stateTypes={_this.stateTypes}
								stateItem={_this.props.stateItem}
								changeType={_this.props.changeType}
								changeName={_this.props.changeName}
								addEnum={_this.props.addEnum}
								removeEnum={_this.props.removeEnum}
								setRange={_this.props.setRange}
								setArrayType={_this.props.setArrayType}
								reset={_this.props.reset}
								addState={_this.props.addState}/>
						<div className="separator"/>
					{
						v.states.map( (st) => {
							return(
								<li key={v.name+st.stateName}>
								<StateItem
									state={st}
									vertex={v}
									enums={_this.props.enums}
									removeState={_this.props.removeStateFromGraph}
									changeSelect={_this.props.changeSelect}
									changeSelectArr={_this.props.changeSelectArr}/>
                  				<div className="separator"/>
								</li>
							)
						})
					}
					</ul>
				</div>
              );
        } else {
			let edges = _this.props.graph.edges;
			index = findObjInArray(edges, _this.props.graph.selected, 'name');
			return (
				<div className="state-list-div">
					<div className="state-editor-header">EDGE VIEW</div>
					<EdgeView
						edge={_this.props.graph.edges[index]}
						/>
				</div>
			)
		}
	} else
		return(
			<div/>
		);
	}
}

function mapStateToProps (state) {
    return {
        graph: state.workspaceReducer.graph,
        stateItem: state.StateItemReducer.stateItem,
		statesList: state.stateEditorReducer.states,
		enums: state.workspaceReducer.enums,
		transition: state.TransitionEditorReducer.transition
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addStateToGraph: bindActionCreators(wsActions.addState, dispatch),
        removeStateFromGraph: bindActionCreators(wsActions.removeState, dispatch),
        changeType: bindActionCreators(siActions.changeType, dispatch),
        changeName:bindActionCreators(siActions.changeName, dispatch),
        addEnum:bindActionCreators(siActions.addEnum, dispatch),
        removeEnum:bindActionCreators(siActions.removeEnum, dispatch),
        setRange:bindActionCreators(siActions.setRange, dispatch),
        setArrayType:bindActionCreators(siActions.setArrayType, dispatch),
        reset:bindActionCreators(siActions.reset, dispatch),
        changeSelect:bindActionCreators(wsActions.changeSelect, dispatch),
        changeSelectArr:bindActionCreators(wsActions.changeSelectArr, dispatch),
        addState:bindActionCreators(seActions.addState, dispatch),
		addTransition:bindActionCreators(wsActions.addTransition,dispatch),
		removeTransition:bindActionCreators(wsActions.removeTransition,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateEditorContainer)
