import React from 'react'

export default class DropdownContainer extends React.Component {

	render() {
		let _this = this;
		return (
			<div>
				<div className="dropdown" id="file-dropdown">
		  			<button className="dropbtn">File</button>
			  			<div className="dropdown-content">
			    			<a onClick={_this.onClickNew}>New</a>
			    			<a href="#" onClick={_this.onClickOpen}>Open</a>
			    			<a href="#">Close</a>
			  			</div>
				</div>
				<div className="dropdown" id="edit-dropdown">
		  			<button className="dropbtn">Edit</button>
			  			<div className="dropdown-content">
			    			<a href="#">Undo</a>
			    			<a href="#">Redo</a>
			  			</div>
				</div>
				<div className="dropdown" id="view-dropdown">
		  			<button className="dropbtn">View</button>
			  			<div className="dropdown-content">
			    			<a href="#">Graph</a>
			    			<a href="#">Graph+Text</a>
			    			<a href="#">Text</a>
			  			</div>
				</div>
				<div className="dropdown" id="help-dropdown">
		  			<button className="dropbtn">Help</button>
			  			<div className="dropdown-content">
			    			<a href="#">Help</a>
			    			<a href="#">About WebSMV</a>
			  			</div>
				</div>
			</div>
		);
	}

	onClickNew() {

    }

	onClickOpen() {

    }

	onClickClose() {

    }

	onClickUndo() {

    }

	onClickRedo() {

    }

	onClickGraph() {

    }

	onClickGraphText() {

    }

	onClickText() {

    }
}