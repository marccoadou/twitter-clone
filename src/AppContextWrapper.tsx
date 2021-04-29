/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "./styles/index.scss";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";

import { AppContext, defaultUser } from "./components/UtilsComponent/AppContext";
import { useImmerReducer } from "use-immer";
import { appReducer } from "./components/UtilsComponent/AppReducer";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

const link = from([new HttpLink({ uri: "http://localhost:4000" })]);
const client = new ApolloClient({
	connectToDevTools: true,
	cache: new InMemoryCache({
		addTypename: true,
		typePolicies: {
			// User: {
			// 	keyFields: [["id", "userHandle", ["id"]]],
			// 	merge: false,
			// },
			Tweet: {
				keyFields: ["id"],
			},
		},
	}),
	link: link,
});

function AppContextWrapper() {
	const [state, dispatch] = useImmerReducer<AppContextType>(appReducer, {
		isCreatingTweet: false,
		isLoggedIn: false,
		refreshFeed: false,
		user: defaultUser,
	});

	return (
		<div className="App">
			<ApolloProvider client={client}>
				<AppContext.Provider value={{ state, dispatch }}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</AppContext.Provider>
			</ApolloProvider>
		</div>
	);
}
export default AppContextWrapper;
