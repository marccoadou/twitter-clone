import React from "react";
import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "../styles/connect.scss";
import { gql, useMutation } from "@apollo/client";

const ADD_USER = gql`
	mutation addUser($email: String!, $password: String!, $username: String!) {
		addUser(input: { email: $email, password: $password, username: $username }) {
			email
			password
			username
		}
	}
`;

export const Connect = () => {
	// sEmailValidator.validate("testmail.com"); // true
	const [addUser, { data }] = useMutation(ADD_USER);
	const handleSignUp = (e: any) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		const username = e.target[2].value;
		console.log("ehllo");
		const response = addUser({ variables: { email, password, username } });
		console.log(response);
	};

	return (
		<div className="connect">
			<Form onSubmit={handleSignUp}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control type="username" placeholder="Enter username" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};
