import React, { useEffect, useState } from "react";
import { Tweet } from "./Tweet";
import { gql, useQuery } from "@apollo/client";
import { useAppContext } from "../utils/AppContext";

const GET_TWEETS = gql`
	query getUser($userHandle: String!) {
		user(userHandle: $userHandle) {
			tweets {
				id
				text
				user {
					username
					userHandle
				}
				statistics {
					likes
					comments
					retweets
				}
			}
		}
	}
`;

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
