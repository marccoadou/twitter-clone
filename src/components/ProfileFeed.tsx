import React, { useEffect } from "react";
import { Tweet } from "./Tweet";
import { useQuery } from "@apollo/client";
import { useAppContext } from "../utils/AppContext";
import { GET_TWEETS } from "../utils/ApolloRequest";
import { useRouteMatch } from "react-router";
import { Loader } from "./Spinner";

interface Props {
	user: UserType;
}

export const ProfileFeed: React.FC<Props> = ({ user }) => {
	const { state } = useAppContext();
	let { url } = useRouteMatch();
	const { loading, error, data, refetch } = useQuery(GET_TWEETS, {
		variables: { userHandle: user.userHandle },
	});

	useEffect(() => {
		refetch();
	}, [refetch, state.refreshFeed, url]);
	if (loading)
		return (
			<>
				<Loader />
			</>
		);
	if (error) return <>{error.message}</>;

	return (
		<>
			{data.user.tweets.map((tweet: TweetType, index: number) => {
				return (
					<Tweet
						id={tweet.id}
						userHandle={tweet.userHandle}
						statistics={tweet.statistics}
						text={tweet.text}
						user={tweet.user}
						key={index}
						createdAt={tweet.createdAt}
					/>
				);
			})}
		</>
	);
};
