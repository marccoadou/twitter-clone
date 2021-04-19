import React from "react";
import "../styles/header.scss";
import { UserChanger } from "./UserChanger";
import { Button } from "react-bootstrap";
import { useAppContext } from "../utils/AppContext";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

export const Header = withRouter(({ history }) => {
	const { state, dispatch } = useAppContext();

	const openTweetCreator = () => {
		dispatch({ type: "TWEET_OPEN" });
	};
	return (
		<>
			<header>
				<nav className="navbar">
					<li>
						<i className="fas fa-crow logo"></i>
					</li>
					<li>
						<i className="fas fa-home"></i> Home
					</li>
					<li>
						<i className="fas fa-hashtag"></i> Explore
					</li>
					<li>
						<i className="far fa-bell"></i> Notifications
					</li>
					<li>
						<i className="far fa-envelope"></i> Messages
					</li>
					<li>
						<i className="far fa-bookmark"></i> Bookmarks
					</li>
					<li>
						<i className="far fa-list-alt"></i> Lists
					</li>
					<li>
						<Link to={`/profile/${state.user.userHandle}`}>
							<i className="fas fa-user"></i> Profile
						</Link>
					</li>
					<li>
						<i className="fas fa-ellipsis-h"></i> More
					</li>
					<li>
						<Button onClick={openTweetCreator}>Tweet</Button>
					</li>
					<li>
						<UserChanger />
					</li>
				</nav>
			</header>
		</>
	);
});
