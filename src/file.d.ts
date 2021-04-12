type UserType = {
	credentials: CredentialType;
	username: string;
	userHandle: string;
	userStats: UserStatsType;
	tweets?: TweetType[];
};

type TweetType = {
	id: string;
	text: string;
	user: UserType;
	stats: TweetStatsType;
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
