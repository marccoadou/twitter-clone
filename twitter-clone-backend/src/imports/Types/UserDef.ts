import { gql } from "@apollo/client";

export const UserDef = gql`
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

	input UserInput {
		credentials: CredentialsInput
		username: String!
		userHandle: String!
		userStats: UserStatsInput!
	}

	type UserStats {
		totalLikes: Int!
		totalRetweets: Int!
		totalComments: Int!
	}

	input UserStatsInput {
		totalLikes: Int!
		totalRetweets: Int!
		totalComments: Int!
	}

	type Credentials {
		email: String!
		password: String!
	}
	input CredentialsInput {
		email: String!
		password: String!
	}
`;
