/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ToastProvider } from "react-toast-notifications";
import "./styles/index.scss";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";

import { AppContext, defaultUser } from "./components/lib/AppContext";
import { useImmerReducer } from "use-immer";
import { appReducer } from "./components/lib/AppReducer";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

const link = from([new HttpLink({ uri: "http://localhost:4000" })]);
const client = new ApolloClient({
	connectToDevTools: true,
	cache: new InMemoryCache({
		addTypename: true,
		typePolicies: {
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
		sideBar: false,
	});

	return (
		<div className="App">
			<ApolloProvider client={client}>
				<AppContext.Provider value={{ state, dispatch }}>
					<BrowserRouter>
						<ToastProvider>
							<App />
						</ToastProvider>
					</BrowserRouter>
				</AppContext.Provider>
			</ApolloProvider>
		</div>
	);
}
export default AppContextWrapper;
