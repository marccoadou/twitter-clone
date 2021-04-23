import React, { useState } from "react";
import { DropCard } from "./DropCard";
import "../../../styles/dropdown.scss";

interface Props {
	title: string;
}

export const DropDown: React.FC<Props> = (props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const openMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<div className="dropdown">
			<button className="dropdown-button" onClick={openMenu}>
				{props.title}
			</button>
			{isMenuOpen ? <DropCard>{props.children}</DropCard> : null}
		</div>
	);
};
