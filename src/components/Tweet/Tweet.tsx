import "../../styles/tweet.scss";
import React, { useEffect } from "react";
import { Media, Image } from "react-bootstrap";
import DefaultUserIcon from "../../img/default_profile_400x400.png";
import { LikeButton } from "../Buttons/Tweet/TweetStats/LikeButton";
import { CommentButton } from "../Buttons/Tweet/TweetStats/CommentButton";
import { RetweetButton } from "../Buttons/Tweet/TweetStats/RetweetButton";
import { ShareButton } from "../Buttons/Tweet/TweetStats/ShareButton";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { DELETE_TWEET } from "../lib/ApolloRequest";
import { useToasts } from "react-toast-notifications";

export const Tweet: React.FunctionComponent<TweetType> = ({
	id,
	userHandle,
	statistics,
	text,
	user,
	createdAt,
}) => {
	const { addToast } = useToasts();
	const [deleteTweet, { data }] = useMutation(DELETE_TWEET, {
		variables: { id: id },
	});
	console.log(data);
	const handleDeleteTweet = () => {
		deleteTweet();
	};
	useEffect(() => {
		if (data?.deleteTweet === true) {
			addToast("Tweet deleted successfully", { appearance: "success", autoDismiss: true });
		}
	}, [data]);
	console.log(`text : ${text} || statistics.likes : ${statistics.likes}`);
	return (
		<>
			<Media className="tweet">
				<Image
					width={48}
					height={48}
					className="mr-3 user-img"
					src={DefaultUserIcon}
					alt="Generic placeholder"
					roundedCircle
				/>
				<Media.Body>
					<div className="tweet-user">
						<h6>{user?.username}</h6>

						<button className="more-button" onClick={handleDeleteTweet}>
							<i className="fas fa-ellipsis-h"></i>
						</button>
					</div>
					<div className="tweet-info">
						<small>
							<Link to={`/${userHandle}`} className="no-hyperlink">
								@{userHandle}
							</Link>
						</small>
						<small>{createdAt.slice(4, 15)}</small>
					</div>
					<Link to={`/tweet/${id}`}>
						<p>{text}</p>
					</Link>
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
function addToast(arg0: string, arg1: { appearance: string; autoDismiss: boolean }) {
	throw new Error("Function not implemented.");
}
