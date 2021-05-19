import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { GET_TWEET } from "../lib/ApolloRequest";
import { Loader } from "../Spinner";
import { Tweet } from "./Tweet";

type TweetParam = {
	id: string;
};

export const TweetThread = () => {
	const params = useParams<TweetParam>();
	console.log(params.id);
	const { data, loading } = useQuery(GET_TWEET, {
		variables: { id: params?.id },
	});
	if (loading) {
		return (
			<div className="center-loader">
				<Loader />
			</div>
		);
	}
	return (
		<div className="tweet-vertical">
			{data?.tweet && (
				<Tweet
					createdAt={data?.tweet.createdAt}
					id={data?.tweet.id}
					statistics={data?.tweet.statistics}
					text={data?.tweet.text}
					user={data?.tweet.user}
					userHandle={data?.tweet.userHandle}
				/>
			)}
			<div>
				{data?.tweet.statistics.comments &&
					data?.tweet.statistics.comments.map((tweet: TweetType, index: number) => (
						<Tweet
							createdAt={tweet.createdAt}
							id={tweet.id}
							statistics={tweet.statistics}
							text={tweet.text}
							user={tweet.user}
							userHandle={tweet.userHandle}
							key={index}
						/>
					))}
			</div>
		</div>
	);
};
