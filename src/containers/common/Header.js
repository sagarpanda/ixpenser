/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

export default class Header extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			isShow: false
		}
		this.dropDownClickHandler = this.dropDownClickHandler.bind(this);
	}

	dropDownClickHandler(e){
		e.preventDefault();
		this.setState({isShow: !this.state.isShow});
	}

	render() {

		const dd = this.state.isShow ? 'show' : '';

		return (<nav className="navbar navbar-inverse navbar-fixed-top">
			<div className="container-fluid">
			  	<div className="navbar-header"><a className="navbar-brand" href="#">iXpenser</a></div>
			  	<div className="collapse navbar-collapse">
			  		<ul className="nav navbar-nav navbar-right">
			  			<li>

							<a onClick={this.dropDownClickHandler} href="#" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
							Sagar Panda <span className="caret"></span>
							</a>
							<ul className={"dropdown-menu "+dd} aria-labelledby="dropdownMenu1">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li role="separator" className="divider"></li>
								<li><a href="#">Separated link</a></li>
							</ul>

			  			</li>
			  		</ul>
			  	</div>
		  	</div>
		</nav>)
	}
}
