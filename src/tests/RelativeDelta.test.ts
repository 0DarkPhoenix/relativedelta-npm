import { expect, test } from "bun:test";
import { RelativeDelta } from "../RelativeDelta";
import { FR, MO, SA, SU, TH, TU, WE } from "../WeekdayTypes";

/* -------------------------------------------------------------------------- */
/*                               Date Comparison                              */
/* -------------------------------------------------------------------------- */
test("Date Comparison", () => {
	const date1 = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	const date2 = new Date(2021, 11, 31, 23, 59, 59); // December 31st, 2021 at 23:59:59
	expect(new RelativeDelta({ date1: date1, date2: date2 })).toEqual(
		new RelativeDelta({
			years: -1,
			months: -11,
			days: -30,
			leapDays: -1,
			hours: -23,
			minutes: -59,
			seconds: -59,
			milliseconds: 0,
		}),
	);
});

test("Date Comparison - To Days", () => {
	const date1 = new Date(2021, 11, 31, 0, 0, 0); // December 31st, 2021 at 00:00:00
	const date2 = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ date1: date1, date2: date2 }).toDays()).toBe(730);
});

test("Date Comparison - To Months", () => {
	const date1 = new Date(2021, 11, 31, 0, 0, 0); // December 31st, 2021 at 00:00:00
	const date2 = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ date1: date1, date2: date2 }).toMonths()).toBe(24);
});

/* -------------------------------------------------------------------------- */
/*                                Apply To Date                               */
/* -------------------------------------------------------------------------- */
test("Apply To Date", () => {
	const date = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ months: 2, days: -1 }).applyToDate(date)).toEqual(
		new Date(2023, 1, 28, 0, 0, 0),
	);
});

test("Apply To Date - Leap Year", () => {
	const date = new Date(2020, 0, 31, 0, 0, 0); // January 31st, 2020 at 00:00:00
	expect(new RelativeDelta({ months: 1, day: 31 }).applyToDate(date)).toEqual(
		new Date(2020, 1, 29, 0, 0, 0),
	);
});

test("Apply To Date - Leap Days in Normal Year", () => {
	const date = new Date(2023, 0, 31, 0, 0, 0); // January 31st, 2023 at 00:00:00
	expect(new RelativeDelta({ months: 4, leapDays: 10 }).applyToDate(date)).toEqual(
		new Date(2023, 4, 31, 0, 0, 0),
	);
});

test("Apply To Date - Leap Days in Leap Year", () => {
	const date = new Date(2020, 0, 31, 0, 0, 0); // January 31st, 2020 at 00:00:00
	expect(new RelativeDelta({ months: 4, leapDays: 10 }).applyToDate(date)).toEqual(
		new Date(2020, 5, 10, 0, 0, 0),
	);
});

test("Apply To Date - Yearday in Normal Year", () => {
	const date = new Date(2023, 0, 31, 0, 0, 0); // January 31st, 2023 at 00:00:00
	expect(new RelativeDelta({ yearDay: 345 }).applyToDate(date)).toEqual(
		new Date(2023, 11, 11, 0, 0, 0),
	);
});

test("Apply To Date - Yearday in Leap Year", () => {
	const date = new Date(2020, 0, 31, 0, 0, 0); // January 31st, 2020 at 00:00:00
	expect(new RelativeDelta({ yearDay: 345 }).applyToDate(date)).toEqual(
		new Date(2020, 11, 10, 0, 0, 0),
	);
});

test("Apply To Date - nonLeapYearDay in Normal Year", () => {
	const date = new Date(2023, 0, 31, 0, 0, 0); // January 31st, 2023 at 00:00:00
	expect(new RelativeDelta({ nonLeapYearDay: 345 }).applyToDate(date)).toEqual(
		new Date(2023, 11, 11, 0, 0, 0),
	);
});

test("Apply To Date - nonLeapYearDay in Leap Year", () => {
	const date = new Date(2020, 0, 31, 0, 0, 0); // January 31st, 2020 at 00:00:00
	expect(new RelativeDelta({ nonLeapYearDay: 345 }).applyToDate(date)).toEqual(
		new Date(2020, 11, 11, 0, 0, 0),
	);
});

test("Apply To Date - nonLeapYearDay Exceeding Days In Year", () => {
	const date = new Date(2023, 0, 31, 0, 0, 0); // January 31st, 2023 at 00:00:00
	expect(new RelativeDelta({ nonLeapYearDay: 366 }).applyToDate(date)).toEqual(
		new Date(2023, 11, 31, 0, 0, 0),
	);
});

test("Apply To Date - nonLeapYearDay Exceeding Days In Year", () => {
	const date = new Date(2023, 0, 31, 0, 0, 0); // January 31st, 2023 at 00:00:00
	expect(new RelativeDelta({ nonLeapYearDay: 366 }).applyToDate(date)).toEqual(
		new Date(2023, 11, 31, 0, 0, 0),
	);
});

