import { ClearRounded } from "@mui/icons-material";
import { Button } from "antd";
import React from "react";

interface Prop {
	handleButtonClick: () => void;
	variant?: "link" | "text" | "outlined" | "dashed" | "solid" | "filled";
    style?:React.CSSProperties
}
const CloseButton = ({ handleButtonClick, variant="filled" ,style}: Prop) => {
	return (
		<Button
			variant={variant}
			color="default"
			icon={<ClearRounded />}
			onClick={() => handleButtonClick()}
            style={style}
		/>
	);
};

export default CloseButton;
