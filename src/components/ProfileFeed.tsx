import React, { useEffect } from "react";
import { Tweet } from "./Tweet";
import { useQuery } from "@apollo/client";
import { useAppContext } from "../utils/AppContext";
import { GET_TWEETS } from "../utils/ApolloRequest";

interface Props {
	user: UserType;
}

export const ProfileFeed: React.FC<Props> = ({ user }) => {
	const { state } = useAppContext();
	const { loading, error, data, refetch } = useQuery(GET_TWEETS, {
		variables: { userHandle: user.userHandle },
	});
	useEffect(() => {
		refetch();
	}, [refetch, state.refreshFeed]);
	if (loading) return <>Loading...</>;
	if (error) return <>{error.message}</>;
	console.log(data);

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
