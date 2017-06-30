import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import D3graph from '../d3/D3graph'
import * as wsActions from '../actions/WorkspaceActions'

export class WorkspaceContainer extends React.Component {

    constructor(props) {
        super(props);
		console.log(props);
        this.d3graph = new D3graph(props);
        this.isInit = true;
    }

    static propTypes = {
        graph: React.PropTypes.object.isRequired,
        addVertex: React.PropTypes.func.isRequired,
        removeVertex: React.PropTypes.func.isRequired,
        addEdge: React.PropTypes.func.isRequired,
        removeEdge: React.PropTypes.func.isRequired,
        moveVertex: React.PropTypes.func.isRequired,
        changeInitVertex: React.PropTypes.func.isRequired,
        changeSelectedVertex: React.PropTypes.func.isRequired
    };

	render() {
		return (
		    <div className="container-svg">
                <svg className="main-svg" id="main-svg"/>
            </div>
		);
	}

    componentDidMount() {
        if (this.isInit){
            this.d3graph.createMarkup();
            this.isInit = false;
        }
    }

    componentDidUpdate() {
        this.d3graph.update(this.props);
    }
}

function mapStateToProps (state) {
    return {
        graph: state.workspaceReducer.graph
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addVertex: bindActionCreators(wsActions.addVertex, dispatch),
        removeVertex: bindActionCreators(wsActions.removeVertex, dispatch),
        addEdge: bindActionCreators(wsActions.addEdge, dispatch),
        removeEdge: bindActionCreators(wsActions.removeEdge, dispatch),
        moveVertex: bindActionCreators(wsActions.moveVertex, dispatch),
        updateD3: bindActionCreators(wsActions.updateD3, dispatch),
        changeInitVertex: bindActionCreators(wsActions.changeInitVertex, dispatch),
        changeSelectedVertex: bindActionCreators(wsActions.changeSelectedVertex, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceContainer)
