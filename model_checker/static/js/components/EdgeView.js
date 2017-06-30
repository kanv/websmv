import React from 'react'
import findObjInArray from '../util/ArrayAdditions'

export class EdgeView extends React.Component {

    static propTypes = {
        edge: React.PropTypes.object.isRequired
    };

    render() {
		let _this= this;
		return(
			<ul className="state-list">
				{
					_this.props.edge.value.map((value)=>{
						return(
							<li key={value.name}>
							<label>{value.name}</label>
							<div/>
							<label>{value.value}</label>
							</li>
						)
					})
				}
			</ul>
		)
    };
}
