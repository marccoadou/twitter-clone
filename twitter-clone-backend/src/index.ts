import * as admin from "firebase-admin";
import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";
import * as passwordHash from "password-hash";
import uniqid = require("uniqid");

const serviceAccount = require("../service-account.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const typeDefs = gql`
	type ValidUser {
		isValidLogin: Boolean!
		error: String
		user: User
	}

	type User {
		credentials: Credentials
		username: String!
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
		createdAt: String!
	}

	type UserStats {
		totalLikes: Int!
		totalRetweets: Int!
		totalComments: Int!
	}

	type TweetStats {
		likes: Int!
		likesList: [User]
		retweets: Int!
		retweetsList: [User]
		commentsNbr: Int!
		comments: [Tweet]
		commentsList: [User]
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
					tweet.createdAt = tweet.createdAt.toDate().toLocaleTimeString();
				});
				console.log(tweets);
				tweets.sort((a, b) => {
					return b.createdAt - a.createdAt;
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
	Query: {
		async tweets() {
			const tweets = await admin.firestore().collection("tweets").get();
			return tweets.docs.map((tweet) => tweet.data());
		},
		async user(_, args) {
			try {
				const userDoc = await admin.firestore().doc(`users/${args.userHandle}`).get();
				const user = userDoc.data();
				return user || new ValidationError("User not found");
			} catch (error) {
				throw new ApolloError(error);
			}
		},
		async users() {
			try {
				const users = await admin.firestore().collection("users").get();
				return users.docs.map((user) => user.data());
			} catch (error) {
				throw new ApolloError(error);
			}
		},
		async checkUser(_, args) {
			console.log(args);
			try {
				const userDoc = await admin
					.firestore()
					.collection("users")
					.where("credentials.email", "==", args.email)
					.get();
				var user = {
					isValidLogin: false,
					error: "",
					user: userDoc.docs.map((user) => user.data())[0],
				};
				let isValid = passwordHash.verify(args.password, user.user.credentials.password);
				user.isValidLogin = isValid;
				user.error = user.isValidLogin ? "" : "Wrong password or email";
				console.log(user);
				return user;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
	Mutation: {
		async addUser(_, args) {
			try {
				if (args.credentials.password) {
					const hashed = passwordHash.generate(args.credentials.password);
					args.credentials.password = hashed;
				}
				const userAdded = await admin
					.firestore()
					.collection("users")
					.doc(`${args.userHandle}`)
					.set(args)
					.then(async () => {
						const results = await admin.firestore().doc(`users/${args.userHandle}`).get();
						return results.data();
					});
				return userAdded;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
		async addTweet(_, args) {
			try {
				args.id = uniqid();
				args.createdAt = admin.firestore.Timestamp.now();
				args.statistics = {
					likes: 0,
					likesList: [],
					retweets: 0,
					retweetsList: [],
					commentsNbr: 0,
					comments: [],
					commentsList: [],
				};
				const newTweet = await admin
					.firestore()
					.collection("tweets")
					.doc(`${args.id}`)
					.set(args)
					.then(async () => {
						const tweet = await admin.firestore().doc(`tweets/${args.id}`).get();
						return tweet.data();
					});
				return newTweet;
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
