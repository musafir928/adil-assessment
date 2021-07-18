import Builder from './helpers/builder'
import { BASE_URL } from './utils/static'
import randomUser from "./utils/user/index"
import { getUsers, addUser, getUsersByFilter } from './helpers/userDataHelper'
import UserHelper from '../build/helpers/UserHelper'

export const register = async (req, res) => {
    try {
        const count = req.params.count
        let existingUsers = await getUsers()
        let countNeeded = count - existingUsers.length
        if (countNeeded === 0) {
            console.info(`you already generated ${count} users`)
            res.send(`${count} users registered`)
        }
        const users = randomUser(count)
        for (let i = 0; i < users.length; i++) {
            const { email, password, day, month, year, viewPortWidth, viewPortHeight, useragent } = users[i]
            let page = await Builder.build({ width: viewPortWidth, height: viewPortHeight, userAgent: useragent, headlessOption: false })
            await page.clearCookies()
            const userHelper = new UserHelper(page)
            await userHelper.registerUser({ email, password, day, month, year })
            await page.close()
        }
    } catch (error) {
        console.log(error.message)
    }
    register(req, res)
}

export const login = async (req, res) => {
    try {
        let existingUsers = await getUsers()
        if (!existingUsers.length) {
            res.status(404).send('no user on users list')
        }
        const userId = req.params.id
        const user = users[userId]
        if (!user) {
            res.status(404).send('user not found')
        }
        let page = await Builder.build({ width: viewPortWidth, height: viewPortHeight, userAgent: useragent, headlessOption: false })
        await page.clearCookies()
        const userHelper = new UserHelper(page)
        await userHelper.login(user)
        await page.pausePage(5000)
        await page.close()
        res.end('login succeed')
    } catch (error) {
        console.error(error)
        res.end('login failed')
    }
}

export const submitInvitation = async (req, res) => {
    try {
        let existingUsers = await getUsers()
        if (!existingUsers.length) {
            res.status(404).send('no user on users list')
        }
        const userId = req.params.id
        const user = users[userId]
        if (!user) {
            res.status(404).send('user not found')
        }
        let page = await Builder.build({ width: viewPortWidth, height: viewPortHeight, userAgent: useragent, headlessOption: false })
        await page.clearCookies()
        const userHelper = new UserHelper(page)
        await userHelper.submitInvitation(user)
        await page.pausePage(5000)
        await page.close()
        res.end('submit invitation succeed')
    } catch (error) {
        console.error(error)
        res.end('submit invitation failed')
    }
}

export const test = async (req, res) => {
    try {

        const { email, password, day, month, year, viewPortWidth, viewPortHeight, useragent } = randomUser(1)[0]
        let page = await Builder.build({ width: viewPortWidth, height: viewPortHeight, userAgent: useragent, headlessOption: false })
        await page.clearCookies()
        const userHelper = new UserHelper(page)
        await userHelper.test({ email, password, day, month, year })
        await page.pausePage(5000)
        await page.close()
        res.end('test succeed')
    } catch (error) {
        console.error(error)
        res.end('test failed')
    }
}


