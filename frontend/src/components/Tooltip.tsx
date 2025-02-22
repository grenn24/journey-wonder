import React, { JSX } from "react";
import { Tooltip as TooltipBase } from "antd";
import { LiteralUnion } from "antd/es/_util/type";
import { PresetColorType } from "antd/es/theme/internal";

type Color =
	| "blue"
	| "purple"
	| "cyan"
	| "green"
	| "magenta"
	| "pink"
	| "red"
	| "orange"
	| "yellow"
	| "volcano"
	| "geekblue"
	| "lime"
	| "gold";

interface Prop {
	children: JSX.Element;
	title: string;
	showArrow?: boolean;
	placement?:
		| "top"
		| "left"
		| "right"
		| "bottom"
		| "topLeft"
		| "topRight"
		| "bottomLeft"
		| "bottomRight"
		| "leftTop"
		| "leftBottom"
		| "rightTop"
		| "rightBottom";
	open?: boolean;
	color?: Color;
}
const Tooltip = ({
	children,
	title,
	showArrow = false,
	placement = "bottom",
    open,
    color
}: Prop) => {
	return (
		<TooltipBase
			title={title}
			arrow={showArrow}
			placement={placement}
			color={color}
			styles={{
				body: {
					fontSize: 15,
					opacity: 0.9,
					position: "relative",
					top: 5,
				},
			}}
            open={open}
		>{children}</TooltipBase>
	);
};

export default Tooltip;
