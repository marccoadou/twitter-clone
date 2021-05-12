import React from "react";
import { withRouter } from "react-router";
import "../../styles/contextbar.scss";
import { ArrowLeft } from "react-bootstrap-icons";
import { StateUserPicture } from "../Profile/StateUserPicture";
import { useAppContext } from "../lib/AppContext";

export const ContextBar = withRouter(({ location, history }) => {
	const { dispatch } = useAppContext();
	const onClick = () => {
		history.goBack();
	};
	const openMenu = () => {
		dispatch({ type: "SIDEBAR_OPEN" });
	};
	return (
		<div className="context-bar">
			{location.pathname.includes("home") ? (
				<div onClick={openMenu}>
					<StateUserPicture width={40} height={40} className="user-img" />
				</div>
			) : (
				<a onClick={onClick}>
					<ArrowLeft width="1.3rem" height="auto" />
				</a>
			)}
			<div className="profile-context">
				<h4 className="capitalize-first">{location.pathname.slice(1)}</h4>
			</div>
		</div>
	);
});
