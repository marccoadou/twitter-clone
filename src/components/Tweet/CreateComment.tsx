import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { useHistory, useParams } from "react-router";
import { ADD_COMMENT } from "../lib/ApolloRequest";
import DefaultUserIcon from "../../img/default_profile_400x400.png";
import { useAppContext } from "../lib/AppContext";
import { TweetForm } from "./TweetForm";

interface ParamsProps {
	id: string;
}

export const CreateComment = () => {
	const history = useHistory();
	const { id } = useParams<ParamsProps>();
	const { state } = useAppContext();
	const [tweetText, setTweetText] = useState("");
	const [tweetLength, setTweetLength] = useState(0);
	const [addComment] = useMutation<TweetType>(ADD_COMMENT);

	function handleCommentAdd(e: any) {
		e.preventDefault();
		console.log("we're here");
		addComment({
			variables: {
				text: tweetText,
				userHandle: state.user.userHandle,
				tweetID: id,
			},
		});
		setTweetText("");
		setTweetLength(0);
	}
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
			<TweetForm
				DefaultUserIcon={DefaultUserIcon}
				handleTweetAdd={handleCommentAdd}
				handleTweetLength={handleTweetLength}
				tweetLength={tweetLength}
				tweetText={tweetText}
			/>
		</div>
	);
};
