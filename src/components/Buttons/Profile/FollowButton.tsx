import { useMutation } from "@apollo/client";
import React from "react";
import { FOLLOW } from "../../../utils/ApolloRequest";
import { useAppContext } from "../../../utils/AppContext";

interface Props {
	class: string;
	placeholder: string;
	isFollowing: boolean;
	toFollowUserHandle: string;
}
export const FollowButton: React.FC<Props> = (props) => {
	const [followUser, { data }] = useMutation(FOLLOW);
	const { state } = useAppContext();
	const follow = () => {
		followUser({
			variables: {
				userHandle: state.user.userHandle,
				toFollowUserHandle: props.toFollowUserHandle,
			},
		});
	};
	console.log(data);
	return (
		<>
			<button className={props.class} onClick={follow}>
				{props.placeholder}
			</button>
		</>
	);
};
