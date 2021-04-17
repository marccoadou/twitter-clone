import React from "react";
import DefaultProfilePic from "../img/default_profile_400x400.png";
import DefaultCoverPic from "../img/mountain.jpg";
import { Button, Image } from "react-bootstrap";
import "../styles/profile.scss";
import { useAppContext } from "../utils/AppContext";

export const Profile = () => {
	const { state } = useAppContext();
	return (
		<>
			<div className="profile">
				<div className="profile-pictures">
					<Image src={DefaultCoverPic} className="cover-pic" />
					<Image src={DefaultProfilePic} roundedCircle className="profile-pic" />
					<Button variant="outline-light" className="profile-setup">
						Set up profile
					</Button>
				</div>
				<div className="profile-info">
					<h4>{state.user.username}</h4>
					<small className="small-dark">@{state.user.userHandle}</small>
					<p className="small-dark">
						<i className="far fa-calendar-alt"></i> Joined date
					</p>
					<div>
						<p>{} Following</p>
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
