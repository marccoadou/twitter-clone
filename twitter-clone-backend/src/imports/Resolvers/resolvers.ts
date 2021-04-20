import { exportAdmin } from "../../index";
import { ApolloError } from "@apollo/client";

export const resolvers = {
	User: {
		async tweets(user) {
			try {
				const userTweets = await exportAdmin
					.firestore()
					.collection("tweets")
					.where("userHandle", "==", user.userHandle)
					.get();
				const tweets = userTweets.docs.map((tweet) => tweet.data());
				tweets.forEach((tweet) => {
					tweet.createdAt = tweet.createdAt.toDate();
				});
				console.log(tweets);
				tweets.sort((a, b) => {
					return a.createdAt - b.createdAt;
				});
				tweets.forEach((tweet) => {
					tweet.createdAt = tweet.createdAt.toString();
				});
				return tweets.reverse();
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
	Tweet: {
		async user(tweet) {
			try {
				const tweetAuthor = await exportAdmin.firestore().doc(`users/${tweet.userHandle}`).get();
				return tweetAuthor.data();
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
