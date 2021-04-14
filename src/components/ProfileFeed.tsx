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
	if (loading) {
		return <>Loading</>;
	}
	if (error) {
		return <></>;
	}

	const tweets: [TweetType] = data.user.tweets;
	console.log(tweets);
	return (
		<>
			{tweets ? (
				tweets.map((tweet: any, index: any) => {
					console.log(tweet);
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
				})
			) : (
				<p>nothing?</p>
			)}
		</>
	);
};
