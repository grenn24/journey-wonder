import { Modal as ModalBase } from "antd/es";
import { JSX } from "react";

interface Prop {
	open: boolean;
	setOpen: (value: boolean) => void;
	centered?: boolean;
	width?: string | number;
	height?: string | number;
	title?: string | JSX.Element;
	footer?:
		| JSX.Element[]
		| JSX.Element
		| ((
				originNode: React.ReactNode,
				extra: {
					OkBtn: React.FC;
					CancelBtn: React.FC;
				}
		  ) => JSX.Element);
	children: JSX.Element;
	style?: {
		header?: React.CSSProperties;
		body?: React.CSSProperties;
		footer?: React.CSSProperties;
		wrapper?: React.CSSProperties;
	};
	closeIcon?: boolean | JSX.Element;
}
const Modal = ({
	open,
	setOpen,
	centered = true,
	width,
	height,
	title,
	children,
	footer,
	style,
	closeIcon = false,
}: Prop) => {
	return (
		<ModalBase
			open={open}
			onCancel={() => setOpen(false)}
			onClose={() => setOpen(false)}
			closeIcon={closeIcon}
			centered={centered}
			title={title}
			styles={{
				header: {},
				body: {},
				footer: {},
				wrapper: {
					backdropFilter: `blur(5px)`,
					//background: "rgba(0, 0, 0, 0.3)"
				},
				...style,
			}}
			width={width}
			height={height}
			footer={footer}
		>
			{children}
		</ModalBase>
	);
};

export default Modal;
