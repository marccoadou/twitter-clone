import React from "react";
import "../../styles/contextbar.scss";

interface Props {
	user: UserType;
}

export const ContextBar: React.FC<Props> = (props) => {
	return (
		<div className="context-bar">
			<a href="_">
				<i className="fas fa-long-arrow-alt-left"></i>
			</a>
			<div className="profile-context">
				<h4>{props?.user?.userHandle}</h4>
				<small> {props?.user?.userStats.totalRetweets} Tweets</small>
			</div>
		</div>
	);
};
