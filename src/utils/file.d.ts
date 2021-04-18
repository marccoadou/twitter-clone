type AppContextType = {
	user: UserType;
	isLoggedIn: boolean;
	isCreatingTweet: boolean;
	refreshFeed: boolean;
};

type UserType = {
	credentials?: CredentialType;
	username: string;
	userHandle: string;
	userStats: UserStatsType;
	tweets?: TweetType[];
};

type TweetType = {
	id: string;
	text: string;
	userHandle: string;
	user?: UserType;
	statistics: TweetStatsType;
};

type CredentialType = {
	email: string;
	password: string;
};

type UserStatsType = {
	totalLikes: number;
	totalRetweets: number;
	totalComments: number;
};

type TweetStatsType = {
	likes: number;
	likesList: [UserType];
	retweets: number;
	retweetsList: [UserType];
	commentsNbr: number;
	comments: [TweetType];
	commentsList: [User];
};
