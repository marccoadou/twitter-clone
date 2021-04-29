import { exportAdmin } from "../../index";
import { ApolloError } from "@apollo/client";

export const resolvers = {
	User: {
		async tweets(user) {
			try {
				const userTweets = await exportAdmin
					.firestore()
					.collection("tweets")
					.orderBy("createdAt", "desc")
					.where("userHandle", "==", user.userHandle)
					.get();
				const tweets = userTweets.docs.map((tweet) => tweet.data());

				const tweetsToDate = toDateTweets(tweets);
				return tweetsToDate;
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

export const toDateTweets = (tweets) => {
	tweets.forEach((tweet) => {
		tweet.createdAt = tweet.createdAt.toDate().toString();
	});
	return tweets;
};
