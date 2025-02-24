import { Navigate, Outlet, useNavigate } from "react-router-dom";
import authService from "../services/auth";
import { useEffect, useState } from "react";
import Loading from "../pages/Loading";

const ProtectedRoutes = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		sessionStorage.getItem("X-Access-Token") ? true : null
	);
	const navigate = useNavigate();


	useEffect(() => {
		if (isAuthenticated === null) {
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
	
				<Loading />

		);
	} else if (isAuthenticated) {
		return (
			<Outlet />
		);
	} else {
		return <Navigate replace to="/guest" />;
	}
};

export default ProtectedRoutes;
