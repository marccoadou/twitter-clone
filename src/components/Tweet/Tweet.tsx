import "../../styles/tweet.scss";
import React from "react";
import { Media, Image } from "react-bootstrap";
import DefaultUserIcon from "../../img/default_profile_400x400.png";
import { LikeButton } from "../Buttons/Tweet/LikeButton";
import { CommentButton } from "../Buttons/Tweet/CommentButton";
import { RetweetButton } from "../Buttons/Tweet/RetweetButton";
import { ShareButton } from "../Buttons/Tweet/ShareButton";

export const Tweet: React.FunctionComponent<TweetType> = ({
	id,
	userHandle,
	statistics,
	text,
	user,
	createdAt,
}) => {
	return (
		<>
			<Media className="tweet">
				<Image
					width={48}
					height={48}
					className="mr-3"
					src={DefaultUserIcon}
					alt="Generic placeholder"
					roundedCircle
				/>
				<Media.Body>
					<div className="tweet-user">
						<h6>{user?.username}</h6>
						<small>@{userHandle}</small>
						<small>{createdAt.slice(4, 25)}</small>
						<a href="_" className="more-button">
							<i className="fas fa-ellipsis-h"></i>
						</a>
					</div>
					<p>{text}</p>
					<div className="tweet-icons">
						<CommentButton id={id} statistics={statistics} />
						<RetweetButton id={id} statistics={statistics} />
						<LikeButton id={id} statistics={statistics} />
						<ShareButton id={id} statistics={statistics} />
					</div>
				</Media.Body>
			</Media>
		</>
	);
};
