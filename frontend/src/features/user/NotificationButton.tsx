import { ClearRounded, NotificationsNoneRounded } from "@mui/icons-material";
import { Button, Empty, Flex, Popover, Typography } from "antd";
import React, { useState } from "react";
import "../../styles/ant.css";
import CloseButton from "../../components/CloseButton";

const { Text, Title } = Typography;
const NotificationButton = () => {
	const [openNotificationPopover, setOpenNotificationPopover] =
		useState(false);
	return (
		<Popover
			content={
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={<Text>No notifications for now</Text>}
				/>
			}
			title={
				<Flex justify="space-between" align="center">
					<Title level={4} style={{ margin: 0 }}>
						Notifications
					</Title>
					<CloseButton
						handleButtonClick={() =>
							setOpenNotificationPopover(false)
						}
					/>
				</Flex>
			}
			style={{ padding: "20px" }}
			className="ant-popover-inner "
			trigger="click"
			placement="bottomRight"
			open={openNotificationPopover}
			onOpenChange={(value: boolean) => setOpenNotificationPopover(value)}
		>
			<Button
				size="large"
				variant="filled"
				color="default"
				icon={<NotificationsNoneRounded style={{ fontSize: 22 }} />}
				style={{ flexShrink: 0 }}
			/>
		</Popover>
	);
};

export default NotificationButton;
