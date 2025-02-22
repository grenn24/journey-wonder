import { Button, Flex, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
	const navigate = useNavigate();
	return (
		<Flex
			justify="center"
			align="center"
			style={{ width: "100vw", height: "100vh" }}
		>
			<Result
				status="403"
				title="Sorry, you do not have permission to access this page."
				subTitle="You may have followed the wrong link"
				extra={
					<Button type="primary" onClick={() => navigate("/")}>
						Return to Journey Wonder
					</Button>
				}
			/>
		</Flex>
	);
};

export default Forbidden;
