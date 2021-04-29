import React, { useEffect, useState } from "react";
import DefaultProfilePic from "../../img/default_profile_400x400.png";
import DefaultCoverPic from "../../img/mountain.jpg";
import { Image } from "react-bootstrap";
import "../../styles/profile.scss";
import { useRouteMatch } from "react-router";
import { useAppContext } from "../UtilsComponent/AppContext";
import { Follow } from "../Buttons/Profile/Follow";

interface Props {
	user: UserType;
}

export const UserProfile: React.FC<Props> = ({ user }) => {
	let { url } = useRouteMatch();
	const { state } = useAppContext();
	const profileUrl = url.slice(9);
	const [isFollowing, setIsFollowing] = useState(state?.user?.following?.includes(profileUrl));
	useEffect(() => {
		if (state?.user?.following?.includes(profileUrl)) {
			setIsFollowing(true);
		} else {
			setIsFollowing(false);
		}
	}, [profileUrl, state.user.following]);
	const foreignProfile = state.user.userHandle !== profileUrl;
	return (
		<>
			<div className="profile">
				<div className="profile-pictures">
					<Image src={DefaultCoverPic} className="cover-pic" />
					<Image src={DefaultProfilePic} roundedCircle className="profile-pic" />
					{foreignProfile ? (
						<Follow
							isFollowing={isFollowing}
							class="profile-button"
							placeholder={isFollowing ? "Followed" : "Follow"}
							toFollowUserHandle={profileUrl}
						/>
					) : (
						<button className="profile-button">Set up profile</button>
					)}
				</div>
				<div className="profile-info">
					<h4>{user?.username}</h4>
					<small className="small-dark">@{user?.userHandle}</small>
					<p className="small-dark">
						<i className="far fa-calendar-alt"></i> Joined date
					</p>
					<div>
						<p>{}12 Following</p>
						<p>{}12 Followers</p>
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
