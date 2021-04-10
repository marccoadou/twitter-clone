import React from "react";
import { Profile } from "./Profile";
import { TweetFeed } from "./TweetFeed";
import { ContextBar } from "./ContextBar";
// import { CreateTweet } from "./CreateTweet";

export const Main = () => {
	return (
		<>
			<ContextBar />
			<Profile />
			<TweetFeed />
			{/* <CreateTweet /> */}
		</>
	);
};
