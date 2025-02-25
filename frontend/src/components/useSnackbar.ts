import { message as messageBase } from "antd";
import React from "react";
import { v4 as uuidv4 } from "uuid";

// Function that provides snackbar context and creator
const useSnackbar = () => {
	const [messageApi, snackbarContext] = messageBase.useMessage();
	const createSnackbar = (
		message: string,
		type: "info" | "success" | "error" | "warning" | "loading" = "info",
		duration: number | undefined = undefined,
		style: React.CSSProperties | undefined = undefined
	) => {
		const key = uuidv4();
		return [
			() => {
				messageApi.open({
					key,
					type: type === "info" ? undefined : type,
					content: message,
					duration: duration,
					style: style,
				});
			},
			() => {
				messageApi.destroy(key);
			},
		];
	};

	const closeAllSnackbars = () => messageApi.destroy();

	return { createSnackbar, snackbarContext, closeAllSnackbars };
};

export default useSnackbar;
