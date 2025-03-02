import StageOne from "./StageOne";
import StageThree from "./StageThree";
import StageTwo from "./StageTwo";
import i18n from "../../../i18n";

const stages = [StageOne, StageTwo, StageThree];
export default stages;
export const stageNames = [
	i18n.t("Create Journey"),
	i18n.t("Add Cover Photo"),
	i18n.t("Confirm Journey"),
];