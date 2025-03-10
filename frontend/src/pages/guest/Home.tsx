import { theme } from 'antd';
import React from 'react'

const GuestHome = () => {
  const {
		token: { colorBgContainer },
  } = theme.useToken();
  return (
		<div
			style={{
				width: "100dvw",
				height: "100%",
				backgroundColor: colorBgContainer,
				position: "relative",
				top: 70,
			}}
		>
			Home
		</div>
  );
}

export default GuestHome;