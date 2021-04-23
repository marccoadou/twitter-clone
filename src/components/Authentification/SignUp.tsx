import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "../../styles/connect.scss";
import { useMutation } from "@apollo/client";
import * as EmailValidator from "email-validator";

import { ADD_USER } from "../../utils/ApolloRequest";

export const SignUp = withRouter(({ history }) => {
	const [addUser, { data }] = useMutation(ADD_USER);
	const [username, setUsername] = useState("");
	const [userHandle, setUserHandle] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleSignUp = (e: any) => {
		e.preventDefault();
		if (EmailValidator.validate(email)) {
			const newUser: UserType = {
				credentials: {
					email: email,
					password: password,
				},
				username: username,
				userHandle: userHandle,
				userStats: {
					totalLikes: 0,
					totalComments: 0,
					totalRetweets: 0,
				},
				following: [""],
			};
			addUser({
				variables: {
					credentials: newUser.credentials,
					username: newUser.username,
					userHandle: newUser.userHandle,
					userStats: newUser.userStats,
				},
			});
		}
	};

	// console.log(
	// 	`username: ${username}\nemail: ${email}\nuserHandle: ${userHandle}\npassword: ${password}`
	// );
	useEffect(() => {
		if (data?.addUser.credentials?.email) {
			history.push("/login");
		}
	}, [data, email, history]);
	return (
		<div className="connect">
			<h2>Sign up for an account</h2>
			<Form onSubmit={handleSignUp}>
				<Form.Group controlId="formBasicFullName">
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						type="userHandle"
						placeholder="Enter your full name"
						value={username}
						required
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
				</Form.Group>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="userHandle"
						placeholder="Enter username"
						value={userHandle}
						required
						onChange={(e) => {
							setUserHandle(e.target.value.split(" ").join(""));
						}}
					/>
					<Form.Text className="text-muted">No spaces or special characters</Form.Text>
				</Form.Group>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						value={email}
						required
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						value={password}
						required
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<Link to="/login">If you already have an account, click here</Link>
		</div>
	);
});
