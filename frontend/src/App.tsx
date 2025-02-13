import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./redux/store";
import "./styles/App.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Typography, theme } from "antd";
import Guest from "./layouts/Guest";
import Login from "./pages/Log-In";
import User from "./layouts/User";

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
				token: { fontFamily: "Liter", borderRadius: 16 },
			}}
		>
			<BrowserRouter>
				<Routes>
					{/*Non-protected routes*/}
					<Route index />
					<Route path="guest" element={<Guest />}>
						<Route path="about" />
						<Route path="pricing" />
						<Route path="explore" />
					</Route>
					<Route path="guest/account">
						<Route path="log-in" element={<Login />} />
						<Route path="sign-up" />
					</Route>
					{/*Protected routes*/}
					<Route path="user" element={<User />}>
						<Route index />
						<Route path="create" />
						<Route path="upcoming" />
						<Route path="completed" />
						<Route path="deleted" />
						<Route path="profile" />
						<Route path="settings" />
					</Route>
					{/*Missed routes*/}
					<Route path="*" />
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
