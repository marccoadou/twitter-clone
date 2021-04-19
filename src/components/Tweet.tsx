import React from "react";
import { Media, Image } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import DefaultUserIcon from "../img/default_profile_400x400.png";
import "../styles/tweet.scss";
import { ADD_LIKE } from "../utils/ApolloRequest";
import { useAppContext } from "../utils/AppContext";

export const Tweet: React.FunctionComponent<TweetType> = ({
	id,
	userHandle,
	statistics,
	text,
	user,
	createdAt,
}) => {
	const { state } = useAppContext();
	const [addLikeQuery, { data }] = useLazyQuery(ADD_LIKE);
	const addLike = () => {
		addLikeQuery({ variables: { id, state } });
	};
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
						<small>@{user?.userHandle}</small>
						<small>{createdAt}</small>
						<a href="_" className="more-button">
							<i className="fas fa-ellipsis-h"></i>
						</a>
					</div>
					<p>{text}</p>
					<div className="tweet-icons">
						<div className="comment-icon">
							<i className="fas fa-comment"></i>
							<span className="numbers"> {statistics?.commentsNbr}</span>
						</div>
						<div className="retweet-icon">
							<i className="fas fa-exchange-alt"></i>
							<span className="numbers"> {statistics.retweets}</span>
						</div>
						<div className="share-icon">
							<i className="far fa-heart"></i>
							<span className="numbers"> {statistics.likes}</span>
						</div>
						<div className="share-icon">
							<i className="fas fa-share"></i>
						</div>
					</div>
				</Media.Body>
			</Media>
		</>
	);
};
