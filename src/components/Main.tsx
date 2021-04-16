import React from "react";
import { Profile } from "./Profile";
import { ProfileFeed } from "./ProfileFeed";
import { ContextBar } from "./ContextBar";
import { Header } from "./Header";
import { Col } from "react-bootstrap";
import { AdditionalContent } from "./AdditionalContent";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const Main = () => {
	return (
		<>
			<Col lg={4} className="nopadding">
				<Header />
			</Col>
			<Col lg={4} className="nopadding">
				<ContextBar />
				<Profile />
				<ProfileFeed />
			</Col>
			<Col lg={3} className="nopadding">
				<AdditionalContent />
			</Col>
		</>
	);
};
