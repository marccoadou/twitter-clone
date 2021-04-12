import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "../styles/connect.scss";
import { gql, useMutation } from "@apollo/client";
import * as EmailValidator from "email-validator";
var passwordHash = require("password-hash");

const ADD_USER = gql`
	mutation addUser(
		$credentials: CredentialsInput!
		$username: String!
		$userHandle: String!
		$userStats: UserStatsInput!
	) {
		addUser(
			credentials: $credentials
			username: $username
			userHandle: $userHandle
			userStats: $userStats
		) {
			credentials {
				email
				password
			}
			username
			userHandle
			userStats {
				totalLikes
				totalRetweets
				totalComments
			}
		}
	}
`;

export const SignUp = () => {
	// EmailValidator.validate("testmail.com"); // true
	const [addUser, { data, error }] = useMutation<UserType>(ADD_USER);
	const handleSignUp = (e: any) => {
		e.preventDefault();
		if (EmailValidator.validate(e.target[2].value)) {
			const hashedPassword = passwordHash.generate(e.target[3].value);
			const newUser: UserType = {
				credentials: {
					email: e.target[2].value,
					password: hashedPassword,
				},
				username: e.target[1].value,
				userHandle: e.target[0].value,
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

	return (
		<div className="connect">
			<Form onSubmit={handleSignUp}>
				<Form.Group controlId="formBasicFullName">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="userHandle" placeholder="Enter your full name" />
				</Form.Group>
				<Form.Group controlId="formBasicUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control type="userHandle" placeholder="Enter username" />
				</Form.Group>
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
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	);
};
