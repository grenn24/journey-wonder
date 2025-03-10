import {  NotificationsNoneRounded } from "@mui/icons-material";
import { Button, Empty, Flex, Popover, Typography } from "antd";
import { useState } from "react";
import "../../assets/styles/ant.css";
import CloseButton from "../../components/CloseButton";
import i18n from "../../i18n";
import useBreakpoints from "../../utilities/breakpoints";

const { Text, Title } = Typography;
const NotificationButton = () => {
	const [openNotificationPopover, setOpenNotificationPopover] =
		useState(false);
		const breakpoints = useBreakpoints();
	return (
		<Popover
			content={
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={
						<Text>{i18n.t("No notifications for now")}</Text>
					}
				/>
			}
			title={
				<Flex justify="space-between" align="center">
					<Title level={4} style={{ margin: 0 }}>
						{i18n.t("Notifications")}
					</Title>
					<CloseButton
						handleButtonClick={() =>
							setOpenNotificationPopover(false)
						}
					/>
				</Flex>
			}
			style={{ padding: "20px" }}
			styles={{ body: { marginRight:breakpoints.smallerThan("sm") ? 10 : 10, width:breakpoints.smallerThan("sm") ? 350 : undefined} }}
			className="ant-popover-inner "
			trigger="click"
			placement="bottom"
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
