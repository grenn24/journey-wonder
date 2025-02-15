import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Typography, theme } from "antd";
import Guest from "./layouts/Guest";
import Login from "./pages/Log-In";
import User from "./layouts/User";
import useTheme from "./styles/useTheme";

const { Text } = Typography;

const App = () => {
	const theme = useTheme();
	return (
		<ConfigProvider theme={theme}>
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
						<Route path="explore" />

						<Route path="journey">
							<Route path=":journeyID" />

							<Route path="upcoming" />
							<Route path="completed" />
							<Route path="deleted" />
						</Route>

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
