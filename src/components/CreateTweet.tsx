import React from "react";
import DefaultUserIcon from "../img/default_profile_400x400.png";
import { Button, Form, Image } from "react-bootstrap";
import "../styles/create-tweet.scss";

export const CreateTweet = () => {
	const handleTweetAdd = (e: any) => {
		e.preventDefault();
		console.log(e.target[0].value);
		e.target[0].value = "";
	};

	return (
		<div className="create-tweet">
			<Image
				width={48}
				height={48}
				className="mr-3"
				src={DefaultUserIcon}
				alt="Generic placeholder"
				roundedCircle
			/>
			<Form name="addTweet" className="input-form" onSubmit={handleTweetAdd}>
				<Form.Group controlId="exampleForm.ControlTextarea1">
					<Form.Control
						as="textarea"
						name="tweet"
						rows={4}
						style={{ backgroundColor: "#000000", border: "none", color: "white" }}
						placeholder="What's popping?"
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Tweet
				</Button>
			</Form>
		</div>
	);
};
