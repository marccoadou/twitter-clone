import React from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { AdditionalContent } from "./components/AdditionalContent";
import { Connect } from "./components/Connect";
import { Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/index.scss";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";

const link = from([new HttpLink({ uri: "http://localhost:4000" })]);
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: link,
});
function App() {
	return (
		<div className="App">
			<ApolloProvider client={client}>
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
				</Router>
			</ApolloProvider>
		</div>
	);
}

export default App;
