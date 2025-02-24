import {
	Layout,
} from "antd";
import { Outlet} from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import GuestHeader from "../features/guest layout/Header";


const Guest = () => {

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
