import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ChatProvider } from "./context/chatContext.jsx"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		
		<ChatProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
		</ChatProvider>
		
	</React.StrictMode>
);