import { Button, Flex, theme } from "antd";
import { RcFile } from "antd/es/upload";
import { AnimatePresence, motion } from "motion/react";
import { JSX, useEffect, useRef, useState } from "react";
import { Image as ImageBase } from "antd";
import useTheme from "../styles/useTheme";
interface Prop {
	image?: string | File | RcFile;
	buttons?: JSX.Element[];
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties
}
const Image = ({ image, buttons, width, height = 200, style}: Prop) => {
	const imageViewerRef = useRef<HTMLDivElement>(null);
	const [showButtons, setShowButtons] = useState(false);
		const { token } = theme.useToken();

	const { borderRadius } = token;
	if (image instanceof Object) {
		image = URL.createObjectURL(image);
	}
	useEffect(() => {
		if (imageViewerRef.current) {
			imageViewerRef.current.onmouseenter = () => setShowButtons(true);
			imageViewerRef.current.onmouseleave = () => setShowButtons(false);
		}
		setShowButtons(false);
		return () => {
			if (imageViewerRef.current) {
				imageViewerRef.current.removeEventListener("mouseenter", () =>
					setShowButtons(true)
				);
				imageViewerRef.current.removeEventListener("mouseleave", () =>
					setShowButtons(false)
				);
			}
		};
	}, []);
	return (
		<div
			ref={imageViewerRef}
			style={{
				width: width,
				position: "relative",
				borderRadius: borderRadius,
				height: height,
				overflow: "hidden",
                ...style
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
			<AnimatePresence>
				{showButtons && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						<div
							style={{
								boxSizing: "border-box",
								width: "100%",
								position: "absolute",
								padding: 9,
								zIndex: 2,
							}}
						>
							<Flex gap={5} justify="flex-end" align="center">
								{buttons}
							</Flex>
		
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Image;
