import React, { useEffect, useState } from "react";
import _ from "lodash";
import i1 from "../../images/calendar/1.png";
import i2 from "../../images/calendar/2.png";
import i3 from "../../images/calendar/3.png";
import i4 from "../../images/calendar/4.png";
import i5 from "../../images/calendar/5.png";
import i6 from "../../images/calendar/6.png";
import i7 from "../../images/calendar/7.png";
import i8 from "../../images/calendar/8.png";
import i9 from "../../images/calendar/9.png";
import i10 from "../../images/calendar/10.png";
import i11 from "../../images/calendar/11.png";
import i12 from "../../images/calendar/12.png";
import "./calendar.css";
import IconButton from "../../components/Button/IconButton";
import MonthDialogBox from "./MonthDialogBox";

const Calendar = () => {
	const days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const mcode = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
	const ycode = [
		5, 6, 0, 1, 3, 4, 5, 6, 1, 2, 3, 4, 6, 0, 1, 2, 4, 5, 6, 0, 2, 3, 4, 5,
		0, 1, 2, 3,
	];
	const colors = [
		"indigo",
		"purple",
		"dark-purple",
		"pink",
		"orange",
		"red",
		"light-green",
		"green",
		"light-blue",
		"blue",
		"cyan",
		"brown",
	];
	const images = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12];
	const [month, setMonth] = useState(1);
	const [year, setYear] = useState(2000);
	const [datesToDisplay, setDatesToDisplay] = useState(Array(35).fill(null));
	const rowsToDisplay = [...Array(5).keys()];
	const colsToDisplay = [...Array(7).keys()];
	let currentDate = parseInt(Date().substring(8, 10));
	const handleDatesToDisplay = (m, y) => {
		let noOfDays = 31;
		let isLeapYear = false;
		let DatesToSet = Array(35).fill(null);
		if (y % 4 === 0) {
			if (y % 100 === 0) isLeapYear = y % 400 === 0;
			else isLeapYear = true;
		} else isLeapYear = false;
		if (m === 4 || m === 6 || m === 9 || m === 11) --noOfDays;
		else if (m === 2 && isLeapYear === true) noOfDays -= 2;
		else if (m === 2 && isLeapYear === false) noOfDays -= 3;
		let i = 0,
			k = 0;
		let render1 = (1 + mcode[m - 1] + ycode[y % 28]) % 7;
		render1 = render1 >= 2 ? render1 - 2 : render1 + 5;
		for (i = 0; i < 35; ++i)
			DatesToSet[i] = i >= render1 && i < noOfDays + render1 ? ++k : null;
		if (k < noOfDays && i === 35) {
			i = 0;
			while (k < noOfDays) DatesToSet[i++] = ++k;
		}
		return DatesToSet;
	};
	const handleBackButton = (e) => {
		e.preventDefault();
		if (month === 1) {
			setMonth(() => 12);
			setYear((prev) => prev - 1);
			handleDatesToDisplay(12, year - 1);
		} else {
			setMonth((prev) => prev - 1);
			handleDatesToDisplay(month - 1, year);
		}
	};
	const handleForwardButton = (e) => {
		e.preventDefault();
		if (month === 12) {
			setMonth(() => 1);
			setYear((prev) => prev + 1);
			handleDatesToDisplay(1, year + 1);
		} else {
			setMonth((prev) => prev + 1);
			handleDatesToDisplay(month + 1, year);
		}
	};
	const handleChangeYear = (e) => {
		setYear(() => e.target.value);
		handleDatesToDisplay(month, e.target.value);
	};
	useEffect(() => {
		document.title = "Calendar";
		window.scrollTo(0, 0);
		let todayDate = new Date();
		setMonth(() => todayDate.getMonth());
		setYear(() => todayDate.getFullYear());
		setDatesToDisplay(() =>
			handleDatesToDisplay(
				todayDate.getMonth() + 1,
				todayDate.getFullYear()
			)
		);
	}, []);
	useEffect(() => {
		setDatesToDisplay(handleDatesToDisplay(month + 1, year));
	}, [month, year]);

	const [openMonthDialogBox, setOpenMonthDialogBox] = useState(false);

	return (
		<main className="calendar">
			<section
				className="calendar-head"
				style={{ backgroundColor: `var(--${colors[month % 12]}-100)` }}
			>
				<div className="calendar-head-labels">
					<div
						className="calendar-head-month"
						onClick={() =>
							setOpenMonthDialogBox(!openMonthDialogBox)
						}
						style={{
							width: `calc(${
								months[month % 12].length
							}ch + 40px)`,
						}}
					>
						<div className="calendar-head-month-current">
							{months[month % 12]}
							<IconButton
								icon={
									openMonthDialogBox
										? "arrow_drop_up"
										: "arrow_drop_down"
								}
								fill={`var(--${colors[month % 12]}-400)`}
							/>
						</div>
						{openMonthDialogBox && (
							<MonthDialogBox
								months={months}
								handle={(a) => {
									setMonth(a);
									handleDatesToDisplay(a, year);
								}}
							/>
						)}
					</div>
					<div className="calendar-head-year">
						<input
							name="year"
							value={year}
							onChange={handleChangeYear}
							className="calendar-head-year-input"
						/>
					</div>
				</div>
				<div className="calendar-head-buttons">
					<IconButton
						icon="arrow_back"
						fill={`var(--${colors[month % 12]}-400)`}
						onClick={handleBackButton}
					/>
					<IconButton
						icon="arrow_forward"
						fill={`var(--${colors[month % 12]}-400)`}
						onClick={handleForwardButton}
					/>
				</div>
			</section>
			<section
				className="calendar-body"
				style={{ backgroundImage: `url(${images[month % 12]})` }}
			>
				<table className="calendar-table">
					<thead
						style={{
							backgroundColor: `var(--${colors[month % 12]}-100)`,
						}}
					>
						<tr>
							{days.map((day, index) => (
								<th key={index}>
									{_.upperCase(day.slice(0, 3))}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rowsToDisplay.map((row, i) => (
							<tr key={i}>
								{colsToDisplay.map((col, j) => (
									<td
										style={{
											backgroundColor:
												datesToDisplay[i * 7 + j] ===
												currentDate
													? `var(--${
															colors[month % 12]
													  }-100)`
													: "transparent",
										}}
										key={j}
									>
										{datesToDisplay[i * 7 + j]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</main>
	);
};

export default Calendar;
