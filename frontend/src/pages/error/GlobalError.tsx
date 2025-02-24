import { lazy } from "react";
import { useAppSelector } from "../../redux/store";
const Forbidden = lazy(() => import("./Forbidden"));
const NotFound = lazy(() => import("./NotFound"));
const InternalServerError = lazy(() => import("./InternalServerError"));

const GlobalError = () => {
	const { forbidden, notFound, internalServerError } = useAppSelector(
		(state) => ({
			forbidden: state.error?.internalServerError,
			notFound: state.error?.notFound,
			internalServerError: state.error?.internalServerError,
		})
	);
	if (forbidden) {
		return <Forbidden />;
	} else if (notFound) {
		return <NotFound />;
	} else if (internalServerError) {
		return <InternalServerError />;
	} else {
		return null;
	}
};

export default GlobalError;
