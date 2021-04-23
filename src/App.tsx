import "./styles/index.scss";
import "./styles/buttons.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Main } from "./components/Main";
import { useAppContext } from "./utils/AppContext";
import { Login } from "./components/Authentification/Login";
import { SignUp } from "./components/Authentification/SignUp";
import { useEffect } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { NotFound } from "./components/404/NotFound";
import { GET_USER_INFO } from "./utils/ApolloRequest";
import { useLazyQuery } from "@apollo/client";

export const App = () => {
	const [getInfo, { data }] = useLazyQuery(GET_USER_INFO);
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
			console.log(data.user);
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
				<PrivateRoute component={Main} exact={true} path="/profile/:id" redirectPath="/login" />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/login" exact component={Login} />
				<Route path="/" component={NotFound} />
			</Switch>
		</Router>
	);
};
