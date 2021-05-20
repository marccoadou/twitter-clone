import { toDateTweets } from "./../resolvers";
import { exportAdmin } from "../../../index";
import { ApolloError } from "@apollo/client";

export const userFeed = {
	Query: {
		async userFeed(_, args) {
			try {
				const userFeed = await exportAdmin
					.firestore()
					.collection("tweets")
					.where("userHandle", "in", args.following)
					.orderBy("createdAt", "desc")
					.limit(20)
					.get()
					.then((tweets) => {
						const tweetToDate = toDateTweets(tweets.docs.map((tweet) => tweet.data()));
						return tweetToDate;
					})
					.catch((error) => {
						return error;
					});
				console.log(userFeed);
				return userFeed;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
