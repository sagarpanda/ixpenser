import React from "react";
import Panel from "./../components/Panel";
import Layout from "./common/Layout"

import { connect } from "react-redux";
import { fetchUser } from "../actions/userActions";

class IOwe extends React.Component {

	componentWillMount() { window.dd = this;
		this.props.dispatch(fetchUser())
	}

	render() {

		var name = this.props.user ? this.props.user.name : '';

		return (<Layout selectedPath={this.props.match.path}>
			<Panel title="I Owe" style={{marginTop: '20px'}}>{name}</Panel>
		</Layout>)
	}
}

function mapStateToProps(store) {
  return {
    user: store.user.user
  };
}

export default connect(mapStateToProps)(IOwe);
