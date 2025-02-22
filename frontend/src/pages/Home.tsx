import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import authService from "../services/auth";

const Home = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.getItem("X-Access-Token")) {
			setIsAuthenticated(true);
		} else {
			// runs once every component mount only
			authService
				.refreshAccessToken()
				.then(() => {
					navigate("/user");
				})
				.catch(({ status }) => {
					if (status === 400) {
						setIsAuthenticated(false);
						navigate("/guest");
					}
				});
		}
	}, []);

	if (isAuthenticated === null) {
		return <Loading />;
	} 
};

export default Home;
