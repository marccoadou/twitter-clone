import React, { useState, createContext, useContext } from "react";

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
	isLoggedIn: boolean;
	setIsLoggedIn: (loggedIn: boolean) => void;
	user: UserType;
	setUser: (user: UserType) => void;
};

export const AppContext = createContext<AppContextContent>({
	isLoggedIn: false,
	setIsLoggedIn: () => {},
	user: defaultUser,
	setUser: () => {},
});

export const useAppContext = () => useContext(AppContext);
