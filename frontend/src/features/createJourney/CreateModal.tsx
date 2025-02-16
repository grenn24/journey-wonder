import {
	AutoComplete,
	Button,
	Flex,
	Input,
	Modal,
	theme,
	Typography,
	DatePicker,
	Tag,
} from "antd";
import i18n from "../../i18n.ts";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";

import CloseButton from "../../components/CloseButton.tsx";
import StageOne from "./StageOne.tsx";
import StageTwo from "./StageTwo.tsx";
import { ArrowForward, EastRounded } from "@mui/icons-material";
import { incrementStage } from "../../redux/slices/createJourney.ts";

interface Prop {
	openCreateModal: boolean;
	setOpenCreateModal: (value: boolean) => void;
}

const { Text } = Typography;
const stages = [StageOne, StageTwo];
const CreateModal = ({ openCreateModal, setOpenCreateModal }: Prop) => {
	const { token } = theme.useToken();
	const {
		colorBgContainer,
		borderRadius,
		fontSizeHeading5,
		colorText,
		fontWeightStrong,
		fontSizeHeading4,
		fontSizeHeading3,
		colorTextHeading,
		colorPrimary,
		colorPrimaryBg,
		colorBorder,
		colorPrimaryBorderHover,
		colorPrimaryActive,
		colorPrimaryText,
		colorBgTextActive,
		colorBgSolid,
	} = token;

	const dispatch = useAppDispatch();
	const { currentStage } = useAppSelector((state) => ({
		currentStage: state.createJourney.currentStage,
	}));


	return (
		<Modal
			open={openCreateModal}
			onCancel={() => setOpenCreateModal(false)}
			closeIcon={false}
			
			title={
				<Flex justify="space-between" align="center" style={{ marginBottom: 35 }}>
					<Text
						style={{
							fontSize: fontSizeHeading3,
							fontFamily: "Roboto",
							fontWeight: fontWeightStrong,
						}}
					>
						{i18n.t("Plan a new journey")}
					</Text>
					<Button variant="text" color="primary" icon={<ArrowForward />} iconPosition="end" style={{fontSize:fontSizeHeading5}} onClick={()=>dispatch(incrementStage())}>Next</Button>
				</Flex>
				
			}
			width={650}
			footer={false}
		>
			{stages[currentStage]()}
		</Modal>
	);
};

export default CreateModal;
