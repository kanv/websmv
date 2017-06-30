export default class Vertex {

    constructor(x, y) {
        this.name = '';
        this.states = [];
        this.x = x;
        this.y = y;
        this.addState = this.addState.bind(this);
    }

    addState(state, type, value) {
      this.states.push({state: state, type: type, value: value});
        // switch (type){
        //     case 'int': {
        //         this.states.push({state, type, range})
        //     }
        //     break;
        //     case 'bool': {
        //         this.states.push({state, type})
        //     }
        //     break;
        //     case 'enum': {
        //         this.states.push({state, type, range})
        //     }
        //     break;
        //     case 'word': {
        //         this.states.push({state, type, range})
        //     }
        //     case 'array': {
        //         this.states.push({state, type, range})
        //     }
        // }
    }

    hashCode() {
        return (1/2)*(this.x+this.y)*(this.x+this.y+1)+this.y;
    }


}
