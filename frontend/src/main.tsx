import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./i18n";
import App from "./App.tsx";
import store, { persistor } from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/*
WebFont.load({
	google: {
		families: [
			"Liter",
			"Roboto",
			"Noto Sans",
			"Noto Sans JP",
			"Noto Sans SC",
			"Nunito"
		],
	},
});
*/

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</StrictMode>
);
