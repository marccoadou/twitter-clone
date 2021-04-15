/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import "./styles/index.scss";
import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from "@apollo/client";

import { AppContext, defaultUser } from "./utils/AppContext";
import { useImmerReducer } from "use-immer";
import { appReducer } from "./utils/AppReducer";
import { App } from "./App";

const link = from([new HttpLink({ uri: "http://localhost:4000" })]);
const client = new ApolloClient({
	cache: new InMemoryCache({ addTypename: false }),
	link: link,
});

function AppContextWrapper() {
	const [state, dispatch] = useImmerReducer<AppContextType>(appReducer, {
		isCreatingTweet: false,
		isLoggedIn: false,
		user: defaultUser,
	});

	return (
		<div className="App">
			<ApolloProvider client={client}>
				<AppContext.Provider value={{ state, dispatch }}>
					<App />
				</AppContext.Provider>
			</ApolloProvider>
		</div>
	);
}
export default AppContextWrapper;