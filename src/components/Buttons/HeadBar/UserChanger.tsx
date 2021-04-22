import React from "react";
import { defaultUser, useAppContext } from "../../../utils/AppContext";
import { withRouter } from "react-router-dom";

export const UserChanger = withRouter(({ history }) => {
	const { dispatch } = useAppContext();
	const logOut = () => {
		dispatch({ type: "SET_USER", value: defaultUser });
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("user");
		history.push("/login");
	};
	return (
		<>
			<div onClick={logOut}>UserChanger</div>
		</>
	);
});
