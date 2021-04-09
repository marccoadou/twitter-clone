import React from "react";
import { Media, Image } from "react-bootstrap";
import DefaultUserIcon from "../img/default_profile_400x400.png";
// import DropdownMenu from "react-overlays/DropdownMenu";
import "../styles/tweet.scss";

//Tweet takes an ID with an user url to go search DB for that tweet

export const Tweet = () => {
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
						<h6>Username</h6>
						<small>@userurl</small>
						<small>Apr 5</small>
						<button>dropdown </button>
					</div>
					<p>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
						ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
						tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
						Donec lacinia congue felis in faucibus.
					</p>
					<div className="tweet-icons">
						<button>comments </button>
						<button>retweet </button>
						<button>like </button>
						<button>share</button>
					</div>
				</Media.Body>
			</Media>
		</>
	);
};
