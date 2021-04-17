import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { useAppContext } from "../utils/AppContext";
import { CHECK_USER } from "../utils/ApolloRequest";
import { Link, RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps<any> {}

export const Login: React.FunctionComponent<IProps> = (props) => {
	const { state, dispatch } = useAppContext();
	const [error, setError] = useState("");
	const [checkUser, { data }] = useLazyQuery(CHECK_USER);

	const handleSignIn = (e: any) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		checkUser({ variables: { email, password } });
	};

	useEffect(() => {
		if (data && data.checkUser.isValidLogin !== false) {
			dispatch({ type: "SET_USER", value: data.checkUser.user });
			dispatch({ type: "LOGIN" });
			localStorage.setItem("user", JSON.stringify(data.checkUser.user));
			props.history.push("/home");
		}
		if (data && data.checkUser.error.length > 0) {
			setError(data.checkUser.error);
		}
	}, [data, dispatch, props.history, state.isLoggedIn]);

	return (
		<div className="login-navbar">
			<h2>Login</h2>
			<Form onSubmit={handleSignIn}>
				<Form.Group controlId="formBasicEmail">
					<Form.Control type="email" placeholder="Email" />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
				{error ? <p>{error}</p> : null}
			</Form>

			<Link to="/signup">Don't have an account,sign up here</Link>
		</div>
	);
};
