import { gql } from "@apollo/client";

export const tweetDef = gql`
	type Tweet {
		id: ID!
		text: String!
		user: User!
		statistics: TweetStats!
		createdAt: String!
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

	input TweetStatsInput {
		likes: Int!
		retweets: Int!
		comments: Int!
	}
`;