/* -------------------------------------------------------------------------- */
/*                               To Milliseconds                              */
/* -------------------------------------------------------------------------- */
test("To Milliseconds", () => {
	const referenceDate = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ months: 4 }).toMilliseconds(referenceDate)).toBe(10368000000);
});

test("To Milliseconds - Fractal", () => {
	const referenceDate = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ days: 4.35 }).toMilliseconds(referenceDate)).toBe(375840000);
});

test("To Milliseconds - Leap Year", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ months: 12 }).toMilliseconds(referenceDate)).toBe(31622400000);
});

test("To Milliseconds - Decennium", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ years: 10 }).toMilliseconds(referenceDate)).toBe(315619200000);
});

/* -------------------------------------------------------------------------- */
/*                                 To Seconds                                 */
/* -------------------------------------------------------------------------- */
test("To Seconds", () => {
	const referenceDate = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ months: 4 }).toSeconds(referenceDate)).toBe(10368000);
});

test("To Seconds - Negative", () => {
	const referenceDate = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ months: -4 }).toSeconds(referenceDate)).toBe(-10540800);
});

test("To Seconds - Fractal", () => {
	const referenceDate = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ days: 4.35 }).toSeconds(referenceDate)).toBe(375840);
});

test("To Seconds - Leap Year", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ months: 12 }).toSeconds(referenceDate)).toBe(31622400);
});

test("To Seconds - Decennium", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ years: 10 }).toSeconds(referenceDate)).toBe(315619200);
});

test("To Seconds - Millennium", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ years: 1000 }).toSeconds(referenceDate)).toBe(31556908800);
});

/* -------------------------------------------------------------------------- */
/*                                 To Minutes                                 */
/* -------------------------------------------------------------------------- */
test("To Minutes - Fractal", () => {
	const referenceDate = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ days: 4.35 }).toMinutes(referenceDate)).toBe(6264);
});

test("To Minutes - Leap Year", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ months: 12 }).toMinutes(referenceDate)).toBe(527040);
});

/* -------------------------------------------------------------------------- */
/*                                  To Hours                                  */
/* -------------------------------------------------------------------------- */
test("To Hours - Fractal", () => {
	const referenceDate = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ days: 4.35 }).toHours(referenceDate)).toBe(104.4);
});

test("To Hours - Leap Year", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ months: 12 }).toHours(referenceDate)).toBe(8784);
});

/* -------------------------------------------------------------------------- */
/*                                   To Days                                  */
/* -------------------------------------------------------------------------- */
test("To Days - All Months in Year", () => {
	// Expected days in each month of 2020 (leap year)
	const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Calculate days for each month using RelativeDelta and collect in an array
	const calculatedDays = [];

	for (let i = 0; i < 12; i++) {
		const delta = new RelativeDelta({ months: 1 });
		const monthStart = new Date(2023, i, 1, 0, 0, 0); // Using 2020 as a leap year
		calculatedDays.push(delta.toDays(monthStart));
	}

	expect(calculatedDays).toEqual(daysInMonth);
});

test("To Days - All Months in Leap Year", () => {
	// Expected days in each month of 2020 (leap year)
	const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Calculate days for each month using RelativeDelta and collect in an array
	const calculatedDays = [];

	for (let i = 0; i < 12; i++) {
		const delta = new RelativeDelta({ months: 1 });
		const monthStart = new Date(2020, i, 1, 0, 0, 0); // Using 2020 as a leap year
		calculatedDays.push(delta.toDays(monthStart));
	}

	expect(calculatedDays).toEqual(daysInMonth);
});

test("To Days - Fractal", () => {
	const referenceDate = new Date(2023, 0, 1, 0, 0, 0); // January 1st, 2023 at 00:00:00
	expect(new RelativeDelta({ weeks: 4.35 }).toDays(referenceDate)).toBe(30.45);
});

test("To Days - Leap Year", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ months: 12 }).toDays(referenceDate)).toBe(366);
});

/* -------------------------------------------------------------------------- */
/*                                   To Weeks                                 */
/* -------------------------------------------------------------------------- */
test("To Weeks - Leap Year", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ months: 12 }).toWeeks(referenceDate)).toBe(52.285714285714285);
});

/* -------------------------------------------------------------------------- */
/*                                  To Months                                 */
/* -------------------------------------------------------------------------- */
test("To Months - Leap Year", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ seconds: 10368000 }).toMonths(referenceDate)).toBe(4);
});

/* -------------------------------------------------------------------------- */
/*                                  To Years                                  */
/* -------------------------------------------------------------------------- */
test("To Years - Leap Year", () => {
	const referenceDate = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	expect(new RelativeDelta({ seconds: 315619200 }).toYears(referenceDate)).toBe(10);
});

/* -------------------------------------------------------------------------- */
/*                                 Normalized                                 */
/* -------------------------------------------------------------------------- */
test("Normalized", () => {
	expect(
		new RelativeDelta({
			weeks: 2.5,
			days: 1.5,
			hours: 2.3,
		}).normalized(),
	).toEqual(
		new RelativeDelta({
			days: 19,
			hours: 2,
			minutes: 18,
		}),
	);
});

