import React from "react";
import { Media, Image } from "react-bootstrap";
import DefaultUserIcon from "../img/default_profile_400x400.png";
// import DropdownMenu from "react-overlays/DropdownMenu";
import "../styles/tweet.scss";

//Tweet takes as arguments ID && userID to go search DB for that tweet

export const Tweet = ({ props }: any) => {
	const tweet = props;
	console.log(tweet.text);
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
						<h6>{tweet.user.screenName}</h6>
						<small>@{tweet.user.id}</small>
						<small>Apr 5</small>
						<a href="_" className="more-button">
							<i className="fas fa-ellipsis-h"></i>
						</a>
					</div>
					<p>{tweet.text}</p>
					<div className="tweet-icons">
						<a href="_" className="comment-icon">
							<i className="fas fa-comment"></i>
						</a>
						<a href="_" className="retweet-icon">
							<i className="fas fa-exchange-alt"></i>
						</a>
						<a href="_" className="share-icon">
							<i className="far fa-heart"></i>
						</a>
						<a href="_" className="share-icon">
							<i className="fas fa-share"></i>
						</a>
					</div>
				</Media.Body>
			</Media>
		</>
	);
};
