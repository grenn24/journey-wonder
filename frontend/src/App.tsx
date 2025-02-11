import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/store";
import "./styles/App.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Typography, theme } from "antd";
import Guest from "./layouts/Guest";
import Login from "./pages/Log-In";

const { Text } = Typography;

const App = () => {
	const { globalTheme } = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
	}));
	return (
		<ConfigProvider
			theme={{
				algorithm:
					globalTheme === "light"
						? theme.defaultAlgorithm
						: theme.darkAlgorithm,
				token: { fontFamily: "Liter", borderRadius: 16},
			}}
		>
			<BrowserRouter>
				<Routes>
					{/*Non-protected routes*/}
					<Route index></Route>
					<Route path="guest" element={<Guest />}>
						<Route path="about"></Route>
						<Route path="pricing"></Route>
						<Route path="explore"></Route>
					</Route>
					<Route path="guest/account">
						<Route path="log-in" element={<Login />}></Route>
						<Route path="sign-up"></Route>
					</Route>
					{/*Protected routes*/}
					<Route path="user">
						<Route index></Route>
						<Route path="settings"></Route>
					</Route>
					{/*Missed routes*/}
					<Route path="*" />
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
