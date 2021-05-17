import React from "react";
import "../../styles/tweet.scss";
import { RouteComponentProps, withRouter } from "react-router";
import { TweetIndividual } from "./TweetIndividual";
import { CreateComment } from "./CreateComment";

interface Props extends RouteComponentProps {}
export const TweetReply = withRouter(({ location }) => {
	return (
		<div className="tweet-reply">
			<TweetIndividual />
			<CreateComment />
		</div>
	);
});
