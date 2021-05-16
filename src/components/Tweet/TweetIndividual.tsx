import { useQuery } from "@apollo/client";
import React from "react";
import { RouteComponentProps, useParams, withRouter } from "react-router";
import { GET_TWEET } from "../lib/ApolloRequest";
import { useAppContext } from "../lib/AppContext";
import { Loader } from "../Spinner";
import { Tweet } from "./Tweet";

type TweetParam = {
	id: string;
};

export const TweetIndividual = () => {
	const params = useParams<TweetParam>();
	const { state } = useAppContext();
	const { data, loading } = useQuery(GET_TWEET, {
		variables: { id: params?.id },
	});
	if (loading) {
		return (
			<div className="center-loader">
				<Loader />
			</div>
		);
	}
	console.log(data?.tweet);
	return (
		<>
			{data?.tweet && (
				<Tweet
					createdAt={data?.tweet.createdAt}
					id={data?.tweet.id}
					statistics={data?.tweet.statistics}
					text={data?.tweet.text}
					user={data?.tweet.user}
					userHandle={data?.tweet.userHandle}
				/>
			)}
		</>
	);
};
