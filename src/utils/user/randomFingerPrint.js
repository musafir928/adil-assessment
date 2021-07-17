import randomUserAgent from 'random-useragent'
import { getRandomIntegerInRange } from '../utils'

export default function () {
    const useragent = randomUserAgent.getRandom()
    const viewPortWidth = getRandomIntegerInRange(2560, 1000)
    const viewPortHeight = getRandomIntegerInRange(2560, 768)
    return {
        viewPortWidth,
        viewPortHeight,
        useragent
    }
}