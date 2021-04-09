import React from "react";
import { Profile } from "./Profile";
import { TweetFeed } from "./TweetFeed";
import { ContextBar } from "./ContextBar";

export const Main = () => {
	return (
		<>
			<ContextBar />
			<Profile />
			<TweetFeed />
		</>
	);
};
