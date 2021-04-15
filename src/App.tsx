/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "./styles/index.scss";
import React from "react";
import { Col } from "react-bootstrap";
import { AdditionalContent } from "./components/AdditionalContent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Main } from "./components/Main";
import { useAppContext } from "./utils/AppContext";
import { Connect } from "./components/Connect";
import { CreateTweet } from "./components/CreateTweet";

export const App = () => {
	const { state, dispatch } = useAppContext();

	if (state.user.username === "") {
		const userData = localStorage.getItem("user");
		if (userData != null) {
			const user = JSON.parse(userData);
			dispatch({ type: "SET_USER", value: user });
			dispatch({ type: "LOGIN" });
		}
	}

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					{state.isLoggedIn ? <Main /> : <Connect />}
					{state.isCreatingTweet ? <CreateTweet /> : null}
				</Route>
			</Switch>
		</Router>
	);
};
