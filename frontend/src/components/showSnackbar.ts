import { message as messageBase } from "antd";
import React, { ReactElement } from "react";

const useSnackbar = (
	message: string,
	type: "info" | "success" | "error" | "warning" = "info",
	duration: number | undefined = undefined,
	style: React.CSSProperties | undefined = undefined
): [(...args: any[]) => void, ReactElement] => {
	const [messageApi, context] = messageBase.useMessage();
	const showSnackbar = () => {
		messageApi.open({
			type: type === "info" ? undefined : type,
			content: message,
			duration: duration,
			style: style,
		});
	};

	return [showSnackbar, context];
};

export default useSnackbar;
