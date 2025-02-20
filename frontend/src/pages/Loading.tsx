import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Result } from 'antd';
import React from 'react'

const Loading = () => {
  return (
		<Flex justify="center" align="center" style={{ width: "100vw", height: "100vh" }}>
			<Result icon={<LoadingOutlined />} title="Journey Wonder" />
		</Flex>
  );
}

export default Loading