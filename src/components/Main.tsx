import "../styles/main.scss";
import React, { useEffect } from "react";
import { Profile } from "./Profile/Profile";
import { TweetFeed } from "./Tweet/TweetFeed";
import { ContextBar } from "./Navigation/ContextBar";
import { Header } from "./Navigation/Header";
import { AdditionalContent } from "./RecommendedContent/AdditionalContent";
import { CreateTweet } from "./Tweet/CreateTweet";
import { useAppContext } from "./UtilsComponent/AppContext";
import { useRouteMatch } from "react-router";
import { GET_USER_INFO } from "./UtilsComponent/ApolloRequest";
import { useQuery } from "@apollo/client";
import { Loader } from "./Spinner";

export const Main: React.FC = () => {
	const { state } = useAppContext();
	let { url } = useRouteMatch();

	const { data, error, refetch } = useQuery(GET_USER_INFO, {
		variables: { userHandle: url.slice(9) },
	});
	useEffect(() => {
		refetch();
	}, [refetch, state.refreshFeed, url]);

	if (error) return <div>{error.message}</div>;
	return (
		<div className="main-columns">
			<div>
				<Header />
			</div>
			{data?.user ? (
				<div>
					<ContextBar user={data?.user} />
					<Profile user={data?.user} />
					<TweetFeed tweets={data?.user.tweets} />
				</div>
			) : (
				<div className="center-loader">
					<Loader />
				</div>
			)}
			<div>
				<AdditionalContent />
			</div>
			{state.isCreatingTweet ? <CreateTweet /> : null}
		</div>
	);
};
