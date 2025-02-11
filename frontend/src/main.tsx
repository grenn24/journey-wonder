import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import WebFont from "webfontloader";
import store from "./redux/store.ts";
import { Provider } from "react-redux";

WebFont.load({
	google: {
		families: ["Liter"],
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
