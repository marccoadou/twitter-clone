import React from "react";
import { defaultUser, useAppContext } from "../../lib/AppContext";
import { withRouter } from "react-router-dom";
import { DropDown } from "../DropDown/Dropdown";
import { DropdownItem } from "../DropDown/DropdownItem";
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
			<DropDown title="User Changer">
				<DropdownItem>
					<p>Hello World</p>
				</DropdownItem>
				<DropdownItem>
					<div className="cursorpointer" onClick={logOut}>
						LogOut
					</div>
				</DropdownItem>
			</DropDown>
		</>
	);
});
