import React from "react";
import { Profile } from "./Profile";
import { ProfileFeed } from "./ProfileFeed";
import { ContextBar } from "./ContextBar";
// import { CreateTweet } from "./CreateTweet";

export const Main = () => {
	return (
		<>
			<ContextBar />
			<Profile />
			<ProfileFeed />
			{/* <CreateTweet /> */}
		</>
	);
};
