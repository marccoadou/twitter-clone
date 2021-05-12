import React, { useState } from "react";
import { useWindowSize } from "../../lib/hooks";
import { FollowButton } from "./FollowButton";
import { UnfollowButton } from "./UnfollowButton";
interface Props {
	class: string;
	placeholder: string;
	isFollowing: boolean;
	toFollowUserHandle: string;
}

export const Follow: React.FC<Props> = (props) => {
	const windowSize = useWindowSize();
	const [hover, setHover] = useState(false);

	return (
		<div
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
			onTouchStart={() => {
				setHover(true);
			}}
			onTouchEnd={() => {
				setHover(false);
			}}>
			{hover && props.isFollowing ? (
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
