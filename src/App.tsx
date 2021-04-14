/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "./styles/index.scss";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { AdditionalContent } from "./components/AdditionalContent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";

import { Main } from "./components/Main";
import { Header } from "./components/Header";
import { Connect } from "./components/Connect";
import { AppContext, defaultUser } from "./utils/AppContext";
import { CreateTweet } from "./components/CreateTweet";
import { useImmerReducer } from "use-immer";
import { appReducer } from "./utils/AppReducer";

const link = from([new HttpLink({ uri: "http://localhost:4000" })]);
const client = new ApolloClient({
	cache: new InMemoryCache({ addTypename: false }),
	link: link,
});

function App() {
	const [state, dispatch] = useImmerReducer<AppContextType>(appReducer, {
		isCreatingTweet: false,
		isLoggedIn: false,
		user: defaultUser,
	});

	// const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	// const [user, setUser] = useState<UserType>(defaultUser);

	return (
		<div className="App">
			<ApolloProvider client={client}>
				<AppContext.Provider value={{ state, dispatch }}>
					<Router>
						<Switch>
							<Route path="/" exact>
								{state.isLoggedIn ? (
									<>
										<Col lg={4} className="nopadding">
											<Header />
										</Col>
										<Col lg={4} className="nopadding">
											<Main />
										</Col>
										<Col lg={3} className="nopadding">
											<AdditionalContent />
										</Col>
										{state.isCreatingTweet ? <CreateTweet /> : null}
									</>
								) : (
									<Connect />
								)}
							</Route>
						</Switch>
					</Router>
				</AppContext.Provider>
			</ApolloProvider>
		</div>
	);
}

export default App;
