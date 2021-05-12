export const appReducer = (state: AppContextType, action: { type: any; value: any }) => {
	switch (action.type) {
		case "LOGIN":
			state.isLoggedIn = true;
			break;
		case "LOGOUT":
			state.isLoggedIn = false;
			break;
		case "SET_USER":
			state.user = action.value;
			break;
		case "FOLLOW":
			state.user.following.push(action.value);
			break;
		case "UNFOLLOW":
			state.user.following = state.user.following.filter((userHandle) => {
				return userHandle !== action.value;
			});
			break;
		case "TWEET_OPEN":
			state.isCreatingTweet = true;
			break;
		case "TWEET_CLOSE":
			state.isCreatingTweet = false;
			break;
		case "REFRESH_FEED_TOGGLE":
			state.refreshFeed = !state.refreshFeed;
			break;
		case "SIDEBAR_OPEN":
			state.sideBar = true;
			break;
		case "SIDEBAR_CLOSE":
			state.sideBar = false;
			break;
		default:
			return state;
	}
};
