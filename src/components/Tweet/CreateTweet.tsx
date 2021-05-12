import "../../styles/create-tweet.scss";
import React, { useState } from "react";
import DefaultUserIcon from "../../img/default_profile_400x400.png";
import { Button, Form, Image } from "react-bootstrap";
import { useAppContext } from "../lib/AppContext";
import { useMutation } from "@apollo/client";
import { ADD_TWEET } from "../lib/ApolloRequest";
import { ArrowLeft } from "react-bootstrap-icons";
import { withRouter } from "react-router";

export const CreateTweet = withRouter(({ history }) => {
	const { state, dispatch } = useAppContext();
	const [tweetText, setTweetText] = useState("");
	const [tweetLength, setTweetLength] = useState(0);
	const [addTweet] = useMutation<TweetType>(ADD_TWEET);

	const handleTweetAdd = (e: any) => {
		e.preventDefault();
		addTweet({
			variables: {
				text: tweetText,
				userHandle: state.user.userHandle,
			},
		});
		setTweetText("");
		setTweetLength(0);
		dispatch({ type: "TWEET_CLOSE" });
		dispatch({ type: "REFRESH_FEED_TOGGLE" });
	};
	const handleTweetLength = (e: any) => {
		setTweetText(e.target.value);
		setTweetLength(e.target.value.length);
	};

	const closeTweet = () => {
		dispatch({ type: "TWEET_CLOSE" });
	};

	return (
		<div className="container">
			<ArrowLeft
				width="1.5em"
				height="1.5em"
				onClick={() => {
					history.goBack();
				}}
			/>
			<Button
				variant="primary"
				type="submit"
				className="submit-button"
				disabled={tweetLength > 0 ? false : true}>
				Tweet
			</Button>
			<div className="divider-h"></div>
			<div className="create-tweet">
				<Image
					width={40}
					height={40}
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
								backgroundColor: "rgb(0, 0, 0)",
								border: "none",
								color: "white",
								resize: "none",
								width: "100%",
							}}
							maxLength={280}
							value={tweetText}
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
				</Form>
			</div>
		</div>
	);
});
