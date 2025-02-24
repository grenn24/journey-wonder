import { Button, Flex, Result, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { setNotFound } from "../../redux/slices/error";

const NotFound = () => {
	const navigate = useNavigate();
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const dispatch = useAppDispatch();

	return (
		<Flex
			justify="center"
			align="center"
			style={{
				width: "100vw",
				height: "100vh",
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 1500,
				backgroundColor: colorBgContainer,
			}}
		>
			<Result
				status="404"
				title="Sorry, this page isn't available."
				subTitle="You may have followed the wrong link, or the page may have been removed"
				extra={
					<Button
						type="primary"
						onClick={() => {
							dispatch(setNotFound(false));
							navigate("/");
						}}
					>
						Return to Journey Wonder
					</Button>
				}
			/>
		</Flex>
	);
};

export default NotFound;
