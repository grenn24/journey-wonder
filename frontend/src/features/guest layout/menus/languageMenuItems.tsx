import { useDispatch } from "react-redux";
import { Language, setLanguage } from "../../../redux/slices/language";
import { Flex, Typography } from "antd";
import Flag from "react-world-flags";
import { useAppSelector } from "../../../redux/store";

const {Title} = Typography;
const useLanguageMenuItems = () => {
	const dispatch = useDispatch();
	const globalLanguage = useAppSelector((state)=>state.language.language)
	return [
		{
			label: (
				<Flex gap={10} align="center">
					<Flag code="GB" style={{ width: 22, height: 22 }} />

					<Title
						level={5}
						style={{
							fontFamily: "Noto Sans",
							marginBottom: 0,
							fontWeight:
								globalLanguage === Language.EnglishUK
									? 800
									: 500,
						}}
					>
						English (UK)
					</Title>
				</Flex>
			),

			key: "English (UK)",
			onClick: () => dispatch(setLanguage(Language.EnglishUK)),
		},
		{
			label: (
				<Flex gap={10} align="center">
					<Flag code="CN" style={{ width: 22, height: 22 }} />
					<Title
						level={5}
						style={{
							fontFamily: "Noto Sans",
							marginBottom: 0,
							fontWeight:
								globalLanguage === Language.ChineseSimplified
									? 800
									: 500,
						}}
					>
						中文（简体）
					</Title>
				</Flex>
			),
			key: "中文（简体）",
			onClick: () => dispatch(setLanguage(Language.ChineseSimplified)),
		},
		{
			label: (
				<Flex gap={10} align="center">
					<Flag code="JP" style={{ width: 22, height: 22 }} />
					<Title
						level={5}
						style={{
							fontFamily: "Noto Sans",
							marginBottom: 0,
							fontWeight:
								globalLanguage === Language.Japanese
									? 800
									: 500,
						}}
					>
						日本語
					</Title>
				</Flex>
			),
			key: "日本語",
			onClick: () => dispatch(setLanguage(Language.Japanese)),
		},
	];
};
export default useLanguageMenuItems;
