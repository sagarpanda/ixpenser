import React from "react";
import { HashRouter as Router, Route } from 'react-router-dom';

import Overview from "./containers/Overview";
import IOwe from "./containers/IOwe";
import FriendOwes from "./containers/FriendOwes";

/*
 * OnClick: this.props.history.push('#/page');
 * 
 */
export default class AppRouter extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Overview} />
					<Route path="/i-owe" component={IOwe} />
					<Route path="/friend-owes" component={FriendOwes} />
				</div>
			</Router>
		)
	}
}