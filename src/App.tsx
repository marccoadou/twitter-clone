import "./styles/index.scss";
import "./styles/buttons.scss";
import "./styles/main.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Profile } from "./components/Profile/Profile";
import { useAppContext } from "./components/lib/AppContext";
import { Login } from "./components/Authentification/Login";
import { SignUp } from "./components/Authentification/SignUp";
import React, { useEffect } from "react";
import { PrivateRoute } from "./components/Routing/PrivateRoute";
import { NotFound } from "./components/lib/NotFound";
import { GET_USER_INFO } from "./components/lib/ApolloRequest";
import { useLazyQuery } from "@apollo/client";
import { Home } from "./components/Home";
import { AdditionalContent } from "./components/RecommendedContent/AdditionalContent";
import { Header } from "./components/Navigation/Header";
import { CreateTweet } from "./components/Tweet/CreateTweet";

export const App = () => {
	const [getInfo, { data }] = useLazyQuery(GET_USER_INFO, { fetchPolicy: "no-cache" });
	const { state, dispatch } = useAppContext();
	useEffect(() => {
		if (state.user.username === "") {
			const userData = localStorage.getItem("user");
			if (userData != null) {
				const storedUser = JSON.parse(userData);
				getInfo({ variables: { userHandle: storedUser.userHandle } });
			}
		}
	}, [getInfo, state.user.username]);

	useEffect(() => {
		if (data?.user) {
			dispatch({ type: "SET_USER", value: data.user });
			dispatch({ type: "LOGIN" });
		}
	}, [data?.user, dispatch, getInfo]);

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Redirect to="/home" />
				</Route>
				<PrivateRoute component={Profile} exact={true} path="/profile/:id" redirectPath="/login" />
				<Route path="/login" exact component={Login} />
				<Route path="/signup" exact component={SignUp} />
				<PrivateRoute path="/home" exact={true} component={Home} redirectPath="/login" />
				<Route path="/compose/tweet" exact={true} component={CreateTweet} />
				<Route path="/" component={NotFound} />
			</Switch>
		</Router>
	);
};
