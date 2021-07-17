import { alphabet, alphabetCapital, specialSymbols, numbers } from '../static'
import { getRandomIntegerInRange } from '../utils'

export default () => {
    const availableCharacters = alphabet + alphabetCapital + numbers
    const passWordLength = getRandomIntegerInRange(20, 6)
    let password = ''
    for (let i = 0; i < passWordLength; i++) {
        let current = ''
        current = availableCharacters.charAt(getRandomIntegerInRange(availableCharacters.length - 1))
        password += current
    }
    return password
}