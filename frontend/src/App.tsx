import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Typography, theme } from "antd";
import useTheme from "./styles/useTheme";
import ProtectedRoutes from "./components/ProtectedRoutes";

import { lazy, Suspense } from "react";
import Loading from "./pages/Loading";
const Login = lazy(() => import("./pages/Log-In"));
const Home = lazy(() => import("./pages/Home"));
const UserHome = lazy(() => import("./pages/user/Home"));
const NotFound = lazy(() => import("./pages//NotFound"));
const Guest = lazy(() => import("./layouts/Guest"));
const User = lazy(() => import("./layouts/User"));

const App = () => {
	const theme = useTheme();
	return (
		<ConfigProvider theme={theme}>
			<BrowserRouter>
				<Suspense fallback={<Loading />}>
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
									<Route path=":journeyID" />

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
				</Suspense>
			</BrowserRouter>
		</ConfigProvider>
	);
};

export default App;
