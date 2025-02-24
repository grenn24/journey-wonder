import { Button, Flex, Result, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { setForbidden } from "../../redux/slices/error";

const Forbidden = () => {
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
				status="403"
				title="Sorry, you do not have permission to access this page."
				subTitle="You may have followed the wrong link"
				extra={
					<Button
						type="primary"
						onClick={() => {
							dispatch(setForbidden(false));
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

export default Forbidden;
