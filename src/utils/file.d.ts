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
	following: [string];
};

type TweetType = {
	id: string;
	text: string;
	userHandle: string;
	user?: UserType;
	statistics: TweetStatsType;
	createdAt: string;
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
	likesList: [string];
	retweets: number;
	retweetsList: [string];
	commentsNbr: number;
	comments: [string];
	commentsList: [User];
};
