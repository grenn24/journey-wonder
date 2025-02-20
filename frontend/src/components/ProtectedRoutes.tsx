import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/auth";
import { useEffect, useState } from "react";
import Loading from "../pages/Loading";

const ProtectedRoutes = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		if (sessionStorage.getItem("X-Access-Token")) {
			setIsAuthenticated(true);
		} else {
			// runs once every component mount only
			authService.refreshAccessToken().catch(({ status }) => {
				if (status === 400) {
					setIsAuthenticated(false);
				} else {
					setIsAuthenticated(true);
				}
			});
		}
	}, []);

	if (isAuthenticated === null) {
		return <Loading />;
	}
	return isAuthenticated ? <Outlet /> : <Navigate replace to="/guest" />;
};

export default ProtectedRoutes;
