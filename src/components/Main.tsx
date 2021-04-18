import "../styles/main.scss";
import React from "react";
import { Profile } from "./Profile";
import { ProfileFeed } from "./ProfileFeed";
import { ContextBar } from "./ContextBar";
import { Header } from "./Header";
import { AdditionalContent } from "./AdditionalContent";
import { CreateTweet } from "./CreateTweet";
import { useAppContext } from "../utils/AppContext";
import { useParams } from "react-router";

export const Main: React.FC = () => {
	const { state } = useAppContext();
	let { id } = useParams<{ id: string }>();
	return (
		<div className="main-columns">
			{id}
			<div>
				<Header />
			</div>
			<div>
				<ContextBar />
				<Profile />
				<ProfileFeed />
			</div>
			<div>
				<AdditionalContent />
			</div>
			{state.isCreatingTweet ? <CreateTweet /> : null}
		</div>
	);
};
