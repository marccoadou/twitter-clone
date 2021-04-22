import React from "react";
interface Props {
	id: string;
	statistics: TweetStatsType;
}
export const RetweetButton: React.FC<Props> = ({ id, statistics }) => {
	return (
		<>
			<div className="retweet-icon">
				<i className="fas fa-exchange-alt"></i>
				<span className="numbers"> {statistics.retweets}</span>
			</div>
		</>
	);
};
