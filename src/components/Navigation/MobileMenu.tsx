import React from "react";
import "../../styles/mobile-menu.scss";
import { useAppContext } from "../lib/AppContext";
import { StateUserPicture } from "../Profile/StateUserPicture";
import { Header } from "./Header";
import { Person, CardList, BookmarkCheck, Newspaper } from "react-bootstrap-icons";

interface Props {}
export const MobileMenu: React.FC<Props> = () => {
	const { state } = useAppContext();
	return (
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
				<nav className="navbar">
					<ul>
						<li>
							<Person />
							Profile
						</li>
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
	);
};
