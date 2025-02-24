import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/app.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import useTheme from "./styles/useTheme";
import ProtectedRoutes from "./components/ProtectedRoutes";

import { lazy} from "react";
import Journey from "./pages/user/Journey";
const Login = lazy(() => import("./pages/Log-In"));
const Home = lazy(() => import("./pages/Home"));
const UserHome = lazy(() => import("./pages/user/Home"));
const NotFound = lazy(() => import("./pages/error/NotFound"));
const Guest = lazy(() => import("./layouts/Guest"));
const User = lazy(() => import("./layouts/User"));

const App = () => {
	const theme = useTheme();
	return (
		<ConfigProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					{/*Non-protected routes*/}
					<Route index element={<Home />} />
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
					<Route element={<ProtectedRoutes />}>
						<Route path="user" element={<User />}>
							<Route index element={<UserHome />} />
							<Route path="explore" />

							<Route path="journey">
								<Route
									path=":journeyID"
									element={<Journey />}
								/>

								<Route path="upcoming" />
								<Route path="completed" />
								<Route path="deleted" />
							</Route>

							<Route path="profile" />
							<Route path="settings" />
						</Route>
					</Route>
					{/*Missed routes*/}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
