import { exportAdmin } from "../..";
import { toDateTweets } from "./resolvers";

export const tweetsByIDList = {
	Query: {
		async tweetsByIDList(_, args) {
			const tweets = await exportAdmin
				.firestore()
				.doc(`tweets/${args.id}`)
				.get()
				.then(async (tweet) => {
					const tweetData = tweet.data();
					let tweets;
					if (tweetData.statistics.commentsList.length) {
						tweets = await exportAdmin
							.firestore()
							.collection("tweets")
							.where("id", "in", tweetData.statistics.commentsList)
							.get()
							.then((tweets) => {
								const tweetToDate = toDateTweets(
									tweets.docs.map((tweet) => {
										return tweet.data();
									})
								);
								return tweetToDate;
							})
							.catch((error) => {
								console.log(error);
								return error;
							});
					}
					return tweets;
				});
			console.log(tweets);
			return tweets;
		},
	},
};
