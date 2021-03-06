import "../../styles/create-tweet.scss";
import { useState } from "react";
import DefaultUserIcon from "../../img/default_profile_400x400.png";
import { Button } from "react-bootstrap";
import { useAppContext } from "../lib/AppContext";
import { useMutation } from "@apollo/client";
import { ADD_TWEET } from "../lib/ApolloRequest";
import { ArrowLeft } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { TweetForm } from "./TweetForm";

export const CreateTweet = () => {
	const history = useHistory();
	const { state } = useAppContext();
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
	};
	const handleTweetLength = (e: any) => {
		setTweetText(e.target.value);
		setTweetLength(e.target.value.length);
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
			<TweetForm
				DefaultUserIcon={DefaultUserIcon}
				handleTweetAdd={handleTweetAdd}
				handleTweetLength={handleTweetLength}
				tweetLength={tweetLength}
				tweetText={tweetText}
			/>
		</div>
	);
};
