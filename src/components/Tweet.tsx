import React from "react";
import { Media, Image } from "react-bootstrap";
import DefaultUserIcon from "../img/default_profile_400x400.png";
import "../styles/tweet.scss";

export const Tweet: React.FunctionComponent<TweetType> = ({ id, stats, text, user }) => {
	return (
		<>
			{/* <Media className="tweet">
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
						<h6>{user.username}</h6>
						<small>@{user.userHandle}</small>
						<small>Apr 5</small>
						<a href="_" className="more-button">
							<i className="fas fa-ellipsis-h"></i>
						</a>
					</div>
					<p>{text}</p>
					<div className="tweet-icons">
						<a href="_" className="comment-icon">
							<i className="fas fa-comment"></i>
							<span className="numbers">{stats.comments}</span>
						</a>
						<a href="_" className="retweet-icon">
							<i className="fas fa-exchange-alt"></i>
							<span className="numbers">{stats.retweets}</span>
						</a>
						<a href="_" className="share-icon">
							<i className="far fa-heart"></i>
							<span className="numbers">{stats.likes}</span>
						</a>
						<a href="_" className="share-icon">
							<i className="fas fa-share"></i>
						</a>
					</div>
				</Media.Body>
			</Media> */}
		</>
	);
};
