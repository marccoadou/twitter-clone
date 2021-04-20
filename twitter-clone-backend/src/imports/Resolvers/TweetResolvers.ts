import { exportAdmin } from "../../index";
import * as LocalAdmin from "firebase-admin";
import { ApolloError } from "@apollo/client";
import uniqid = require("uniqid");

const defaultStats = {
	likes: 0,
	likesList: [],
	retweets: 0,
	retweetsList: [],
	commentsNbr: 0,
	comments: [],
	commentsList: [],
};

export const tweetResolvers = {
	Query: {
		async tweets() {
			const tweets = await exportAdmin.firestore().collection("tweets").get();
			return tweets.docs.map((tweet) => tweet.data());
		},
	},
	Mutation: {
		async addTweet(_, args) {
			try {
				args.id = uniqid();
				args.createdAt = LocalAdmin.firestore.Timestamp.now();
				args.statistics = defaultStats;
				const newTweet = await exportAdmin
					.firestore()
					.collection("tweets")
					.doc(`${args.id}`)
					.set(args)
					.then(async () => {
						const tweet = await exportAdmin.firestore().doc(`tweets/${args.id}`).get();
						return tweet.data();
					});
				return newTweet;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
