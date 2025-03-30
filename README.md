# relativedelta-npm

`relativedelta` is an NPM package which brings the functionality of the [`relativedelta`](https://dateutil.readthedocs.io/en/stable/relativedelta.html) function from the [`dateutil` Python library](https://github.com/dateutil/dateutil) over to Javascript and Typescript.

This makes calculating time deltas, applying different time units to dates and converting time units into other time units easier and more readable, all while respecting varying month lengths and leap years.

## Installation and usage
1. Install the `relativedelta` package
```bash
npm install relativedelta
```
2. Import the `RelativeDelta` class into your code
```javascript
import { RelativeDelta } from 'relativedelta'

// Lets convert 15 days to seconds as an example
const fifteenDaysInSeconds = new RelativeDelta({days: 15}).toSeconds() // Returns 1296000
console.log("Number of seconds in 15 days: ", fifteenDaysInSeconds) // Logs "Number of seconds in 15 days: 1296000"
```


## Similarities and differences with Python's `relativedelta`
A lot of effort has been put into ensuring that this `RelativeDelta` function behaves and feels the same as Python's `relativedelta` function. While most functions could be directly implemented, others had to be implemented in a different way to work with Javascript and Typescript (Like using `.applyToDate()` instead of being able to apply the `RelativeDelta` object to a `Date` object directly. For comparison, in Python you can add a `datetime` object to a `relativedelta` object using the `+` operator).

### Differences
#### Adding dates
`datetime.now + relativedelta()` -> `new RelativeDelta({}).applyToDate(new Date())`

**Python**
```python
datetime.now() + relativedelta(days=1)
```

**Javascript & Typescript**
```javascript
new RelativeDelta({ days: 1 }).applyToDate(new Date())
```

#### Converting relative delta to time unit
**Not Supported** -> `new RelativeDelta({}).toMilliseconds()`, `new RelativeDelta({}).toSeconds()`, ... ,`new RelativeDelta({}).toYears()`

**Python**
```python
# No direct solution exists, so you would have to do it manually
fifteen_days_to_milliseconds = relativedelta(days=15) * 24 * 60 * 60 * 1000
```

**Javascript & Typescript**
```javascript
new RelativeDelta({ days: 15 }).toMilliseconds()
```

#### millisecond and milliseconds parameters
`microsecond`, `microseconds` -> `millisecond`, `milliseconds`

`new Date()` only supports milliseconds as its smallest unit. Therefore, there was no reason to implement the logic to handle microseconds and thus this parameter was renamed to handle milliseconds.

#### date1 and date2 parameters
`dt1`, `dt2` -> `date1`, `date2`

**Python**
```python
relativedelta(dt1=current_date, dt2=previous_date)
```

**Javascript & Typescript**
```javascript
new RelativeDelta({date1: currentDate, date2: previousDate})
```

### Unimplemented parameters
There are a couple of parameters which aren't implemented yet:
- leapdays
- weekday
- yearday
- nlyearday

If you wan't a parameter to be implemented with more priority, feel free to [open an issue](https://github.com/0DarkPhoenix/relativedelta-npm/issues)!
