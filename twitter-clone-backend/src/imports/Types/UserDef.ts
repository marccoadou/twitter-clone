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
	type UserStats {
		totalLikes: Int!
		totalRetweets: Int!
		totalComments: Int!
	}
	type Credentials {
		email: String!
		password: String!
	}
`;
