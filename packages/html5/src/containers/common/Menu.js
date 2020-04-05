import React from "react";
import { Link } from 'react-router-dom';

export default class Header extends React.Component {

	createList(list){
		const self = this;
		const li = list.map(function(item, index){
			const active = (self.props.selectedPath === item.path) ? 'active' : '';
			return (<li className={active} key={index}><Link to={item.path}>{item.label}</Link></li>)
		});
		return li;
	}

	render() {
		const list = this.createList(this.props.list);
		return (<ul className="nav nav-sidebar">{list}</ul>)
	}
}
