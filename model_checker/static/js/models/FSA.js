export default class FSA {

    // constructor() {
    //     this.vertices = [];
    //     this.edges = [];
    //     this.numberOfEdges = 0;
    //     this.initVertex = {};
    //     this.addVertex = this.addVertex.bind(this);
    //     this.removeVertex = this.removeVertex.bind(this);
    //     this.addEdge = this.addEdge.bind(this);
    //     this.removeEdge = this.removeEdge.bind(this);
    //     this.size = this.size.bind(this);
    //     this.relations = this.relations.bind(this);
    //     this.toSmv = this.toSmv.bind(this);
    //     this.setInit = this.setInit.bind(this);
    //     this.parseFromObject = this.parseFromObject.bind(this);
    // }

    constructor(obj) {
        this.vertices = obj.vertices;
        this.edges = obj.edges;
        this.numberOfEdges = obj.numberOfEdges;
        this.initVertex = obj.initVertex;
        this.addVertex = this.addVertex.bind(this);
        this.removeVertex = this.removeVertex.bind(this);
        this.addEdge = this.addEdge.bind(this);
        this.removeEdge = this.removeEdge.bind(this);
        this.size = this.size.bind(this);
        this.relations = this.relations.bind(this);
        this.toSmv = this.toSmv.bind(this);
        this.setInit = this.setInit.bind(this);
        this.parseFromObject = this.parseFromObject.bind(this);
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.edges[this.vertices.indexOf(vertex)] = [];
    }

    removeVertex(vertex) {
        let key = vertex.hashCode();
        if (key in this.vertices) {
            while (this.edges.length) {
                const adjacentVertex = this.edges[vertex.hashCode()].pop();
                this.removeEdge(adjacentVertex, vertex);
            }
        }
    }

    addEdge(vertex1, vertex2) {
        this.edges[this.vertices.indexOf(vertex1)].push(this.vertices.indexOf(vertex2));
        this.numberOfEdges++;
    }

    removeEdge(vertex1, vertex2) {
        const index = this.edges[this.vertices.indexOf(vertex1)] ?
            this.edges[this.vertices.indexOf(vertex1)].indexOf(this.vertices.indexOf(vertex2)) : -1;
        if (~index) {
            this.edges[this.vertices.indexOf(vertex1)].splice(index, 1);
            this.numberOfEdges--;
        }
    }

    size() {
        return this.vertices.length;
    }

    relations() {
        return this.numberOfEdges;
    }

    setInit(vertex) {
        this.initVertex = vertex;
    }

    toSmv() {
        let result = "MODULE main\n";
        result += 'VAR\n';
        this.vertices.states.map((st) => {
            switch (st.type){
                case 'int': {
                    result += '\t'+st.stateName+'\t: '+range[0]+'..'+range[1]+';\n';
                }
                break;
                case 'bool': {
                    result += '\t'+st.stateName+'\t: boolean;\n';
                }
                break;
                case 'enum': {
                    result += '\t'+st.stateName+'\t: {';
                    st.range.map((val) => {
                        result += val+', ';
                    });
                    result.substring(0, result.length - 2);
                    result += '};\n';
                }
                break;
                case 'word': {
                    result += '\t'+st.stateName+'\t: unsigned word['+st.range+';\n';
                }
                break;
                case 'array': {
                    result += '\t'+st.stateName+'\t: array '+st.range[0]+'..'+st.range[1]+' of '+st.arrayType+';\n'; //todo
                }
            }
        });
        result += 'ASSIGN\n';
        this.vertices.states.map((st) => {
            result += '\tinit('+st.name+') := '+this.initVertex.states[this.initVertex.states.indexOf(st.name)].value+';\n';
        })
    }

    parseFromObject(obj) {
        this.vertices = obj.vertices;
        this.edges = obj.edges;
        this.numberOfEdges = obj.numberOfEdges;
        this.initVertex = obj.initVertex;
    }
}
