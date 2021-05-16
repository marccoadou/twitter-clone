import { exportAdmin } from "../../index";
import * as LocalAdmin from "firebase-admin";
import { ApolloError } from "@apollo/client";
import uniqid = require("uniqid");
import { toDateTweets } from "./resolvers";

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
		async tweet(_, args) {
			console.log(args.id);
			const tweetData = await exportAdmin
				.firestore()
				.doc(`tweets/${args.id}`)
				.get()
				.then((tweet) => {
					const tweetData = tweet.data();
					tweetData.createdAt = tweetData.createdAt.toDate().toString();
					console.log(tweetData.createdAt);
					return tweetData;
				})
				.catch((error) => {
					return error;
				});
			return tweetData;
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
		async addComment(_, args) {
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
				const newComment = await exportAdmin
					.firestore()
					.doc(`tweets/${args.tweetID}`)
					.update({
						"statistics.commentsList": LocalAdmin.firestore.FieldValue.arrayUnion(args.id),
					})
					.then(async () => {
						const tweet = await exportAdmin.firestore().doc(`tweets/${args.tweetID}`).get();
						return tweet.data();
					})
					.catch((error) => {
						return error;
					});
				return newComment;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
