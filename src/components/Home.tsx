import React from "react";
import { USER_FEED } from "./lib/ApolloRequest";
import { useQuery } from "@apollo/client";
import { useAppContext } from "./lib/AppContext";
import { TweetFeed } from "./Tweet/TweetFeed";
import { Loader } from "./Spinner";
import { useWindowSize } from "./lib/hooks";
import { ContextBar } from "./Navigation/ContextBar";
import { BottomMenu } from "./Navigation/BottomMenu";
import { CreateTweetButton } from "./Buttons/Tweet/CreateTweetButton";
import { MobileMenu } from "./Navigation/MobileMenu";
import { Header } from "./Navigation/Header";

interface Props {}
export const Home: React.FC<Props> = () => {
	const { state } = useAppContext();
	const { data } = useQuery(USER_FEED, {
		variables: { following: state.user.following },
		// pollInterval: 3000,
	});
	const windowSize = useWindowSize();
	return (
		<div>
			{state.sideBar ? <MobileMenu /> : null}
			<ContextBar />
			{/* <Header /> */}
			{data?.userFeed ? <TweetFeed tweets={data?.userFeed} /> : <Loader />}
			<CreateTweetButton />
			<BottomMenu />
		</div>
	);
};
