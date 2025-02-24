import {

	KeyboardVoiceRounded,
	WestRounded,
} from "@mui/icons-material";
import {

	Button,
	Drawer,
	Flex,
	Input,
	InputRef,
	Layout,
	List,
	theme,
 
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import  { useRef, useState } from "react";
import CloseButton from "./CloseButton";

const data = [
	"Racing car sprays burning fuel into crowd.",
	"Japanese princess to wed commoner.",
	"Australian walks 100km after outback crash.",
	"Man charged over missing wedding girl.",
	"Los Angeles battles huge wildfires.",
];

interface Prop {
	openExploreJourneysDrawer: boolean;
	setOpenExploreJourneysDrawer: (value: boolean) => void;
}

const ExploreJourneysDrawer = ({
	openExploreJourneysDrawer,
	setOpenExploreJourneysDrawer,
}: Prop) => {
	const {
		token: {
			colorBgContainer,
		},
	} = theme.useToken();
	const inputRef = useRef<InputRef>(null);
	const [inputValue, setInputValue] = useState("");
	return (
		<Drawer
			onClose={() => setOpenExploreJourneysDrawer(false)}
			open={openExploreJourneysDrawer}
			width="100vw"
			styles={{
				body: {
					padding: "0px 0px",
				},
			}}
			closable={false}
		>
			<Layout
				style={{
					height: "100%",
					padding: "0px 0px",
					backgroundColor: colorBgContainer,
				}}
			>
				<Header
					style={{
						padding: "15px 10px",
						backgroundColor: colorBgContainer,
					}}
				>
					<Flex justify="space-between" align="center" gap={10}>
						<Button
							size="large"
							variant="text"
							color="default"
							icon={<WestRounded />}
							onClick={() => setOpenExploreJourneysDrawer(false)}
							style={{ flexShrink: 0 }}
						/>

						<Input
							ref={inputRef}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							size="large"
							variant="filled"
							placeholder="Ask JourneyWonder AI"
						/>
						{inputValue ? (
							<CloseButton
								size="large"
								handleButtonClick={() => setInputValue("")}
							/>
						) : (
							<Button
								size="large"
								variant="filled"
								color="default"
								style={{ flexShrink: 0 }}
								icon={<KeyboardVoiceRounded />}
							/>
						)}
					</Flex>
				</Header>
				<Content>
					<List
						header={<div>Header</div>}
						footer={<div>Footer</div>}
						bordered
						dataSource={data}
						renderItem={(item) => <List.Item>{item}</List.Item>}
					/>
				</Content>
			</Layout>
		</Drawer>
	);
};

export default ExploreJourneysDrawer;
