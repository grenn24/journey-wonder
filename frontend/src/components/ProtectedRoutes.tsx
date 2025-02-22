import { Navigate, Outlet, useNavigate } from "react-router-dom";
import authService from "../services/auth";
import { Suspense, useEffect, useState } from "react";
import Loading from "../pages/Loading";

const ProtectedRoutes = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.getItem("X-Access-Token")) {
			setIsAuthenticated(true);
		} else {
			// runs once every component mount only
			authService.refreshAccessToken().catch(({ status }) => {
				if (status === 400) {
					setIsAuthenticated(false);
					navigate("/guest");
				}
			});
		}
	}, []);

	if (isAuthenticated === null) {
		return (
			<Suspense fallback={<Loading />}>
				<Loading />
			</Suspense>
		);
	} else if (isAuthenticated) {
		return (
			<Suspense fallback={<Loading />}>
				<Outlet />
			</Suspense>
		);
	} else {
		return <Navigate replace to="/guest" />;
	}
};

export default ProtectedRoutes;
