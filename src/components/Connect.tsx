// import { Link } from "react-router-dom";

import "../styles/connect.scss";
import { SignUp } from "./SignUp";
import { Login } from "./Login";

export const Connect = () => {
	return (
		<>
			<Login />
			<SignUp />
		</>
	);
};
