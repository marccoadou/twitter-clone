import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { FOLLOW } from "../../lib/ApolloRequest";
import { useAppContext } from "../../lib/AppContext";

interface Props {
	class: string;
	placeholder: string;
	toFollowUserHandle: string;
}

export const FollowButton: React.FC<Props> = (props) => {
	const [followUser, { data }] = useMutation(FOLLOW);
	const { state, dispatch } = useAppContext();
	const follow = () => {
		followUser({
			variables: {
				userHandle: state.user.userHandle,
				toFollowUserHandle: props.toFollowUserHandle,
			},
		});
	};

	useEffect(() => {
		if (data?.followUser === true && !state.user.following.includes(props.toFollowUserHandle)) {
			dispatch({ type: "FOLLOW", value: props.toFollowUserHandle });
		}
	}, [
		data?.followUser,
		data?.unfollowUser,
		dispatch,
		props.toFollowUserHandle,
		state.user.following,
	]);
	return (
		<>
			<button className={props.class} onClick={follow}>
				{props.placeholder}
			</button>
		</>
	);
};
