import React from "react";
import ReactDOM from "react-dom";

import AppContextWrapper from "./AppContextWrapper";

ReactDOM.render(
	<React.StrictMode>
		<AppContextWrapper />
	</React.StrictMode>,
	document.getElementById("root")
);
