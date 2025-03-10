import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/app.css";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import useTheme from "./assets/styles/useTheme";
import ProtectedRoutes from "./components/ProtectedRoutes";

import { lazy } from "react";
import Journey from "./pages/user/Journey";
import SignUp from "./pages/Sign-Up";
import Explore from "./pages/user/Explore";
import GuestPricing from "./pages/guest/Pricing";
import UserPricing from "./pages/user/Pricing"
import GuestHome from "./pages/guest/Home";
import Mission from "./pages/user/Mission";
import Creators from "./pages/guest/Creators";
import Login from "./pages/Log-In";
const Home = lazy(() => import("./pages/Home"));
const UserHome = lazy(() => import("./pages/user/Home"));
const NotFound = lazy(() => import("./pages/error/NotFound"));
const GuestLayout = lazy(() => import("./layouts/Guest"));
const UserLayout = lazy(() => import("./layouts/User"));

const App = () => {
	const theme = useTheme();
	return (
		<ConfigProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					{/*Non-protected routes*/}
					<Route index element={<Home />} />
					<Route path="guest" element={<GuestLayout />}>
						<Route index element={<GuestHome />} />
						<Route path="about" />
						<Route path="pricing" element={<GuestPricing />} />
						<Route path="explore" element={<Explore />} />
						<Route path="about">
							<Route path="mission" element={<Mission />} />
							<Route path="creators" element={<Creators />} />
						</Route>
					</Route>
					<Route path="guest/account">
						<Route path="log-in" element={<Login />} />
						<Route path="sign-up" element={<SignUp />} />
					</Route>
					{/*Protected routes*/}
					<Route path="user" element={<ProtectedRoutes />}>
						<Route element={<UserLayout />}>
							<Route index element={<UserHome />} />
							<Route path="explore" element={<Explore />} />

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
							<Route path="pricing" element={<UserPricing />} />
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
