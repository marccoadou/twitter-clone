/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createContext, useContext } from "react";

export const defaultUser: UserType = {
	userHandle: "",
	username: "",
	credentials: {
		email: "",
		password: "",
	},
	userStats: {
		totalComments: 0,
		totalLikes: 0,
		totalRetweets: 0,
	},
};

export type AppContextContent = {
	state: {
		isLoggedIn: boolean;
		user: UserType;
		isCreatingTweet: boolean;
	};
	dispatch: React.Dispatch<AppContextContent | unknown>;
};

export const AppContext = createContext<AppContextContent>({
	state: { isLoggedIn: false, isCreatingTweet: false, user: defaultUser },
	dispatch: () => {},
});

export const useAppContext = () => useContext(AppContext);
