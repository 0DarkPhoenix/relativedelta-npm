import { RelativeDelta } from "./RelativeDelta.ts";

const date1 = new Date(2021, 11, 31, 0, 0, 0); // December 31st, 2021 at 00:00:00
const date2 = new Date(2020, 0, 1, 0, 0, 0); // January 1st, 2020 at 00:00:00

console.log(new RelativeDelta({ date1, date2, years: 3 }).toMilliseconds());

console.log(new RelativeDelta({ years: 110 }).toMilliseconds());

console.log(new RelativeDelta({ months: 1, day: 31 }).applyToDate(date2).toLocaleString());
new RelativeDelta({ day: 31, days: -1 }).applyToDate(currentDate);
