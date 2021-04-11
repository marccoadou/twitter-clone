import * as admin from "firebase-admin";
const serviceAccount = require("../service-account.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";

const typeDefs = gql`
	# A twitter user
	type User {
		credentials: Credentials!
		fullname: String!
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

	type Query {
		tweets: [Tweet]
		user(id: String!): User
	}

	type Mutation {
		addUser(
			credentials: Credentials!
			fullname: String!
			userHandle: String!
			userStats: UserStats!
			tweets: [Tweet]!
		): User
		updateUser(
			credentials: Credentials!
			fullname: String!
			userHandle: String!
			userStats: UserStats!
			tweets: [Tweet]!
		): User
		addTweet(id: ID!, text: String!, user: User!, statistics: TweetStats!): Tweet
		updateTweet(id: ID!, text: String!, user: User!, statistics: TweetStats!): Tweet
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
					.doc(`users/${args.username}`)
					.set(args)
					.then(() => {
						console.log(`${args.user} has been successfully added to the users`);
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
