import React from "react";
import Header from "./Header";
import Menu from "./Menu";

export default class Layout extends React.Component {

	constructor(props){
		super(props);
		this.menus = [
			{label: "Overview", path: "/"},
			{label: "I Owe", path: "/i-owe"},
			{label: "Friend Owes", path: "/friend-owes"},
		];
	}
	
	render() {

		return (<div>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-3 col-md-2 sidebar"><Menu list={this.menus} selectedPath={this.props.selectedPath} /></div>
					<div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">{this.props.children}</div>
				</div>
			</div>
		</div>)
	}
}
