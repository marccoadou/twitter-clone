type UserType = {
	id: string;
	screenName: string;
	statusesCount: number;
	tweets?: TweetType[];
};

type TweetType = {
	id: string;
	text: string;
	userId: string;
	user: UserType;
	likes: number;
};
