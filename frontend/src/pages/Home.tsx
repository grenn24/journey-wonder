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
			navigate("/user")
		}
	}, []);

	if (isAuthenticated === null) {
		return <Loading />;
	} 
};

export default Home;
