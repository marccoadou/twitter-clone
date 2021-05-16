import React from "react";
import { Chat } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

interface Props {
	id: string;
	statistics: TweetStatsType;
}
export const CommentButton: React.FunctionComponent<Props> = ({ id, statistics }) => {
	return (
		<Link to={`/tweet/${id}/reply`} className="no-hyperlink">
			<div className="comment-icon">
				<Chat />
				<span className="numbers"> {statistics?.commentsNbr}</span>
			</div>
		</Link>
	);
};
