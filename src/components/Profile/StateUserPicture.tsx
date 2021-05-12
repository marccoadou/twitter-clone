import React from "react";
import DefaultUserIcon from "../../img/default_profile_400x400.png";
import { Image } from "react-bootstrap";

interface Props {
	width?: number;
	height?: number;
	className: string;
}

export const StateUserPicture: React.FC<Props> = ({ width = 48, height = 48, className }) => {
	return (
		<>
			<Image
				width={width}
				height={height}
				className={`mr-3 ${className}`}
				src={DefaultUserIcon}
				alt="Generic placeholder"
				roundedCircle
			/>
		</>
	);
};
