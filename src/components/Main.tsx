import React from "react";
import { Profile } from "./Profile";
import { ProfileFeed } from "./ProfileFeed";
import { ContextBar } from "./ContextBar";
export const Main = () => {
	return (
		<>
			<ContextBar />
			<Profile />
			<ProfileFeed />
		</>
	);
};
