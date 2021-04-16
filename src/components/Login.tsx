import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { useAppContext } from "../utils/AppContext";
import { CHECK_USER } from "../utils/ApolloRequest";

export const Login = () => {
	const { dispatch } = useAppContext();

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
		}
		if (data && data.checkUser.error.length > 0) {
			setError(data.checkUser.error);
		}
	}, [data, dispatch]);
	console.log(error);
	return (
		<div className="login-navbar">
			<Form onSubmit={handleSignIn}>
				<Form.Group controlId="formBasicEmail">
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};
