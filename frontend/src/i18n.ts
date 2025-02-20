import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import store from "./redux/store";
import { getLanguageCode } from "./redux/slices/language";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {},
	zh: {
		translation: {
			Home: "主页",
			Explore: "探索",
			"Upcoming Journeys": "未来旅程",
			"Completed Journeys": "旅程历史",
			"Deleted Journeys": "删除的旅程",
			Profile: "帐户",
			Appearance: "外貌",
			Language: "语文",
			"JourneyWonder Pro": "JourneyWonder 专业版",
			Settings: "设置",
			"Switch Accounts": "切转帐户",
			"Log Out": "退出",
			"Explore Journeys": "探索旅程",
			"Create a new journey": "创建新旅程",
			"Are you sure you want to log out?": "你是否确定退出？",
			Yes: "是",
			No: "不",
			"Log In": "登录",
			"Sign Up": "注册",
			"About Us": "关于我们",
			"Our Mission": "使命",
			Creators: "创办者",
			Email: "电邮",
			Password: "密码",
			"Remember Me": "记住登录信息",
			"Forgot Password": "忘记密码",
			"Don't have an account yet? ": "还未注册？",
			"Create One": "注册账户",
			or: "或",
			"Log In with Google": "谷歌登录",
			"Invalid email or password": "电邮或密码不正确",
			"Please enter your email": "请输入你的电邮",
			"Please enter your password": "请输入你的密码",
			"Invalid email format": "电邮格式不正确",
			"Ask JourneyWonder AI": "讯问 JourneyWonder AI",
		},
	},
	ja: {
		translation: {
			Home: "ホーム",
			Explore: "探索",
			"Upcoming Journeys": "今後の旅",
			"Completed Journeys": "完了した旅",
			"Deleted Journeys": "削除された旅",
			Profile: "プロフィール",
			Appearance: "外観",
			Language: "言語",
			"JourneyWonder Pro": "JourneyWonder プロ版",
			Settings: "設定",
			"Switch Accounts": "アカウントの切り替え",
			"Log Out": "ログアウト",
			"Explore Journeys": "旅を探索する",
			"Create a new journey": "新たな旅を創る",
			"Are you sure you want to log out?":
				"サインアウトしてもよろしいですか?",
			Yes: "はい",
			No: "いいえ",
			"Log In": "ログイン",
			"Sign Up": "サインアップ",
			"About Us": "弊社について",
			"Our Mission": "使命",
			Creators: "クリエイター",
			Email: "メール",
			Password: "パスワード",
			"Remember Me": "ログイン情報を記憶する",
			"Forgot Password": "パスワードを忘れた",
			"Don't have an account yet? ":
				"まだアカウントを作成していませんか？",
			"Create One": "アカウントを作成する",
			or: "または",
			"Log In with Google": "Googleでログイン",
			"Invalid email or password":
				"メールアドレスまたはパスワードが正しくありません",
			"Please enter your email": "メールアドレスを入力してください",
			"Please enter your password": "パスワードを入力してください",
			"Invalid email format": "メールアドレスの形式が正しくありません",
			"Ask JourneyWonder AI": "JourneyWonder AI に尋ねる",
		},
	},
};
const languageCode = getLanguageCode(store.getState().language.language);
i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: languageCode, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

store.subscribe(() => {
	const newLanguageCode = getLanguageCode(store.getState().language.language);
	i18n.changeLanguage(newLanguageCode);
});

export default i18n;
