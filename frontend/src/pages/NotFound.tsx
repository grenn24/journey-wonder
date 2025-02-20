import { Button, Flex, Result } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
		<Flex
			justify="center"
			align="center"
			style={{ width: "100vw", height: "100vh" }}
		>
			<Result
				status="404"
				title="Sorry, this page isn't available."
				subTitle="You may have followed the wrong link, or the page may have been removed"
				extra={<Button type="primary" onClick={()=>navigate("/user")}>Return to Journey Wonder</Button>}
			/>
		</Flex>
  );
}

export default NotFound