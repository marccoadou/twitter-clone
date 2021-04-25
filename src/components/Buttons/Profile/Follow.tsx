import React, { useState } from "react";
import { FollowButton } from "./FollowButton";
import { UnfollowButton } from "./UnfollowButton";
interface Props {
	class: string;
	placeholder: string;
	isFollowing: boolean;
	toFollowUserHandle: string;
}

export const Follow: React.FC<Props> = (props) => {
	const [mouseOver, setMouseOver] = useState(false);
	return (
		<div
			onMouseEnter={() => {
				setMouseOver(true);
			}}
			onMouseLeave={() => {
				setMouseOver(false);
			}}>
			{mouseOver && props.isFollowing ? (
				<UnfollowButton class={props.class} toFollowUserHandle={props.toFollowUserHandle} />
			) : (
				<FollowButton
					class={props.class}
					placeholder={props.placeholder}
					toFollowUserHandle={props.toFollowUserHandle}
				/>
			)}
		</div>
	);
};
