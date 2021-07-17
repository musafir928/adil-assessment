import { getRandomIntegerInRange } from '../utils'
import { months, daysOfMonth } from '../static'

const date = new Date()

export const getRandomDay = (maxDay) => getRandomIntegerInRange(maxDay, 1)
export const getRandomMonth = (maxMonth) => getRandomIntegerInRange(maxMonth)
export const getRandomYear = (maxYear) => getRandomIntegerInRange(maxYear, 1921)
const daysOfMonthCopy = [...daysOfMonth]

export default () => {
    let [currentDay, currentMonth, currentYear] = [date.getDay(), date.getMonth(), 2008]
    let randomYear, randomMonth, randomDay
    randomYear = getRandomYear(currentYear - 13)
    randomMonth = getRandomMonth(11)
    if (randomYear === date.getFullYear - 13) {
        if (currentDay === 1 && currentMonth === 0) {
            randomYear--
        } else if (currentDay === 1 && currentMonth !== 0) {
            currentMonth--
            randomMonth = getRandomMonth(currentMonth)
        } else {
            randomMonth = getRandomMonth(currentMonth)
            if (randomMonth === date.getMonth()) {
                currentDay--
                randomDay = getRandomDay(currentDay)
                return ['' + randomDay, '' + months[randomMonth], '' + randomYear]
            }
        }
    }
    if (randomYear % 4 === 0) {
        daysOfMonthCopy[1] = 29
    }
    randomDay = getRandomDay(daysOfMonthCopy[randomMonth])
    return ['' + randomDay, '' + months[randomMonth], '' + randomYear]
}
