import {Flex, theme } from "antd";

import { JSX, useRef} from "react";
import "../../styles/image.css"
interface Prop {
	image: string | File;
	buttons?: JSX.Element[];
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties
}
const Image = ({ image, buttons, width, height = 200, style}: Prop) => {
	const imageViewerRef = useRef<HTMLDivElement>(null);
		const { token } = theme.useToken();

	const { borderRadius } = token;
	if (image instanceof File) {
		image = URL.createObjectURL(image);
	}
	return (
		<div>
			<div
				ref={imageViewerRef}
				style={{
					width: width,
					position: "relative",
					borderRadius: borderRadius,
					height: height,
					overflow: "hidden",
					...style,
				}}
			>
				<img
					src={image}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						maxWidth: "100%",
						maxHeight: "100%",
						objectFit: "contain",
						zIndex: 1,
					}}
				/>
				<img
					src={image}
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						maxWidth: "100%",
						maxHeight: "100%",
						objectFit: "fill",
						filter: "blur(9px) grayscale(50%) brightness(50%)",
						transform: "scale(1.5)",
						overflow: "hidden",
					}}
				/>
				<div
					className="buttons-container"
					style={{
						width: "100%",
						height: "100%",
						position: "absolute",
						padding: 9,
						zIndex: 2,
					}}
				>
					<Flex gap={5} justify="flex-end" align="center">
						{buttons}
					</Flex>
				</div>
			</div>
		</div>
	);
};

export default Image;
