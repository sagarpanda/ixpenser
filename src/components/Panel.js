import React from "react";

export default class Panel extends React.Component {

	render() {

		var title = this.props.title ? this.props.title : '';
		var className = this.props.className ? this.props.className : 'panel-default';

		return (<div className={"panel " + className} style={this.props.style}>
			<div className="panel-heading">
				<h3 className="panel-title">{title}</h3>
			</div>
			<div className="panel-body">{this.props.children}</div>
		</div>)
	}
}
