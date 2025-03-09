import { Box } from "@mui/material";
import {
	NavigateBeforeRounded,
	NavigateNextRounded,
} from "@mui/icons-material";
import { Button, Flex } from "antd";
import React, { JSX, useRef, useState } from "react";
import "../assets/styles/scrollableDiv.css";
import useBreakpoints from "../utilities/breakpoints";

interface Prop {
	height: number;
	borderRadius?: number;
	backgroundColor?: string;
	children: JSX.Element[];
	style?: React.CSSProperties;
}

// Div for horizontal scrolling of elements
const ScrollableDiv = ({
	children,
	height,
	borderRadius,
	backgroundColor,
	style,
}: Prop) => {
	const mediaViewerRef = useRef<HTMLDivElement>(null);
	const [isScrolling, setIsScrolling] = useState(false);
	const scrollLeft = () => {
		if (!isScrolling) {
			setIsScrolling(true);
			mediaViewerRef.current?.scrollBy({
				left: -mediaViewerRef.current.clientWidth,
				behavior: "smooth",
			});

			setTimeout(() => setIsScrolling(false), 550);
		}
	};

	const scrollRight = () => {
		if (!isScrolling) {
			setIsScrolling(true);
			mediaViewerRef.current?.scrollBy({
				left: mediaViewerRef.current.clientWidth,
				behavior: "smooth",
			});

			setTimeout(() => setIsScrolling(false), 550);
		}
	};
	const breakpoints = useBreakpoints();

	return (
		<Flex
			align="center"
			style={{ ...style, position: "relative", height: height }}
			className="scrollable-div"
		>
			{mediaViewerRef.current?.scrollLeft ? (
				<Button
					className="left-button"
					icon={<NavigateBeforeRounded />}
					variant="solid"
					color="default"
					size="small"
					onClick={(e) => {
						e.stopPropagation();
						scrollLeft();
					}}
					style={{
						display: breakpoints.largerThan("md") ? "flex" : "none",
						position: "absolute",
						left: -15,
						zIndex: 2,
					}}
				/>
			) : null}

			<Box
				width="100%"
				height="auto"
				overflow="auto"
				display="flex"
				flexDirection="row"
				alignItems="center"
				sx={{
					backgroundColor: backgroundColor,
					"::-webkit-scrollbar": {
						display: "none",
					},
				}}
				position="absolute"
				ref={mediaViewerRef}
				borderRadius={borderRadius}
				zIndex={1}
			>
				{children}
			</Box>
			{!mediaViewerRef.current?.scrollLeft ? (
				<Button
					className="right-button"
					icon={<NavigateNextRounded />}
					variant="solid"
					color="default"
					size="small"
					onClick={(e) => {
						e.stopPropagation();
						scrollRight();
					}}
					style={{
						display: breakpoints.largerThan("md") ? "flex" : "none",
						position: "absolute",
						right: -15,
						zIndex: 2,
					}}
				/>
			) : null}
			{/*Box for left and right scroll buttons (only show for screens larger than or equal to md size)*/}
		</Flex>
	);
};

export default ScrollableDiv;
