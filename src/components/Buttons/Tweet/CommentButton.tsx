import React from "react";

interface Props {
	id: string;
	statistics: TweetStatsType;
}
export const CommentButton: React.FC<Props> = ({ id, statistics }) => {
	return (
		<>
			<div className="comment-icon">
				<i className="fas fa-comment"></i>
				<span className="numbers"> {statistics?.commentsNbr}</span>
			</div>
		</>
	);
};
