import validator from 'email-validator'
import { alphabet, numbers, specialSymbols } from '../static'
import { getRandomIntegerInRange } from '../utils'

const generateRandomEmailUserName = () => {
    // generate random email user name
    const emailUserNameLength = getRandomIntegerInRange(20, 1)
    let name = '';
    let availableChars = alphabet + numbers;
    for (let i = 0; i < emailUserNameLength; i++) {
        let current = ''
        if (i == 1) {
            availableChars = alphabet + numbers + specialSymbols;
        }
        current = availableChars.charAt(getRandomIntegerInRange(availableChars.length - 1));
        name += current;
    }
    return name
}

const generateRandomDomainName = () => {
    //  generate random domain name
    const domainLength = getRandomIntegerInRange(20, 1)
    let domainName = '';
    let availableChars = alphabet + numbers;
    for (let j = 0; j < domainLength; j++) {
        let current = ''
        if (j == 1) {
            availableChars = alphabet + numbers + '-';
        }
        if (j == domainLength) {
            availableChars = alphabet + numbers;
        }
        current = availableChars.charAt(getRandomIntegerInRange(availableChars.length - 1));
        domainName += current;
    }
    return domainName;
}

const generateRandomTLD = () => {
    // generate top level domain name
    const tLDLength = getRandomIntegerInRange(10, 2)
    let randomTLD = '';
    let availableChars = alphabet;
    for (let k = 0; k < tLDLength; k++) {
        let current = ''
        current = availableChars.charAt(getRandomIntegerInRange(availableChars.length - 1))
        randomTLD += current;
    }
    return randomTLD;
}

export function getRandomEmailAddress() {
    const username = generateRandomEmailUserName()
    const domainName = generateRandomDomainName()
    const randomTLD = generateRandomTLD()
    const randomEmailAddress = `${username}@${domainName}.${randomTLD}`;
    const isEmailAddressValid = validator.validate(randomEmailAddress)

    if (!isEmailAddressValid) {
        console.warn(`Invalid email address, trying to generate again`)
        console.log(randomEmailAddress)
        getRandomEmailAddress()
    }
    return randomEmailAddress;
}