import React from 'react'

export class Dropdown extends React.Component {
	
	// constructor() {
	// 	super()
	// 	this.onButtonClick = this.onButtonClick.bind(this)
	// }

	// static propTypes = {

	// }

	// onButtonClick(e) {
	// 	this.props.toggleActive(e.target.id.toLowerCase())
	// }

	render() {
		let _this = this
		return (
			<div class="dropdown">
		  		<button class="dropbtn">Dropdown</button>
			  		<div class="dropdown-content">
			    		<a href="#">Link 1</a>
			    		<a href="#">Link 2</a>
			    		<a href="#">Link 3</a>
			  		</div>
			</div>);
	}
}
