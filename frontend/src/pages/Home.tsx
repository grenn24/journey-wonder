import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import authService from "../services/auth";

const Home = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		sessionStorage.getItem("X-Access-Token") ? true : null
	);
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated === null) {
			authService
				.refreshAccessToken()
				.then(() => {
					setIsAuthenticated(true);
					navigate("/user");
				})
				.catch(({ status }) => {
					if (status === 400) {
						setIsAuthenticated(false);
						navigate("/guest");
					}
				});
		}
		if (isAuthenticated) {
			navigate("/user");
		}
	}, [isAuthenticated]);

	if (isAuthenticated === null) {
		return <Loading />;
	} else if (isAuthenticated) {
		navigate("/user");
	} else {
		navigate("/guest");
	}
};

export default Home;
