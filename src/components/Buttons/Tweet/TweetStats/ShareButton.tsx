import React from "react";
import { Share } from "react-bootstrap-icons";

interface Props {
	id: string;
	statistics: TweetStatsType;
}
export const ShareButton: React.FC<Props> = () => {
	return (
		<>
			<div className="share-icon">
				<Share />
			</div>
		</>
	);
};
