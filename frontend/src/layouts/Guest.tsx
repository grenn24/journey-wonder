import { Anchor, AutoComplete, Button, Flex, Image, Input, Layout, Menu, MenuProps, Space, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import journeyWonder from "../assets/images/journey-wonder.png";



const options = [
	{
		label: "Libraries",
		value: "Libraries",

	},
	{
		label: "Solutions",
		value: "Solutions",
	},
	{
		label: "Articles",
		valuye: "Articles",
	},
];


const Guest = () => {
  const navbarItems = [
		{
			label: "Home",
			key: "home",
			onClick: () => navigate(""),
		},
		{
			label: "Pricing",
			key: "pricing",
			onClick: () => navigate("pricing"),
		},
		{
			label: "About",
			key: "about",
			onClick: () => navigate("about"),
		},
  ];
   const {
		token: { colorBgContainer, borderRadiusLG },
   } = theme.useToken();
  const location = useLocation();
  const selectedItem = location.pathname.split("/").slice(2).length !== 0 ? location.pathname.split("/").slice(2) : ["home"];
  const navigate = useNavigate();
	return (
		<Layout>
			<Header style={{ backgroundColor: colorBgContainer }}>
				<Flex justify="space-between" align="center">
					<Space style={{ fontWeight: 400 }}>
						<a
							href="/guest"
							target="_self"
							rel="noopener noreferrer"
						>
							<Image
								width={70}
								src={journeyWonder}
								preview={false}
							/>
						</a>

						<Menu
							mode="horizontal"
							items={navbarItems}
							selectedKeys={selectedItem}
							disabledOverflow
						/>
					</Space>

					<Flex gap={20} align="center">
						<AutoComplete
							popupClassName="certain-category-search-dropdown"
							popupMatchSelectWidth
							style={{ width: 250, alignItems: "center" }}
							options={options}
						>
							<Input
								addonBefore={<SearchOutlined />}
								size="large"
								placeholder="Explore itineraries"
							/>
						</AutoComplete>
						<Button
							variant="outlined"
							onClick={() => navigate("account/log-in")}
							style={{ fontWeight: 400 }}
						>
							Log In
						</Button>
						<Button
							variant="solid"
							color="green"
							style={{ fontWeight: 400 }}
						>
							Sign Up
						</Button>
					</Flex>
				</Flex>
			</Header>

			<Content>
				<Outlet />
			</Content>
		</Layout>
	);
};

export default Guest;
