import React from "react";
import { USER_FEED } from "./../components/UtilsComponent/ApolloRequest";
import { useQuery } from "@apollo/client";
import { useAppContext } from "./UtilsComponent/AppContext";
import { TweetFeed } from "./Tweet/TweetFeed";
import { Loader } from "./Spinner";

interface Props {}
export const Home: React.FC<Props> = () => {
	const { state } = useAppContext();
	const { data } = useQuery(USER_FEED, {
		variables: { following: state.user.following },
		pollInterval: 3000,
	});

	return <div>{data?.userFeed ? <TweetFeed tweets={data?.userFeed} /> : <Loader />}</div>;
};
