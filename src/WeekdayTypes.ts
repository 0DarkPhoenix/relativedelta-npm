/**
 * Day of week constants
 */
export const DayOfWeek = {
	Monday: 0,
	Tuesday: 1,
	Wednesday: 2,
	Thursday: 3,
	Friday: 4,
	Saturday: 5,
	Sunday: 6,
} as const;

export type DayOfWeekValue = (typeof DayOfWeek)[keyof typeof DayOfWeek];

/**
 * Type for weekday strings
 */
export type WeekdayString = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";

/**
 * Maps weekday string to day of week number
 */
export const weekDayMap: Record<WeekdayString, DayOfWeekValue> = {
	// biome-ignore lint/style/useNamingConvention: Day must be in all capital letters
	MO: DayOfWeek.Monday,
	// biome-ignore lint/style/useNamingConvention: Day must be in all capital letters
	TU: DayOfWeek.Tuesday,
	// biome-ignore lint/style/useNamingConvention: Day must be in all capital letters
	WE: DayOfWeek.Wednesday,
	// biome-ignore lint/style/useNamingConvention: Day must be in all capital letters
	TH: DayOfWeek.Thursday,
	// biome-ignore lint/style/useNamingConvention: Day must be in all capital letters
	FR: DayOfWeek.Friday,
	// biome-ignore lint/style/useNamingConvention: Day must be in all capital letters
	SA: DayOfWeek.Saturday,
	// biome-ignore lint/style/useNamingConvention: Day must be in all capital letters
	SU: DayOfWeek.Sunday,
};

/**
 * Weekday class to represent a specific weekday
 */
export class Weekday {
	/**
	 * The day of week (0-6, where 0 is Monday)
	 */
	public weekDay!: DayOfWeekValue;
	/**
	 * The occurrence of the weekday (e.g., 1 for next occurrence, -1 for previous occurrence)
	 */
	public n: number;

	/**
	 * Create a new Weekday instance
	 *
	 * @param weekDay Day of week (0-6) or a WeekdayString ('MO', 'TU', etc.)
	 * @param n Occurrence of the weekday (optional, defaults to 1)
	 */
	constructor(weekDay: DayOfWeekValue | WeekdayString, n = 1) {
		if (typeof weekDay === "string") {
			if (!(weekDay in weekDayMap)) {
				throw new Error(`Invalid weekday string: ${weekDay}`);
			}
			this.weekDay = weekDayMap[weekDay];
		} else if (typeof weekDay === "number") {
			if (!Number.isInteger(weekDay) || weekDay < 0 || weekDay > 6) {
				throw new Error(
					`Invalid weekday number: ${weekDay}. Weekday number must be an integer between 0 and 6`,
				);
			}
			this.weekDay = weekDay;
		}

		this.n = Math.trunc(n);
	}
}

/**
 * Creates a Weekday instance representing Monday
 * @param n Optional occurrence of Monday (defaults to 1)
 * @returns A Weekday instance for Monday
 */
export const MO = (n?: number) => new Weekday(DayOfWeek.Monday, n);

/**
 * Creates a Weekday instance representing Tuesday
 * @param n Optional occurrence of Tuesday (defaults to 1)
 * @returns A Weekday instance for Tuesday
 */
export const TU = (n?: number) => new Weekday(DayOfWeek.Tuesday, n);

/**
 * Creates a Weekday instance representing Wednesday
 * @param n Optional occurrence of Wednesday (defaults to 1)
 * @returns A Weekday instance for Wednesday
 */
export const WE = (n?: number) => new Weekday(DayOfWeek.Wednesday, n);

/**
 * Creates a Weekday instance representing Thursday
 * @param n Optional occurrence of Thursday (defaults to 1)
 * @returns A Weekday instance for Thursday
 */
export const TH = (n?: number) => new Weekday(DayOfWeek.Thursday, n);

/**
 * Creates a Weekday instance representing Friday
 * @param n Optional occurrence of Friday (defaults to 1)
 * @returns A Weekday instance for Friday
 */
export const FR = (n?: number) => new Weekday(DayOfWeek.Friday, n);

/**
 * Creates a Weekday instance representing Saturday
 * @param n Optional occurrence of Saturday (defaults to 1)
 * @returns A Weekday instance for Saturday
 */
export const SA = (n?: number) => new Weekday(DayOfWeek.Saturday, n);

/**
 * Creates a Weekday instance representing Sunday
 * @param n Optional occurrence of Sunday (defaults to 1)
 * @returns A Weekday instance for Sunday
 */
export const SU = (n?: number) => new Weekday(DayOfWeek.Sunday, n);
