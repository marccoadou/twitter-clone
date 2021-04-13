type AppContextType = {
	user?: UserType;
	isLoggedIn: boolean;
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
	retweets: number;
	comments: number;
};
