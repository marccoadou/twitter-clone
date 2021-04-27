import "../styles/main.scss";
import React from "react";
import { Profile } from "./Profile/Profile";
import { ProfileFeed } from "./Profile/ProfileFeed";
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

	const { data, error, loading } = useQuery(GET_USER_INFO, {
		variables: { userHandle: url.slice(9) },
	});
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
