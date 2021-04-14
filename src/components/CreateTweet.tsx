import React, { useState } from "react";
import DefaultUserIcon from "../img/default_profile_400x400.png";
import { Button, Form, Image } from "react-bootstrap";
import "../styles/create-tweet.scss";
import { useAppContext } from "../utils/AppContext";

export const CreateTweet = () => {
	const { dispatch } = useAppContext();
	const [tweetLength, setTweetLength] = useState(0);
	const handleTweetAdd = (e: any) => {
		e.preventDefault();
		e.target[0].value = "";
	};
	const handleTweetLength = (e: any) => {
		setTweetLength(e.target.value.length);
	};

	return (
		<div className="fullscreen">
			<div className="create-tweet-container">
				<div className="create-tweet-border">
					<div
						className="close-create-tweet"
						onClick={() => {
							dispatch({ type: "TWEET_CLOSE" });
						}}>
						<i className="fas fa-times"></i>
					</div>
					<div className="divider-h"></div>
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
									style={{
										backgroundColor: "rgb(21, 32, 43)",
										border: "none",
										color: "white",
										resize: "none",
										height: "8vw",
									}}
									maxLength={280}
									onChange={handleTweetLength}
									placeholder="What's popping?"
								/>
							</Form.Group>
							<div className="divider-h"></div>
							<div className="optional-icons">
								<a href="_">
									<i className="fas fa-image"></i>
								</a>
								<a href="_">
									<i className="fas fa-poll-h"></i>
								</a>
								<a href="_">
									<i className="far fa-laugh-beam"></i>
								</a>
								<p>{tweetLength} / 280</p>
							</div>
							<Button variant="primary" type="submit" className="submit-button">
								Tweet
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
};
