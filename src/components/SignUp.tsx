import { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "../styles/connect.scss";
import { useMutation } from "@apollo/client";
import * as EmailValidator from "email-validator";

import { ADD_USER } from "../utils/ApolloRequest";

export const SignUp = () => {
	const [addUser] = useMutation<UserType>(ADD_USER);
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

	return (
		<div className="connect">
			<Form onSubmit={handleSignUp}>
				<Form.Group controlId="formBasicFullName">
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						type="userHandle"
						placeholder="Enter your full name"
						value={username}
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
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};
