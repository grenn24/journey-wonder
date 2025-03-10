import dayjs from "dayjs";
import React, { useState } from "react";
import {
	Button,
	Calendar as CalendarBase,
	Flex,
	Segmented,
	Select,
	Typography,
} from "antd";
import {
	ArrowDropDownRounded,
	KeyboardArrowLeftRounded,
	KeyboardArrowRightRounded,
} from "@mui/icons-material";

const monthOptions = [
	{ label: "January", value: 0 },
	{ label: "February", value: 1 },
	{ label: "March", value: 2 },
	{ label: "April", value: 3 },
	{ label: "May", value: 4 },
	{ label: "June", value: 5 },
	{ label: "July", value: 6 },
	{ label: "August", value: 7 },
	{ label: "September", value: 8 },
	{ label: "October", value: 9 },
	{ label: "November", value: 10 },
	{ label: "December", value: 11 },
];

const { Title } = Typography;

interface Prop {
	setDates: (start: string | null | undefined, end: string | null | undefined) => void;
	start: string | undefined | null;
	end: string | undefined;
}
const Calendar = ({ setDates, start, end }: Prop) => {
	const [calendarMode, setCalendarMode] = useState<"month" | "year">("month");
    const [calendarValue, setCalendarValue] = useState(
		start ? dayjs(start) : dayjs()
	);

	return (
		<>
			<CalendarBase
				disabledDate={(date) => date.isBefore(dayjs(), "day")}
				headerRender={({ value, type, onChange }) => {
					const currentMonthIndex = value.month();
					const currentYear = value.year();
					const yearOptions: Object[] = [];
					for (let i = value.year() - 5; i <= value.year() + 5; i++) {
						yearOptions.push({
							label: i.toString(),
							value: i,
						});
					}
					return (
						<Flex vertical gap={15}>
							<Flex justify="space-between" align="center">
								<Segmented
									options={[
										{
											label: "Month",
											value: "month" as typeof calendarMode,
										},
										{
											label: "Year",
											value: "year" as typeof calendarMode,
										},
									]}
									value={calendarMode}
									onChange={(value) => {
										setCalendarMode(value);
									}}
								/>
								<Flex gap={7}>
									<Select
										variant="filled"
										options={monthOptions}
										value={currentMonthIndex}
										onChange={(newMonthIndex) =>
											onChange(
												value
													.clone()
													.month(newMonthIndex)
											)
										}
										suffixIcon={<ArrowDropDownRounded />}
										dropdownStyle={{
											width: 115,
										}}
										placement="bottomRight"
									/>
									<Select
										variant="filled"
										options={yearOptions}
										value={currentYear}
										onChange={(newYear) =>
											onChange(
												value.clone().year(newYear)
											)
										}
										suffixIcon={<ArrowDropDownRounded />}
									/>
								</Flex>
							</Flex>
							<Flex justify="space-between" align="center">
								<Title
									level={4}
									style={{
										whiteSpace: "pre-wrap",
									}}
								>
									{calendarMode === "month"
										? value.format("MMMM  YYYY")
										: value.format("YYYY")}
								</Title>
								<Flex gap={5}>
									<Button
										icon={
											<KeyboardArrowLeftRounded
												style={{
													fontSize: 30,
												}}
											/>
										}
										variant="text"
										color="default"
										onClick={() => {
											const newDate =
												calendarMode === "month"
													? value
															.clone()
															.month(
																value.month() -
																	1
															)
													: value
															.clone()
															.year(
																value.year() - 1
															);
											onChange(newDate);
										}}
									/>
									<Button
										icon={
											<KeyboardArrowRightRounded
												style={{
													fontSize: 30,
												}}
											/>
										}
										variant="text"
										color="default"
										onClick={() => {
											const newDate =
												calendarMode === "month"
													? value
															.clone()
															.month(
																value.month() +
																	1
															)
													: value
															.clone()
															.year(
																value.year() + 1
															);
											onChange(newDate);
										}}
									/>
								</Flex>
							</Flex>
						</Flex>
					);
				}}
				mode={calendarMode}
				fullscreen={false}
				onPanelChange={() => {}}
				value={calendarValue}
				onChange={(date) => setCalendarValue(date)}
				fullCellRender={(date, info) =>
					calendarMode === "month" ? (
						<Button
							type={
								date.isSame(dayjs(start)) ||
								date.isSame(dayjs(end)) ||
								(date.isAfter(dayjs(start)) &&
									date.isBefore(dayjs(end)))
									? "primary"
									: "text"
							}
							disabled={date.isBefore(dayjs(), "day")}
							style={{
								width: 40,
								height: 40,
								fontSize: 18,
								margin: 0,
								opacity:
									date.month() !== calendarValue.month()
										? 0.4
										: 1,
							}}
							onClick={() => {
								if (date.isSame(start)) {
									setDates(null, null)
								} else if (date.isSame(end)) {
									setDates(start,null);
								} else if (!start) {
									// Case 1: If no start date is set, set the selected date as the start date
									setDates(date.toISOString(), end);
								} else if (!end) {
									// Case 2: If start date is set but no end date, determine whether to set start or end
									if (date.isBefore(start)) {
										setDates(date.toISOString(), end);
									} else {
									setDates(start, date.toISOString());
									}
								} else {
									// Case 3: Both start and end dates are set
									if (date.isBefore(start)) {
										// If selected date is before start date, update start and reset end date
										setDates(date.toISOString(), null);
									} else if (date.isAfter(end)) {
										// If selected date is after end date, update end date
										setDates(start, date.toISOString());
									} else {
										// If selected date is between start and end dates, update start date
											setDates( date.toISOString(), end);
									}
								}
							}}
						>
							{date.date()}
						</Button>
					) : (
						<Button
							style={{
								fontSize: 18,
								margin: 0,
							}}
							type={
								calendarValue.month() === date.month()
									? "primary"
									: "text"
							}
							onClick={() => {
								setCalendarMode("month");
								setCalendarValue(
									calendarValue.clone().month(date.month())
								);
							}}
						>
							{monthOptions[date.month()].label}
						</Button>
					)
				}
			/>
			<Flex justify="space-between">
				<Button
					variant="text"
					color="primary"
					onClick={() => {
						setDates(null, null)
					}}
				>
					Reset
				</Button>
				<Button
					variant="text"
					color="primary"
					onClick={() => setCalendarValue(dayjs())}
				>
					Today
				</Button>
			</Flex>
		</>
	);
};

export default Calendar;
