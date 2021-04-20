import { resolvers } from "./imports/Resolvers/resolvers";
import { UserResolvers } from "./imports/Resolvers/UserResolvers";
import { tweetResolvers } from "./imports/Resolvers/TweetResolvers";
import { tweetDef } from "./imports/Types/TweetDef";
import { UserDef } from "./imports/Types/UserDef";
import { tweetAddLike } from "./imports/Resolvers/TweetStatsResolvers/TweetAddLike";
import { ApolloServer, gql } from "apollo-server";
import * as admin from "firebase-admin";
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
		addLike(userHandle: String!, id: String!): Tweet
		# updateTweet(input: TweetInput): Tweet
	}
`;

const server = new ApolloServer({
	typeDefs: [typeDefs, tweetDef, UserDef],
	resolvers: merge(resolvers, tweetResolvers, UserResolvers, tweetAddLike),
});

server.listen().then(({ url }) => {
	console.log(`Server is ready at ${url}`);
});
