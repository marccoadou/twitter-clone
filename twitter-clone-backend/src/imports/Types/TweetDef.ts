import { gql } from "@apollo/client";

export const tweetDef = gql`
	type Tweet {
		id: ID!
		text: String!
		user: User!
		userHandle: String!
		statistics: TweetStats!
		createdAt: String!
	}

	type TweetStats {
		likes: Int!
		likesList: [String]
		retweets: Int!
		retweetsList: [String]
		commentsNbr: Int!
		comments: [Tweet]
		commentsList: [String]
	}

	input TweetStatsInput {
		likes: Int!
		retweets: Int!
		comments: Int!
	}
`;