test("Normalized - Negative", () => {
	expect(
		new RelativeDelta({
			weeks: -8.5,
			days: 1.5,
			hours: -62.3,
		}).normalized(),
	).toEqual(
		new RelativeDelta({
			days: -60,
			hours: -14,
			minutes: -18,
		}),
	);
});

test("Normalized - Date Comparison", () => {
	const date1 = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00
	const date2 = new Date(2021, 11, 31, 23, 59, 59); // December 31st, 2021 at 23:59:59
	expect(new RelativeDelta({ date1: date1, date2: date2 }).normalized()).toEqual(
		new RelativeDelta({
			years: -1,
			months: -11,
			days: -30,
			hours: -23,
			minutes: -59,
			seconds: -59,
			milliseconds: 0,
		}),
	);
});

/* -------------------------------------------------------------------------- */
/*                                   WeekDay                                  */
/* -------------------------------------------------------------------------- */
test("WeekDay - Next Monday", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: MO(1) }).applyToDate(date)).toEqual(
		new Date(2023, 0, 30, 0, 0, 0),
	);
});

test("WeekDay - Previous Monday", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: ["MO", -1] }).applyToDate(date)).toEqual(
		new Date(2023, 0, 30, 0, 0, 0),
	);
});

test("WeekDay - Date after 1000 Mondays", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: ["MO", 1000] }).applyToDate(date)).toEqual(
		new Date(2042, 2, 24, 0, 0, 0),
	);
});

test("WeekDay - Date after -1000 Mondays", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: ["MO", -1000] }).applyToDate(date)).toEqual(
		new Date(2003, 11, 8, 0, 0, 0),
	);
});

test("WeekDay - Next Tuesday", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: TU(1) }).applyToDate(date)).toEqual(
		new Date(2023, 0, 31, 0, 0, 0),
	);
});

test("WeekDay - Next Wednesday", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: WE(1) }).applyToDate(date)).toEqual(
		new Date(2023, 1, 1, 0, 0, 0),
	);
});

test("WeekDay - Next Thursday", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: TH(1) }).applyToDate(date)).toEqual(
		new Date(2023, 1, 2, 0, 0, 0),
	);
});

test("WeekDay - Next Friday", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: FR(1) }).applyToDate(date)).toEqual(
		new Date(2023, 1, 3, 0, 0, 0),
	);
});

test("WeekDay - Next Saturday", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: SA(1) }).applyToDate(date)).toEqual(
		new Date(2023, 1, 4, 0, 0, 0),
	);
});

test("WeekDay - Next Sunday", () => {
	const date = new Date(2023, 0, 30, 0, 0, 0); // January 30th, 2023 at 00:00:00
	expect(new RelativeDelta({ weekDay: SU(1) }).applyToDate(date)).toEqual(
		new Date(2023, 1, 5, 0, 0, 0),
	);
});

/* -------------------------------------------------------------------------- */
/*                                   Errors                                   */
/* -------------------------------------------------------------------------- */
test("Error - Float not supported for time units", () => {
	const timeUnitParams = {
		years: 1.1,
		months: 2.5,
	};

	for (const [param, value] of Object.entries(timeUnitParams)) {
		expect(() => {
			new RelativeDelta({ [param]: value });
		}).toThrowError("Floats are not supported for parameters 'years' and 'months'");
	}
});

test("Error - Float not supported for absolute values", () => {
	const absoluteParams = {
		year: 1.1,
		month: 2.5,
		day: 3.7,
		hour: 4.2,
		minute: 5.9,
		second: 6.3,
		millisecond: 7.8,
	};

	for (const [param, value] of Object.entries(absoluteParams)) {
		expect(() => {
			new RelativeDelta({ [param]: value });
		}).toThrowError(
			"Floats are not supported for parameters 'year', 'month', 'day', 'hour', 'minute', 'second' and 'millisecond'",
		);
	}
});

test("Error - Value out of range", () => {
	const absoluteParams = {
		year: 0,
		month: 0,
		day: 0,
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
	};
	for (const [param, value] of Object.entries(absoluteParams)) {
		expect(() => {
			new RelativeDelta({ [param]: value });
		}).toThrowError();
	}
});

test("Error - Invalid yearDay value", () => {
	for (const value of [-1, 367]) {
		expect(() => {
			new RelativeDelta({ yearDay: value });
		}).toThrowError();
	}
});

test("Error - Invalid weekday string", () => {
	const invalidString = "test";
	expect(() => {
		// @ts-expect-error Intentionally passing invalid weekday for error testing
		new RelativeDelta({ weekDay: invalidString });
	}).toThrowError(`Invalid weekday string: ${invalidString}`);
});

test("Error - Invalid weekday number", () => {
	for (const value of [-1, 7]) {
		expect(() => {
			new RelativeDelta({ weekDay: value });
		}).toThrowError(
			`Invalid weekday number: ${value}. Weekday number must be an integer between 0 and 6`,
		);
	}
});
