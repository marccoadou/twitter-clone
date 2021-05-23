import React from "react";
import { Link } from "react-router-dom";
import { House, Envelope, Search, Bell } from "react-bootstrap-icons";
interface Props {}
export const BottomMenu: React.FC<Props> = () => {
	return (
		<div className="bottom-menu">
			<Link to="/home">
				<House />
			</Link>
			<Link to="/search">
				<Search />
			</Link>
			<Link to="/notifications">
				<Bell />
			</Link>
			<Link to="/messages">
				<Envelope />
			</Link>
		</div>
	);
};
