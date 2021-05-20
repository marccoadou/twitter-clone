import { useQuery, useLazyQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { TWEETS_ID_LIST } from "../lib/ApolloRequest";
import { BottomMenu } from "../Navigation/BottomMenu";
import { ContextBar } from "../Navigation/ContextBar";
import { Loader } from "../Spinner";
import { Tweet } from "./Tweet";
import { TweetIndividual } from "./TweetIndividual";

type TweetParam = {
	id: string;
};

export const TweetThread = () => {
	const params = useParams<TweetParam>();
	const { data, loading } = useQuery(TWEETS_ID_LIST, {
		variables: { id: params?.id },
	});
	if (loading) {
		return (
			<div className="center-loader">
				<Loader />
			</div>
		);
	}

	console.log(data);
	return (
		<>
			<div className="tweet-vertical">
				<ContextBar />
				<TweetIndividual />
				<div>
					{data?.tweetsByIDList &&
						data?.tweetsByIDList.map((tweet: TweetType, index: number) => (
							<Tweet
								createdAt={tweet.createdAt}
								id={tweet.id}
								statistics={tweet.statistics}
								text={tweet.text}
								user={tweet.user}
								userHandle={tweet.userHandle}
								key={index}
							/>
						))}
				</div>
				<BottomMenu />
			</div>
		</>
	);
};
