import { UserResolvers } from "./imports/Resolvers/UserResolvers";
import { tweetResolvers } from "./imports/Resolvers/TweetResolvers";
import { tweetDef } from "./imports/Types/TweetDef";
import { UserDef } from "./imports/Types/UserDef";
import * as admin from "firebase-admin";
import { ApolloServer, ApolloError, gql } from "apollo-server";
import merge from "lodash/merge";

const serviceAccount = require("../service-account.json");

export const exportAdmin = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const typeDefs = gql`
	type Query {
		users: [User]
		tweets: [Tweet]
		user(userHandle: String!): User
		checkUser(email: String!, password: String!): ValidUser
	}

	type Mutation {
		addUser(
			credentials: CredentialsInput!
			username: String!
			userHandle: String!
			userStats: UserStatsInput!
		): User
		updateUser(input: UserInput): User
		addTweet(text: String!, userHandle: String!): Tweet
		addLike(userHandle: String!): Tweet
		# updateTweet(input: TweetInput): Tweet
	}
`;

const resolvers = {
	User: {
		async tweets(user) {
			try {
				console.log(user);
				const userTweets = await admin
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
				const tweetAuthor = await admin.firestore().doc(`users/${tweet.userHandle}`).get();
				return tweetAuthor.data();
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
	Mutation: {
		async addLike(_, args) {
			try {
				await admin
					.firestore()
					.collection("tweets")
					.doc(`${args.id}`)
					.update({
						"statistics.likes": admin.firestore.FieldValue.increment(1),
						likesList: admin.firestore.FieldValue.arrayUnion(args.userHandle),
					});
				const tweet = await admin.firestore().doc(`tweets/${args.id}`).get();
				return tweet;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};

const server = new ApolloServer({
	typeDefs: [typeDefs, tweetDef, UserDef],
	resolvers: merge(resolvers, tweetResolvers, UserResolvers),
});

server.listen().then(({ url }) => {
	console.log(`Server is ready at ${url}`);
});
