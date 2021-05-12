import React from "react";
import { Link } from "react-router-dom";
import { PencilSquare } from "react-bootstrap-icons";

import { useAppContext } from "../../lib/AppContext";

export const CreateTweetButton = () => {
	return (
		<Link to="/compose/tweet">
			<button className="btn-primary create-tweet-button">
				<PencilSquare height="1.5rem" width="1.5rem" />
			</button>
		</Link>
	);
};
