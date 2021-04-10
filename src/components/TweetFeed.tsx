import React, { useEffect, useState } from "react";
import { Tweet } from "./Tweet";
import { gql, useQuery } from "@apollo/client";

const GET_TWEETS = gql`
	query {
		tweets {
			id
			text
			user {
				id
				screenName
				statusesCount
			}
			userId
			likes
		}
	}
`;

export const TweetFeed = () => {
	const { loading, error, data } = useQuery(GET_TWEETS);

	return (
		<>
			<p>hello</p>

			{data ? <Tweet props={data.tweets[0]} /> : null}
			{/* <Tweet />
			<Tweet />
			<Tweet />
			<Tweet /> */}
		</>
	);
};
