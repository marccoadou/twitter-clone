import React from "react";
import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "../styles/connect.scss";
import { gql, useMutation } from "@apollo/client";

// mutation addUser(
//   $credentials: CredentialsInput!
//   $fullName: String!
//   $userHandle: String!
//   $userStats: UserStatsInput!
// ) {
//   addUser(
//     credentials: $credentials
//     fullName: $fullName
//     userHandle: $userHandle
//     userStats: $userStats
//   ) {
//     credentials {
//       email
//       password
//     }
//     fullName
//     userHandle
//     userStats {
//       totalLikes
//       totalRetweets
//       totalComments
//     }
//   }
// }

/**
 * 
{
    "credentials": {
      "email": "pouetpouet@gmail.com",
      "password": "hehhehee"
    },
    "fullName": "George de la jungle",
    "userHandle": "this is oof",
    "userStats": {
      "totalLikes": 0,
      "totalRetweets": 0,
      "totalComments": 0
    }
}
 */

const ADD_USER = gql`
	mutation addUser($fullName:String!, $email: String!, $password: String!, $userHandle: String!) {
		addUser(input: { {email: $email, password: $password}, $fullName: String!, userHandle: $userHandle }) {
			credentials {
				email
				password
			}
			fullName
			userHandle
		}
	}
`;

export const Connect = () => {
	// EmailValidator.validate("testmail.com"); // true
	const [addUser, { data }] = useMutation(ADD_USER);
	const handleSignUp = (e: any) => {
		e.preventDefault();
		const email: string = e.target[0].value;
		const password: string = e.target[1].value;
		const fullName: string = e.target[2].value;
		const userHandle: string = e.target[3].value;
		console.log("hello");
		const response = addUser({ variables: { fullName, email, password, userHandle } });
		console.log(response);
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
