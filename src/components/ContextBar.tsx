import React from "react";
import "../styles/contextbar.scss";

export const ContextBar = () => {
	return (
		<div className="top-profile">
			<a href="_">
				<i className="fas fa-long-arrow-alt-left"></i>
			</a>
			<div className="profile-context">
				<h4>profile name</h4>
				<small>number of tweets</small>
			</div>
		</div>
	);
};
