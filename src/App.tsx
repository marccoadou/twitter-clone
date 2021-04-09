import React from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { AdditionalContent } from "./components/AdditionalContent";
import { Col, Row } from "react-bootstrap";
import "./styles/index.scss";

function App() {
	return (
		<div className="App">
			<Row>
				<Col>
					<Header />
				</Col>
				<Col>
					<Main />
				</Col>
				<Col>
					<AdditionalContent />
				</Col>
			</Row>
		</div>
	);
}

export default App;
