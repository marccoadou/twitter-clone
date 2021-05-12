import React from "react";

interface Props {}
export const NotFound: React.FC<Props> = () => {
	return (
		<>
			<h3>404</h3>
			<p>in case you intend to use this website anyways, you can access profiles : /profile/</p>
			<div>
				<ul>
					<li>sunsetfromdowntown</li>
					<li>jackiechan</li>
					<li>antoinedubois</li>
				</ul>
			</div>
		</>
	);
};
