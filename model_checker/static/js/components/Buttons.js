import React from 'react'

export class Buttons extends React.Component {

	constructor(props) {
		super(props);
		this.onButtonClick = this.onButtonClick.bind(this);
	}

	static propTypes = {
        active: React.PropTypes.string.isRequired,
        callback: React.PropTypes.func.isRequired
	};

	onButtonClick(e) {
		this.props.callback(e.target.value);
	}

	render() {
		let _this = this;
		let active;
		if (_this.props.active == 'sim') {
		    active = ['button-list-item-active', 'button-list-item-inactive'];
        } else if (_this.props.active == 'tl') {
		    active = ['button-list-item-inactive', 'button-list-item-active'];
        }

		return (
			<ul className="button-list">
                <li key="sim" className="button-list-item">
                    <button value="sim" className={active[0]} onClick={_this.onButtonClick}>
                    Simulate
                    </button>
                </li>
                <li key="tl" className="button-list-item">
                    <button value="tl" className={active[1]} onClick={_this.onButtonClick}>
                    Verify
                    </button>
                </li>
			</ul>
        );
	}
}
