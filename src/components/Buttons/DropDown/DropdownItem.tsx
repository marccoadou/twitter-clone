import React from "react";

interface Props {}
export const DropdownItem: React.FC<Props> = (props) => {
	return <div className="dropdown-item">{props.children}</div>;
};
