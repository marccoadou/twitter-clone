import React from "react";
import { Image, Button } from "react-bootstrap";
import DefaultProfilePic from "../img/default_profile_400x400.png";
import DefaultCoverPic from "../img/mountain.jpg";
import "../styles/profile.scss";

export const Profile = () => {
	return (
		<>
			<div className="profile">
				<div className="profile-pictures">
					<Image src={DefaultCoverPic} className="cover-pic" />
					<Image src={DefaultProfilePic} roundedCircle className="profile-pic" />
					<Button variant="outline-dark" className="profile-setup">
						Set up profile
					</Button>
				</div>
				<div className="profile-info">
					<h4>profile name</h4>
					<small className="small-dark">@profileurl</small>
					<p className="small-dark">
						<i className="far fa-calendar-alt"></i> Joined date
					</p>
					<div>
						<p>54 Following</p>
						<p>132 Followers</p>
					</div>
				</div>

				<div className="personal-category">
					<button>Tweets</button>
					<button>Tweets & replies</button>
					<button>Media</button>
					<button>Likes</button>
				</div>
			</div>
		</>
	);
};
