import React from "react";

interface Props {
	id: string;
	statistics: TweetStatsType;
}
export const ShareButton: React.FC<Props> = () => {
	return (
		<>
			<div className="share-icon">
				<i className="fas fa-share"></i>
			</div>
		</>
	);
};
