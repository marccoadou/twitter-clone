import * as admin from "firebase-admin";

import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";
const serviceAccount = require("../service-account.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const typeDefs = gql`
	type User {
		credentials: Credentials
		fullName: String!
		userHandle: String!
		userStats: UserStats!
		tweets: [Tweet]!
	}

	type Credentials {
		email: String!
		password: String!
	}

	type Tweet {
		id: ID!
		text: String!
		user: User!
		statistics: TweetStats!
	}

	type UserStats {
		totalLikes: Int!
		totalRetweets: Int!
		totalComments: Int!
	}

	type TweetStats {
		likes: Int!
		retweets: Int!
		comments: Int!
	}

	input UserInput {
		credentials: CredentialsInput!
		fullName: String!
		userHandle: String!
		userStats: UserStatsInput!
	}

	input CredentialsInput {
		email: String!
		password: String!
	}

	input TweetInput {
		id: ID!
		text: String!
		user: UserInput!
		statistics: TweetStatsInput!
	}

	input UserStatsInput {
		totalLikes: Int!
		totalRetweets: Int!
		totalComments: Int!
	}

	input TweetStatsInput {
		likes: Int!
		retweets: Int!
		comments: Int!
	}

	type Query {
		tweets: [Tweet]
		user(id: String!): User
	}

	type Mutation {
		addUser(
			credentials: CredentialsInput!
			fullName: String!
			userHandle: String!
			userStats: UserStatsInput!
		): User
		updateUser(input: UserInput): User
		addTweet(input: TweetInput): Tweet
		updateTweet(input: TweetInput): Tweet
	}
`;

const resolvers = {
	User: {
		async tweets(user) {
			try {
				const userTweets = await admin
					.firestore()
					.collection("tweets")
					.where("userId", "==", user.id)
					.get();
				return userTweets.docs.map((tweet) => tweet.data());
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
	Tweet: {
		async user(tweet) {
			try {
				const tweetAuthor = await admin.firestore().doc(`users/${tweet.userId}`).get();
				return tweetAuthor.data();
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
	Query: {
		async tweets() {
			const tweets = await admin.firestore().collection("tweets").get();
			return tweets.docs.map((tweet) => tweet.data());
		},
		async user(_, args) {
			try {
				const userDoc = await admin.firestore().doc(`users/${args.id}`).get();
				const user = userDoc.data();
				return user || new ValidationError("User ID not found");
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
	Mutation: {
		async addUser(_, args) {
			try {
				const userAdded = await admin
					.firestore()
					.collection("users")
					.doc(`${args.userHandle}`)
					.set(args)
					.then(async () => {
						const results = await admin
							.firestore()
							.doc(`users/${args.userHandle}`)
							.get();
						return results.data();
					});
				return userAdded;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`Server is ready at ${url}`);
});
