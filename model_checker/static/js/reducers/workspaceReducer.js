import {areEqual} from '../util/ArrayAdditions'
import findObjInArray from '../util/ArrayAdditions'
import {store} from '../app'
import createSourceCode from './createSourceCode'

const initialState = {
   graph: {
       vertices:[],
       edges: [],
       numberOfEdges: 0,
       initVertex: {},
       selected: ''},
   enums: [],
   vertexGenerator: 0,
   edgeGenerator: 0,
   sourceCode: '',
};

export default function workspaceReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_VERTEX': {
            let v = state.graph.vertices.slice();
			let vertex = {...action.payload};
			let generator = state.vertexGenerator + 1;
            vertex.name = 'S' + generator;
            if(v.length != 0){
				vertex.states = store.getState().stateEditorReducer.states.slice();
			}
            v.push(vertex);
            let tmp = {...state.graph, vertices: v};
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
            return {...state, graph: tmp, sourceCode: str, vertexGenerator: generator};
        }
        case 'REMOVE_VERTEX': {
			let e = state.graph.edges.filter((edge)=>{
				if((action.payload.name == edge.first) ||
						(action.payload.name == edge.second)){
					return false;
				}
				return true;
			})
            let v = state.graph.vertices.filter((vertex)=>{
				if(vertex.name == action.payload.name){
					return false;
				}
				return true;
			})
            let tmp = {...state.graph, vertices: v, edges: e};
            if (state.graph.selected == action.payload.name)
                tmp.selected = '';
            if (state.graph.initVertex.name == action.payload.name)
                tmp.initVertex = {};
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
            return {...state, sourceCode: str, graph: tmp};
        }
        case 'ADD_EDGE': {
			let generator = state.edgeGenerator + 1;
			let v = state.graph.vertices.slice();
            let e = state.graph.edges.slice();
			e.push({first: action.payload[0].name, second: action.payload[1].name, value: [],
					name: 'T'+generator});
			updateEdges(v, e);
            let tmp = {...state.graph, edges: e};
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
            return {...state, graph:tmp, sourceCode: str, edgeGenerator: generator};
        }
        case 'REMOVE_EDGE':{
			let v = state.graph.vertices.slice();
            let e = state.graph.edges.slice();
			e.filter((edge)=>{
				if(action.payload.name == edge.name){
					return false;
				}
				return true;
			})
			updateEdges(v, e);
            let tmp = {...state.graph, edges: e};
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
            return {...state, sourceCode: str, graph:tmp};
        }
        case 'ADD_STATE_TO_GRAPH':{
            let v = state.graph.vertices.slice();
            let e = state.graph.edges.slice();
			let states = store.getState().stateEditorReducer.states;
			let index = findObjInArray(states, action.payload.stateName,
					'stateName');
			v.map( (vertex)=>{
				if(findObjInArray(vertex.states, action.payload.stateName,
						'stateName') == -1){
					if(index != -1){
						let state = {...states[index]};
						vertex.states.push(state);
					}
				}
			})
			let enumsCopy = state.enums.slice();
			if(action.payload.type == 'enum'){
				enumsCopy.push({...action.payload});
			}
			updateEdges(v, e);
            let tmp = {...state.graph, vertices: v, edges: e};
			let st = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, st, ctl, ltl);
            return {...state, graph: tmp, sourceCode: str, enums: enumsCopy};
		}
        case 'MOVE_VERTEX': {
            let v = state.graph.vertices.slice();
            let index = findObjInArray(v, action.payload.vertex.name, 'name');
            v[index].x = action.payload.x;
            v[index].y = action.payload.y;
            let tmp = {...state.graph, vertices: v};
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
            return {...state, sourceCode: str, graph: tmp};
        }
        // case 'UPDATE_D3':{
        //     return state;
		// }
        case 'SET_INIT':{
            let tmp = {...state.graph, initVertex: action.payload};
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
            return {...state, sourceCode: str, graph: tmp};
		}
        case 'CHANGE_SELECTED':{
            let graph = {...state.graph, selected: action.payload};
            return {...state, graph: graph};
		}
        case 'REMOVE_STATE_FROM_GRAPH':{
            let v = state.graph.vertices.slice();
            let e = state.graph.edges.slice();
            v.map( (vertex)=>{
              let index = findObjInArray(vertex.states, action.payload.stateName, 'stateName');
              vertex.states.splice(index,1);
            });
            let enumsCopy = state.enums.slice();
            if(action.payload.type == 'enum'){
				let index = findObjInArray(enumsCopy, action.payload.stateName,
						'stateName');
				if(index != -1){
					enumsCopy.slice(index, 1);
				}
			}
			updateEdges(v,e);
            let tmp = {...state.graph, vertices: v, edges: e}
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
            return {...state, graph: tmp, sourceCode: str, enums: enumsCopy};
		}
        case 'CHANGE_SELECT':{
            let v = action.payload.vertex;
            let index = findObjInArray(state.graph.vertices, v.name, 'name');
            if (index != -1) {
              let vertices = state.graph.vertices.slice();
			  let edges = state.graph.edges.slice();
              vertices[index].states.map((st)=>{
                if (st.stateName == action.payload.stateName){
                  st.value = action.payload.value;
                }
              })
			  updateEdges(vertices, edges);
			  let tmp = {...state.graph, vertices: vertices, edges: edges};
  			let states = store.getState().stateEditorReducer.states.slice();
  			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
  			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
  			let str = createSourceCode(tmp, states, ctl, ltl);
			  return {...state, sourceCode: str, graph: tmp};
            }
			return state;
		}
		case 'CHANGE_SELECT_ARR':{
			let v = action.payload.vertex;
			let index = findObjInArray(state.graph.vertices, v.name, 'name');
			if(index != -1){
				let vertices = state.graph.vertices.slice();
				let edges = state.graph.edges.slice();
				vertices[index].states.map((st)=>{
					if(st.stateName == action.payload.state.stateName){
						st.value[parseInt(action.payload.id)] = action.payload.value;
					}
				})
				updateEdges(vertices, edges);
				let tmp = {...state.graph, vertices: vertices};
				let states = store.getState().stateEditorReducer.states.slice();
				let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
				let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
				let str = createSourceCode(tmp, states, ctl, ltl);
				return {...state,sourceCode: str,  graph: tmp};
			}
			return state;
		}
		case 'ADD_TRANSITION':{
			let edges = state.graph.edges.slice();
			edges.map((edge)=>{
				if(edge.name == action.payload.edge.name){
					edge.value.push(action.payload.transition);
				}
			})
			let tmp = {...state.graph, edges: edges};
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
			return {...state, sourceCode: str, graph: tmp};
		}
		case 'REMOVE_TRANSITION':{
			let edges = state.graph.edges.slice();
			edges.map((edge)=>{
				if(edge.name == action.payload.edge.name){
					edge.value.filter((tr)=>{
						if(tr.name == action.payload.transition.name){
							return false;
						} else {
							return true;
						}
					})
				}
			})
			let tmp = {...state.graph, edges: edges};
			let states = store.getState().stateEditorReducer.states.slice();
			let ctl = store.getState().RunConfigReducer.ctlFormulas.slice();
			let ltl = store.getState().RunConfigReducer.ltlFormulas.slice();
			let str = createSourceCode(tmp, states, ctl, ltl);
			return {...state, sourceCode: str, graph: graph};
		}
		case 'CHANGE_SRC':{
			let src = action.payload;
			return {...state, sourceCode: src};
		}
        default:
            return state;
    }
}

function updateEdges(vertices, edges){
	let index1 = -1, index2 = -1;
	edges.map((edge)=>{
		edge.value = [];
		index1 = findObjInArray(vertices, edge.first, 'name');
		index2 = findObjInArray(vertices, edge.second, 'name');
		if(index1 != -1 && index2 != -1){
			vertices[index1].states.map((v1)=>{
				vertices[index2].states.map((v2)=>{
					if(v1.value != v2.value){
						edge.value.push({name: v2.stateName, value: v2.value})
					}
				})
			})
		}
	})
}
