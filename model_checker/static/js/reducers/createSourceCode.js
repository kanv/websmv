import findObjInArray from '../util/ArrayAdditions'

/*
todo: create default value for every case
todo: like 'TRUE : VALUE'
 */

export default function createSourceCode(graph, states, ctl, ltl) {

		let result = 'MODULE main\n\tVAR\n';
		result = result.concat(createVars(states));
		result = result.concat(createCtlSpec(ctl));
		result = result.concat(createLtlSpec(ltl));
		result = result.concat(createAssign(graph));
		return result;
}

function createVars(states) {
    let result = '';
    states.map((st) => {
      switch (st.type){
          case 'bool': {
              result += '\t'+st.stateName+'\t: boolean;\n';
          }
          break;
          case 'enum': {
              result += '\t'+st.stateName+'\t: {';
              st.range.map((val) => {
                  result += val+', ';
              });
              result = result.substring(0, result.length - 2);
              result += '};\n';
          }
          break;
          case 'array': {
              result += '\t'+st.stateName+'\t: array '+st.range[0]+'..'+st.range[1]+' of '+st.arrayType+';\n'; //todo
          }
      }
    })
    return result;
}

function createCtlSpec(ctl){
	if(ctl.length == 0)
		return '';
	let result = '';
	ctl.map((f)=>{
		result += 'SPEC '+f+'\n';
	})
	return result;
}

function createLtlSpec(ltl){
	if(ltl.length == 0)
		return '';
	let result = '';
	ltl.map((f)=>{
		result += 'LTLSPEC '+f+'\n';
	})
	return result;
}

function createAssign(graph){
	let result = 'ASSIGN\n';
	let index = findObjInArray(graph.vertices, graph.initVertex.name, 'name');
	if(index != -1){
		result = result.concat(createInit(graph.vertices[index]));
		graph.vertices[0].states.map((st)=>{
			result = result.concat(createNext(graph, st.stateName));
		})
	}
	return result;
}

function createInit(initVertex){
	let result = '';
	initVertex.states.map((st)=>{
		switch (st.type){
			case 'bool':{
				result = result.concat('init('+st.stateName+') := '+st.value+';\n');
				break;
			}
			case 'enum':{
				result = result.concat('init('+st.stateName+') := '+st.value+';\n');
				break;
			}
			case 'array':{
				result = result.concat('init('+st.stateName+') := {');
				st.value.map((val, i)=>{
					result = result.concat(st.value+',');
				})
				result = result.substring(0, result.length - 1)
					.concat('}\n');
				break;
			}
		}
	})
	return result;
}

function createNext(graph, stateName){
	let vertices = graph.vertices,
		edges = graph.edges,
		transitions = [],
		result = '';

	result = result.concat('next('+stateName+'):=\n\tcase\n');

	let index = -1;

	edges.map((edge)=>{
		index = findObjInArray(edge.value, stateName, 'name');
		if(index != -1){
			transitions.push(edge);
		}
		index = -1;
	})
	vertices.map((v)=>{
		transitions.map((tr)=>{
			if(v.name == tr.first){
				result += '\t\t';
				v.states.map((st)=>{
					if(st.type != 'array'){
						result = result.concat(st.stateName+' = '+
							st.value+' & ')
					} else {
						result = result.concat(st.stateName+' = {')
						st.value.map((val)=>{
							result = result.concat(val+',');
						})
						result = result.substring(0, result.length - 1)
							.concat('} & ');
					}
				})
				result = result.substring(0, result.length - 2)
					.concat(' : ');
				let index = findObjInArray(vertices, tr.second, 'name');
				let index1 = findObjInArray(v.states, stateName, 'stateName');
				if(index != -1 && index1 != -1) {
					if(v.states[index1].type != 'array'){
						result = result.concat(vertices[index].states[index1].value+';\n')
					} else {
						console.log();
						result = result.concat('{');
						vertices[index].states[index1].value.map((val)=>{
							result = result.concat(val+',');
						})
						result = result.substring(0, result.length - 1);
						result = result.concat('};\n');
					}
				}
			}
		})
	})
	result+= '\tesac;\n';
	return result;
}
