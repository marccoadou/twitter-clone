import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute: React.FC<{
	component: React.FC;
	path: string;
	exact: boolean;
	redirectPath: string;
}> = (props) => {
	const condition = Boolean(localStorage.getItem("user"));

	return condition ? (
		<Route path={props.path} exact={props.exact} component={props.component} />
	) : (
		<Redirect to={props.redirectPath} />
	);
};
