import { ClearRounded } from "@mui/icons-material";
import { Button, theme } from "antd";
import React from "react";

interface Prop {
	handleButtonClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	variant?: "link" | "text" | "outlined" | "dashed" | "solid" | "filled";
	style?: React.CSSProperties;
	size?: "small" | "large";
}
const CloseButton = ({ handleButtonClick, variant="filled" ,style, size}: Prop) => {
		const { token } = theme.useToken();
		const {
		colorIcon
		} = token;
	return (
		<Button
			variant={variant}
			color="default"
			size={size}
			icon={
				<ClearRounded fontSize={size ? "medium": "small"} style={{ color: colorIcon }} />
			}
			onClick={(e) => handleButtonClick(e)}
			style={{ ...style, flexShrink: 0 }}
		/>
	);
};

export default CloseButton;
