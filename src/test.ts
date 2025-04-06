import { RelativeDelta } from "./RelativeDelta.ts";

const pastDate = new Date(1, 0, 1);
const futureDate = new Date(9999, 11, 31);

let startTime = performance.now();
const delta = new RelativeDelta({ date1: pastDate, date2: futureDate });
let endTime = performance.now();
console.log(`Execution time: ${endTime - startTime} milliseconds`);

startTime = performance.now();
const result2 = delta.toSeconds();
endTime = performance.now();
console.log(`Execution time: ${endTime - startTime} milliseconds`);

startTime = performance.now();
const result3 = delta.applyToDate(pastDate);
endTime = performance.now();
console.log(`Execution time: ${endTime - startTime} milliseconds`);
