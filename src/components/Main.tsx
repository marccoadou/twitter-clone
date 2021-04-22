import "../styles/main.scss";
import React, { useEffect } from "react";
import { Profile } from "./Profile";
import { ProfileFeed } from "./ProfileFeed";
import { ContextBar } from "./Navigation/ContextBar";
import { Header } from "./Navigation/Header";
import { AdditionalContent } from "./AdditionalContent";
import { CreateTweet } from "./CreateTweet";
import { useAppContext } from "../utils/AppContext";
import { useRouteMatch } from "react-router";
import { GET_USER_INFO } from "../utils/ApolloRequest";
import { useQuery } from "@apollo/client";
import { Loader } from "./Spinner";

export const Main: React.FC = () => {
	const { state } = useAppContext();
	let { url } = useRouteMatch();

	const { data, error, loading, refetch } = useQuery(GET_USER_INFO, {
		variables: { userHandle: url.slice(9) },
	});
	useEffect(() => {
		refetch();
	}, [refetch, url]);
	if (loading)
		return (
			<div className="center-loader">
				<Loader />
			</div>
		);
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
					<ProfileFeed user={data?.user} />
				</div>
			) : (
				<Loader />
			)}
			<div>
				<AdditionalContent />
			</div>
			{state.isCreatingTweet ? <CreateTweet /> : null}
		</div>
	);
};
