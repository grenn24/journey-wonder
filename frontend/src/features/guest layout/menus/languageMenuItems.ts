import { useDispatch } from "react-redux";
import { Language, setLanguage } from "../../../redux/slices/language";

const useLanguageMenuItems = () => {
	const dispatch = useDispatch();
	return [
		{
			label: "English (UK)",
			key: "English (UK)",
			onClick: () => dispatch(setLanguage(Language.EnglishUK)),
		},
		{
			label: "中文（简体）",
			key: "中文（简体）",
			onClick: () => dispatch(setLanguage(Language.ChineseSimplified)),
		},
		{
			label: "日本語",
			key: "日本語",
			onClick: () => dispatch(setLanguage(Language.Japanese)),
		},
	];
};
export default useLanguageMenuItems;
