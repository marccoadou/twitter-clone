import React from "react";
import { Tweet } from "./Tweet";
import { useQuery } from "@apollo/client";
import { useAppContext } from "../utils/AppContext";
import { GET_TWEETS } from "../utils/ApolloRequest";
export const ProfileFeed = () => {
	const { state } = useAppContext();

	const { loading, error, data } = useQuery(GET_TWEETS, {
		variables: { userHandle: state.user.userHandle },
	});
	if (loading) return <>Loading...</>;
	if (error) return <>{error.message}</>;

	console.log(data);
	return (
		<>
			{data.user.tweets.map((tweet: TweetType, index: number) => {
				return (
					<Tweet
						id={tweet.id}
						userHandle={tweet.userHandle}
						statistics={tweet.statistics}
						text={tweet.text}
						user={tweet.user}
						key={index}
					/>
				);
			})}
		</>
	);
};
