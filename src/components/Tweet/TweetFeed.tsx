import React from "react";
import { Tweet } from "./Tweet";

interface Props {
	tweets: TweetType[];
}

export const TweetFeed: React.FC<Props> = ({ tweets }) => {
	return (
		<>
			{tweets.map((tweet: TweetType, index: number) => {
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
