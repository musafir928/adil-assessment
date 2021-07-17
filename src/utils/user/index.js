import randomBirthDay from "./randomBirthDay"
import { getRandomEmailAddress } from "./randomEmailAddress"
import randomPassword from "./randomPassword"
import randomFingerPrint from "./randomFingerPrint"

export default (count) => {
    const users = Array(count).fill(0).map(e => {
        const [day, month, year] = randomBirthDay()
        const fingerPrint = randomFingerPrint()
        const { viewPortWidth, viewPortHeight, useragent } = fingerPrint
        const [email, password] = [getRandomEmailAddress(), randomPassword()]
        return {
            email,
            password,
            day,
            month,
            year,
            viewPortWidth,
            viewPortHeight,
            useragent
        }
    })
    return users
}
