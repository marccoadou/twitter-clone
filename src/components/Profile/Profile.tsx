import React, { useEffect } from "react";
import { UserProfile } from "./UserProfile";
import { TweetFeed } from "../Tweet/TweetFeed";
import { ContextBar } from "../Navigation/ContextBar";
import { useAppContext } from "../lib/AppContext";
import { useRouteMatch } from "react-router";
import { GET_USER_INFO } from "../lib/ApolloRequest";
import { useQuery } from "@apollo/client";
import { Loader } from "../Spinner";

export const Profile: React.FC = () => {
	const { state } = useAppContext();
	let { url } = useRouteMatch();

	const { data, error, refetch } = useQuery(GET_USER_INFO, {
		variables: { userHandle: url.slice(9) },
		// pollInterval: 5000,
	});
	useEffect(() => {
		refetch();
	}, [refetch, state.refreshFeed, url]);

	if (error) return <div>{error.message}</div>;
	return (
		<div>
			{data?.user ? (
				<div>
					<ContextBar />
					<UserProfile user={data?.user} />
					<TweetFeed tweets={data?.user.tweets} />
				</div>
			) : (
				<div className="center-loader">
					<Loader />
				</div>
			)}
		</div>
	);
};
