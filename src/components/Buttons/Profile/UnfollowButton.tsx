import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { UNFOLLOW } from "../../../utils/ApolloRequest";
import { useAppContext } from "../../../utils/AppContext";

interface Props {
	class: string;
	toFollowUserHandle: string;
}
export const UnfollowButton: React.FC<Props> = (props) => {
	const [unfollowUser, { data }] = useMutation(UNFOLLOW);
	const { state, dispatch } = useAppContext();

	const unfollow = () => {
		unfollowUser({
			variables: {
				userHandle: state.user.userHandle,
				toFollowUserHandle: props.toFollowUserHandle,
			},
		});
	};

	useEffect(() => {
		if (data?.unfollowUser === true && state.user.following.includes(props.toFollowUserHandle)) {
			dispatch({ type: "UNFOLLOW", value: props.toFollowUserHandle });
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
			<button className={props.class} onClick={unfollow}>
				Unfollow
			</button>
		</>
	);
};
