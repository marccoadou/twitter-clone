import React from "react";
import { Chat } from "react-bootstrap-icons";

interface Props {
	id: string;
	statistics: TweetStatsType;
}
export const CommentButton: React.FC<Props> = ({ id, statistics }) => {
	return (
		<>
			<div className="comment-icon">
				<Chat />
				<span className="numbers"> {statistics?.commentsNbr}</span>
			</div>
		</>
	);
};
