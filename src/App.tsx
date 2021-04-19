import "./styles/index.scss";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Main } from "./components/Main";
import { useAppContext } from "./utils/AppContext";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { useEffect } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { NotFound } from "./components/NotFound";

export const App = () => {
	const { state, dispatch } = useAppContext();
	useEffect(() => {
		if (state.user.username === "") {
			const userData = localStorage.getItem("user");
			if (userData != null) {
				const user = JSON.parse(userData);
				dispatch({ type: "SET_USER", value: user });
				dispatch({ type: "LOGIN" });
			}
		}
	});
	console.log(state);
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
