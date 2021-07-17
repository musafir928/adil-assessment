import { getUsers, addUser, getUsersByFilter } from '../helpers/userDataHelper'

class UserHelper {
    constructor(page) {
        this.page = page
    }

    async registerUser({ email, password, day, month, year }) {
        await this.page.visit('https://tidal.com', 'a[href = "/try-now"]')
        await this.page.pausePage(10000)
        await this.page.waitAndClick('a[href = "/try-now"]')
        await this.page.proceedWhenDnsError()
        await this.page.pausePage(1000)
        await this.page.waitAndType('input[id="email"]', email)
        await this.page.waitAndClick('button[type="submit"]')
        await this.page.pausePage(3000)
        if (await this.page.isElementVisible('#registration-first-step')) {
            //create password
            await this.page.waitAndType('input[id="new-password"]', password)
            //confirm password
            await this.page.waitAndType('input[id="password2"]', password)
            //select day
            await this.page.waitAndSelect('#tbi-day', day)
            //select month
            await this.page.waitAndSelect('#tbi-month', month)
            //select year
            await this.page.waitAndSelect('#tbi-year', year)
            //agreement
            await this.page.waitAndClick('terms1')
            //signup
            await this.page.waitAndClick('button[type="submit"]')
        }

        if (!(await this.page.isElementVisible('button[aria-label="My Account"]'))) {
            await this.page.close()
            throw new Error('registration failed, please try again later')
        } else {
            const user = {
                email,
                password,
                isMember: false
            }
            await addUser(user)
            console.info('registration succeeded, user data saved')
        }
    }


    async login({ email, password }) {
        await this.page.visit("https://listen.tidal.com/login", "#email")
        await this.page.waitAndType('#email', email)
        await this.page.waitAndClick('button[type="submit"]')
        await this.page.waitAndType('#password', password)
        await this.page.waitAndClick('button[type="submit"]')
        if (await this.page.isElementVisible('[data-test="profile-image-button"]')) {
            console.log("you've logged in!")
        }
    }

    async submitInvitation({ email, password }) {
        await this.login({ email, password })

        // invitation submitting steps

    }

    async test({ email, password, day, month, year }) {
        await this.page.visit('http://zero.webappsecurity.com', '#searchTerm')
        await this.page.waitAndClick('#signin_button')
        await this.page.waitAndType('#user_login', email)
        await this.page.waitAndType('#user_password', password)
        await this.page.waitAndClick('input[type="submit"]')
        await this.page.pausePage(10000)
    }
}

export default UserHelper