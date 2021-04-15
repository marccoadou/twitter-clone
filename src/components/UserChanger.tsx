import React from "react";
import { defaultUser, useAppContext } from "../utils/AppContext";

export const UserChanger = () => {
	const { dispatch } = useAppContext();
	const logOut = () => {
		dispatch({ type: "SET_USER", value: defaultUser });
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("user");
	};
	return (
		<>
			<div onClick={logOut}>UserChanger</div>
		</>
	);
};
