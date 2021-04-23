import React from "react";

interface Props {}
export const DropCard: React.FC<Props> = (props) => {
	return <div className="dropdown-content arrow">{props.children}</div>;
};
