import * as d3 from 'd3';
import Vertex from '../models/Vertex';
import FSA from '../models/FSA';
import findObjInArray from '../util/ArrayAdditions'

export default class D3graph {
    constructor(props){
        this.isVertexClicked = false;
        this.isContextActive = false;
        this.edgeFrom = '';
        this.action = 'select'; // enum {'select', 'connect'}

        this.graph = props.graph;
        this.activeTool = props.activeTool;
        this.addVertex = props.addVertex;
        this.removeVertex = props.removeVertex;
        this.moveVertex = props.moveVertex;
        this.addEdge = props.addEdge;
        this.removeEdge = props.removeEdge;
        this.changeState = props.changeState;
        this.updateD3 = props.updateD3;
        this.changeInitVertex = props.changeInitVertex;
        this.changeSelectedVertex = props.changeSelectedVertex;

        this.update = this.update.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.onRootClick = this.onRootClick.bind(this);
        this.onRootContextClick = this.onRootContextClick.bind(this);
        this.onVertexClick = this.onVertexClick.bind(this);
        this.onVertexContextClick = this.onVertexContextClick.bind(this);
        this.onEdgeClick = this.onEdgeClick.bind(this);
        this.onEdgeContextClick = this.onEdgeContextClick.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onInitClick = this.onInitClick.bind(this);
        this.onConnectClick = this.onConnectClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onRootClick() {
        d3.event.preventDefault();
        if(this.isContextActive) {
            d3.select('.context-menu').remove();
            this.isContextActive = false;
        } else {
          if(this.graph.selected != ''){
            this.changeSelectedVertex('');
            d3.selectAll('circle').attr('class', 'vertex-inactive');
            d3.select('#'+this.graph.initVertex.name+'-circle').attr('class', 'vertex-init')
          } else {
            let e = d3.mouse(d3.event.currentTarget);
            let v = new Vertex(e[0], e[1]);
            this.addVertex(v);
          }
        }
    }

    onRootContextClick() {
        d3.event.preventDefault();
        //let e = d3.mouse(d3.event.currentTarget);
    }


    onVertexClick() {
        d3.event.preventDefault();
        d3.event.stopPropagation();
        if(this.isContextActive) {
            d3.select('.context-menu').remove();
            this.isContextActive = false;
        } else
        if (this.action == 'select') {
            d3.selectAll('circle').attr('class', 'vertex-inactive');
            let name = d3.event.target.id.substr(0,d3.event.target.id.length - 7);
            if(this.graph.selected != name) {
                d3.select('#'+d3.event.target.id).attr('class', 'vertex-active');
                this.changeSelectedVertex(name);
            } else {
              d3.selectAll('#'+d3.event.target.id).attr('class', 'vertex-inactive');
              this.changeSelectedVertex('');
            }
        } else
        if (this.action == 'connect') {
            d3.selectAll('circle').attr('class', 'vertex-inactive');
            let name = d3.event.target.id.substr(0,d3.event.target.id.length - 7);
            let indexFrom = findObjInArray(this.graph.vertices, this.edgeFrom, 'name');
            if(indexFrom > -1) {
              let indexTo = findObjInArray(this.graph.vertices, name, 'name');
			  let e = this.graph.edges;
			  let index1 = findObjInArray(e, this.graph.vertices[indexFrom].name, 'first');
			  let index2 = findObjInArray(e, this.graph.vertices[indexTo].name, 'second');
			  if (index1 != index2 || (index1 == -1 && index2 == -1)){
				  this.addEdge(this.graph.vertices[indexFrom], this.graph.vertices[indexTo]);
			  }
            }
            this.action = 'select';
        }
    }

    onVertexContextClick() {
        d3.event.preventDefault();
        this.isContextActive = true;

        let name = d3.event.target.id.substr(0, d3.event.target.id.length -7);
        this.changeSelectedVertex(name);
        let e = d3.mouse(d3.event.currentTarget);
        let vertexContextBtns = ['connect', 'init', 'delete'];
        let rect = d3.select('svg')
            .append('g')
            .attr('class', 'context-menu')
            .selectAll('rect')
            .data(vertexContextBtns)
            .enter();
        rect.append('rect')
            .attr('class', 'context-menu-item')
            .attr('width', '10%')
            .attr('height', '2%')
            .attr('id', (d)=>{return d+'r'})
            .attr('x', e[0])
            .attr('y', (d, i)=>{return i*32+e[1];})
            .on('click', (e)=>{
                d3.event.stopPropagation();
                let id = d3.event.target.id;
                this.action = id.substr(0, id.length - 1);
            })
        rect.append('text')
            .attr('class', 'context-menu-item')
            .attr('width', '10%')
            .attr('height', '2%')
            .attr('id', (d)=>{return d+'t'})
            .attr('text-anchor', 'center')
            .attr('x', e[0])
            .attr('y', (d, i)=>{return 16+i*32+e[1];})
            .text((d)=>{return d;})
            .on('click', (e)=>{
                d3.event.stopPropagation();
                let id = d3.event.target.id;
                this.action = id.substr(0, id.length - 1);
            })

            rect.select('#initr')
                .on('click', this.onInitClick);
            rect.select('#initt')
                .on('click', this.onInitClick);
            rect.select('#connectr')
                .on('click', this.onConnectClick);
            rect.select('#connectt')
                .on('click', this.onConnectClick);
            rect.select('#deleter')
                .on('click', this.onDeleteClick);
            rect.select('#deletet')
                .on('click', this.onDeleteClick);
    }

    onInitClick() {
        d3.event.stopPropagation();
        if(this.graph.initVertex.name != this.graph.selected) {
            let i = findObjInArray(this.graph.vertices, this.graph.selected, 'name');
            if(i >= 0) {
                this.changeInitVertex(this.graph.vertices[i]);
                d3.select('.context-menu').remove();
                this.changeSelectedVertex('');
                this.isContextActive = false;
            }
        }
    }

    onConnectClick() {
        d3.event.stopPropagation();
        this.edgeFrom = this.graph.selected;
        this.action = 'connect';
        d3.select('.context-menu').remove();
        this.isContextActive = false;
    }

    onDeleteClick() {
        d3.event.stopPropagation();
        let i = findObjInArray(this.graph.vertices, this.graph.selected, 'name');
        if(i >= 0){
            d3.select('#'+this.graph.vertices[i].name+'-circle').remove();
			d3.select('.context-menu').remove();
			let edgeName = [];
			this.graph.edges.map((edge)=>{
				if((this.graph.vertices[i].name == edge.first) ||
						(this.graph.vertices[i].name == edge.second)){
					edgeName.push(edge.name);
				}
			})
			edgeName.map((edge)=>{
				d3.selectAll('#edge'+edge).remove();
			})
			this.removeVertex(this.graph.vertices[i]);
        }
        this.isContextActive = false;
    }

    onEdgeClick() {
        d3.event.stopPropagation();
		d3.selectAll('line').attr('class', 'line-inactive');
		let name = d3.event.target.id.substr(4,d3.event.target.id.length);
		if(this.graph.selected != name) {
			d3.select('#'+d3.event.target.id).attr('class', 'line-active');
			this.changeSelectedVertex(name);
		} else {
		  d3.selectAll('#'+d3.event.target.id).attr('class', 'line-inactive');
		  this.changeSelectedVertex('');
		}
    }

    onEdgeContextClick() {
        d3.event.stopPropagation();

    }

    onDrag(d) {
        let c = d3.select('#' + d.name + '-circle'),
            x = d3.event.x,
            y = d3.event.y;
        c.attr('cx', x).attr('cy', y);

		this.graph.edges.map((edge)=>{
			if(edge.first == d.name){
				d3.selectAll('#edge'+edge.name)
				.attr('x1', x)
				.attr('y1', y)
			} else if(edge.second == d.name){
				d3.selectAll('#edge'+edge.name)
				.attr('x2', x)
				.attr('y2', y)
			}
		})
    }

    onDrop(d) {
        let x = d3.event.x, y = d3.event.y;
        this.moveVertex(d, x, y);
    }

    update(props) {
        this.graph = props.graph;
        this.activeTool = props.activeTool;

        let vertices = this.graph.vertices,
            edges = this.graph.edges;

        let points = d3.select('svg')
            .selectAll('circle')
            .data(vertices)
            .enter()
            .append('circle')
            .attr('cx', (d)=>{return d.x})
            .attr('cy', (d)=>{return d.y})
            .attr('r', 20)
            .attr('id', (d) => {return d.name+'-circle'})
            .attr('class', 'vertex-inactive')
            .call(d3.drag()
                    .on('drag', this.onDrag)
                    .on('end', this.onDrop))
            .on('click', this.onVertexClick)
            .on('contextmenu', this.onVertexContextClick);

        d3.select('#'+this.graph.initVertex.name+'-circle').attr('class', 'vertex-init')
        points.exit().remove();

		let indices1 = [], indices2 = [], index = -1;
		for(let i = 0; i < edges.length; i++){
			index = findObjInArray(vertices, edges[i].first, 'name');
			if(index != -1) {
				indices1[i] = index;
			}
			index = -1;
			index = findObjInArray(vertices, edges[i].second, 'name');
			if(index != -1) {
				indices2[i] = index;
			}
			index = -1;
		}

        let lines = d3.select('svg').append('g')
            .selectAll('line')
			.data(edges)
			.enter()
            .append('line')
            .attr('id', (d)=>{return 'edge'+d.name;})
            .attr('class', 'vertex-inactive')
            .attr('x1', (d, i)=>{
				return vertices[indices1[i]].x;
			})
            .attr('y1', (d, i)=>{
				return vertices[indices1[i]].y;
			})
            .attr('x2', (d, i)=>{
				return vertices[indices2[i]].x;
			})
            .attr('y2', (d, i)=>{
				return vertices[indices2[i]].y;
			})
            .attr('stroke-opacity', 1.0)
			.on('click', this.onEdgeClick)
			.on('contextmenu', this.onEdgeContextClick);
    }

    /*
     * Event Handlers
     */

    createMarkup() {
        let root = d3.select('svg'),
            width = parseInt(root.style("width")),
            height = parseInt(root.style("height")),
            stepBig = width / 20,
            stepLittle = stepBig / 10;

        // root.call(d3.zoom()
        //     .scaleExtent([1,8])
        //     .on("zoom", zoom));
        root.on('click', this.onRootClick)
            .on('contextmenu', this.onRootContextClick);

        let stepsBig = [], stepsLittle = [];

        for(let i = 0; i < 20; i++) {
            stepsBig[i] = i * stepBig;
        }
        for(let i = 0; i < 200; i++) {
            stepsLittle[i] = i * stepLittle;
        }

        let lines = root.append('g').selectAll('line')
            .data(stepsBig)
            .enter()
            .append('line')
            .attr('class', 'markdown')
            .attr('x1', (d)=>{return d;})
            .attr('x2', (d)=>{return d;})
            .attr('y1', 0)
            .attr('y2', height)
            .style("stroke", "#999999")
            .style("stroke-width", "1");
        lines.exit().remove();

        lines = root.append('g').selectAll('line')
            .data(stepsBig)
            .enter()
            .append('line')
            .attr('class', 'markdown')
            .attr('y1', (d)=>{return d;})
            .attr('y2', (d)=>{return d;})
            .attr('x1', 0)
            .attr('x2', width)
            .style("stroke", "#999999")
            .style("stroke-width", "1");
        lines.exit().remove();

        lines = root.append('g').selectAll('line')
            .data(stepsLittle)
            .enter()
            .append('line')
            .attr('class', 'markdown')
            .attr('x1', (d)=>{return d;})
            .attr('x2', (d)=>{return d;})
            .attr('y1', 0)
            .attr('y2', height)
            .style("stroke", "#cccccc")
            .style("stroke-width", "1");
        lines.exit().remove();

        lines = root.append('g').selectAll('line')
            .data(stepsLittle)
            .enter()
            .append('line')
            .attr('class', 'markdown')
            .attr('y1', (d)=>{return d;})
            .attr('y2', (d)=>{return d;})
            .attr('x1', 0)
            .attr('x2', width)
            .style("stroke", "#cccccc")
            .style("stroke-width", "1");

        lines.exit().remove();
    }
}

function parseTransform(str) {
    let x, y;
    x = parseFloat(str.substr(10, str.length - str.indexOf(',')));
    y = parseFloat(str.substr(str.indexOf(',')+1, str.indexOf(')') - 1));
    return [x, y];
}

// function zoom() {
//     d3.select('svg').attr("transform", d3.event.transform);
// }
