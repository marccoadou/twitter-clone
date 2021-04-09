import React from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { AdditionalContent } from "./components/AdditionalContent";
import { Connect } from "./components/Connect";
import { Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/index.scss";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact>
						<Connect />
					</Route>
					<Route path="/home">
						<Col lg={4} className="nopadding">
							<Header />
						</Col>
						<Col lg={4} className="nopadding">
							<Main />
						</Col>
						<Col lg={3} className="nopadding">
							<AdditionalContent />
						</Col>
					</Route>
				</Switch>
				{/* <Row style={{width:100vw}}> */}
			</Router>
		</div>
	);
}

export default App;
