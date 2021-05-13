import { useQuery } from "@apollo/client";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { GET_TWEET } from "../lib/ApolloRequest";
import { useAppContext } from "../lib/AppContext";
import { Tweet } from "./Tweet";

export const TweetIndividual = withRouter(({ location }) => {
	const { state } = useAppContext();
	const { data } = useQuery(GET_TWEET, {
		variables: { id: location.pathname.slice(7) },
	});
	console.log(data?.tweet);
	return (
		<>
			{data?.tweet && (
				<Tweet
					createdAt={data?.createdAt}
					id={data?.id}
					statistics={data?.statistics}
					text={data?.text}
					userHandle={data?.userHandle}></Tweet>
			)}
		</>
	);
});
