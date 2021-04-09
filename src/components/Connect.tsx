import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/connect.scss";

export const Connect = () => {
	return (
		<div className="connect">
			<Link to="/home">
				<Button variant="primary">Connect</Button>
			</Link>
		</div>
	);
};
