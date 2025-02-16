import {
	AutoComplete,
	Button,
	Drawer,
	Dropdown,
	Flex,
	Image,
	Input,
	Layout,
	Menu,
	Space,
	theme,
} from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useAppSelector } from "../redux/store";
import GuestHeader from "../features/guest layout/Header";


const Guest = () => {
	const { language } = useAppSelector((state) => ({
		language: state.language.language,
	}));

	return (
		<Layout>
			<GuestHeader />

			<Content>
				<Outlet />
			</Content>
		</Layout>
	);
};

export default Guest;
