import React from "react";
import "../../styles/mobile-menu.scss";
import { useAppContext } from "../lib/AppContext";
import { StateUserPicture } from "../Profile/StateUserPicture";
import { Header } from "./Header";
import { Link } from "react-router-dom";
import { Person, CardList, BookmarkCheck, Newspaper } from "react-bootstrap-icons";

interface Props {}
export const MobileMenu: React.FC<Props> = () => {
	const { state, dispatch } = useAppContext();

	const closeMenu = () => {
		dispatch({ type: "SIDEBAR_CLOSE" });
	};

	return (
		<div className="fullscreen-touch" onClick={closeMenu}>
			<div className="mobile-menu">
				<div className="user">
					<StateUserPicture className="" />
					<h6>{state.user.username}</h6>
					<small>{state.user.userHandle}</small>
					<div className="user-stats">
						<small>{state.user.following.length} Following</small>
					</div>
				</div>
				<header>
					<nav className="navbar-menu">
						<ul>
							<Link to={`/${state.user.userHandle}`}>
								<li>
									<Person />
									Profile
								</li>
							</Link>
							<li>
								<CardList />
								Lists
							</li>
							<li>
								<BookmarkCheck />
								Bookmarks
							</li>
						</ul>
					</nav>
				</header>
			</div>
		</div>
	);
};
