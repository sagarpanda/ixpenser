import React from "react";
import Panel from "./../components/Panel";
import Layout from "./common/Layout";

import { connect } from "react-redux";
import { fetchUser } from "../actions/userActions";

class Overview extends React.Component {

	componentWillMount() {
		this.props.dispatch(fetchUser());
	}

	render() {

		var name = this.props.user ? this.props.user.name : '';

		return (<Layout selectedPath={this.props.match.path}>
			<Panel title="Overview" style={{marginTop: '20px'}}>{name}</Panel>
		</Layout>)
	}
}

function mapStateToProps(store) {
  return {
    user: store.user.user
  };
}

export default connect(mapStateToProps)(Overview);