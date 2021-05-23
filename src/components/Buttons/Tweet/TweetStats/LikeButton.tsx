import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ADD_LIKE, REMOVE_LIKE } from "../../../lib/ApolloRequest";
import { useAppContext } from "../../../lib/AppContext";
import { Heart, HeartFill } from "react-bootstrap-icons";

interface Props {
	id: string;
	statistics: TweetStatsType;
}
export const LikeButton: React.FC<Props> = ({ id, statistics }) => {
	const { state } = useAppContext();
	const [userLiked, setUserLiked] = useState(
		statistics.likesList.includes(`${state.user.userHandle}`)
	);

	useEffect(() => {
		if (statistics.likesList.includes(`${state.user.userHandle}`)) {
			setUserLiked(true);
		} else {
			setUserLiked(false);
		}
	}, [state.user.userHandle, statistics.likesList]);

	const [addLikeMutation] = useMutation(ADD_LIKE);
	const addLike = () => {
		addLikeMutation({
			variables: { userHandle: state.user.userHandle, id: id },
		});
		setUserLiked(true);
	};

	const [removeLikeMutation] = useMutation(REMOVE_LIKE);
	const removeLike = () => {
		removeLikeMutation({
			variables: { userHandle: state.user.userHandle, id: id },
			optimisticResponse: {
				removeLike: {
					__typename: "TweetStats",
					id: id,
					statistics: { likes: statistics.likes - 1 },
				},
			},
		});
		setUserLiked(false);
	};
	return (
		<>
			<div className="like-icon" onClick={userLiked ? removeLike : addLike}>
				{userLiked ? <HeartFill fill="#d62929e5" /> : <Heart />}
				<span className="numbers"> {statistics.likes}</span>
			</div>
		</>
	);
};
