import React from "react";
import "../../styles/tweet.scss";
import { RouteComponentProps, withRouter } from "react-router";
import { CreateTweet } from "./CreateTweet";
import { TweetIndividual } from "./TweetIndividual";

interface Props extends RouteComponentProps {}
export const TweetReply = withRouter(({ location }) => {
	return (
		<div className="tweet-reply">
			<TweetIndividual />
			<CreateTweet />
		</div>
	);
});
