import React from "react";
import "../styles/contextbar.scss";
import { useAppContext } from "../utils/AppContext";

export const ContextBar = () => {
	const { state } = useAppContext();
	return (
		<div className="context-bar">
			<a href="_">
				<i className="fas fa-long-arrow-alt-left"></i>
			</a>
			<div className="profile-context">
				<h4>{state.user.userHandle}</h4>
				<small>{}0 Tweets</small>
			</div>
		</div>
	);
};
