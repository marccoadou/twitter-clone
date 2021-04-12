import React, { useEffect, useState } from "react";
import { Tweet } from "./Tweet";
import { gql, useQuery } from "@apollo/client";

const GET_TWEETS = gql`
	query {
		tweets {
			id
			text
			user {
				userHandle
			}
			likes
		}
	}
`;

export const TweetFeed = () => {
	const { loading, error, data } = useQuery(GET_TWEETS);
	if (loading) {
		return <>Loading</>;
	}
	if (error) {
		return <>{error}</>;
	}

	const tweet: TweetType = data.tweets[0];
	return (
		<>
			{data ? (
				<Tweet id={tweet.id} stats={tweet.stats} text={tweet.text} user={tweet.user} />
			) : null}
			{/* <Tweet />
			<Tweet />
			<Tweet />
			<Tweet /> */}
		</>
	);
};
