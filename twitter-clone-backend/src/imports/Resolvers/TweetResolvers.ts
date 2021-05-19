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
			let tweetsComments;
			const tweet = await exportAdmin
				.firestore()
				.doc(`tweets/${args.id}`)
				.get()
				.then(async (tweet) => {
					const tweetData = tweet.data();
					if (tweetData.statistics.commentsList.length) {
						tweetsComments = await exportAdmin
							.firestore()
							.collection("tweets")
							.where("id", "in", tweetData.statistics.commentsList)
							.get()
							.then((tweets) => {
								const tweetToDate = toDateTweets(tweets.docs.map((tweet) => tweet.data()));
								return tweetToDate;
							})
							.catch((error) => {
								console.log(error);
								return error;
							});
						tweetData.statistics.comments = tweetsComments;
						return tweetData;
					}
					tweetData.createdAt = tweetData.createdAt.toDate().toString();
					return tweetData;
				})
				.catch((error) => {
					console.log(error);
					return error;
				});
			console.log(tweet);
			return tweet;
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
				console.log(args);
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
						console.log(error);
						return error;
					});
				return newComment;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
