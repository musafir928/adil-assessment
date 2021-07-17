import pptr from "puppeteer-extra"
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha'
import { proxyServer } from "../utils/static"

export default class Builder {
    static async build({ width, height, userAgent, headlessOption }) {
        try {
            pptr.use(StealthPlugin())
            // pptr.use(
            //     RecaptchaPlugin({
            //         provider: {
            //             id: '2captcha',
            //             token: 'cd2cd38b12747978d276042b2b665d27'
            //         },
            //         visualFeedback: true
            //     })
            // )
            const args = [
                '--no-sandbox',
                '--disable-setui-sandbox',
                '--disable-web-security',
                // `--proxy-server=${proxyServer}`
            ]
            const launchOptions = {
                headless: headlessOption,
                slowMo: 200,
                args,
                stealth: true
            }

            const browser = await pptr.launch(launchOptions)
            const page = await browser.newPage()
            if (userAgent) {
                await page.setUserAgent(userAgent)
            }
            await page.setViewport({ width: width || 1290, height: height || 1200 })
            await page.setDefaultTimeout(50000)
            await page.setDefaultNavigationTimeout(50000)
            const extendedPage = new Builder(page)

            return new Proxy(extendedPage, {
                get: (_target, property) => {
                    return extendedPage[property] || browser[property] || page[property]
                }
            })
        } catch (error) {
            console.error(`Setting custom page failed!\n Error: ${error}`)
        }
    }

    constructor(page) {
        this.page = page
    }

    async visit(url, selector) {
        try {
            await this.clearCookies()
            await this.page.goto(url)
            await this.pausePage(1000)
            await this.proceedWhenDnsError()
            await this.page.waitForSelector(selector)
            await this.pausePage(1000)
        } catch (error) {
            console.error(`visit page failed!\n Error: ${error}`)
            await this.page.close()
            return
        }
    }

    async pausePage(time) {
        try {
            await this.page.waitForTimeout(time)
        } catch (error) {
            console.error(`pausing the page failed!\n Error: ${error}`)
            return
        }
    }

    async waitAndClick(selector) {
        try {
            await this.page.waitForSelector(selector)
            await this.page.click(selector)
        } catch (error) {
            console.error(`click selector:${selector} failed!\n Error: ${error}`)
            await this.page.close()
            return
        }
    }

    async waitAndType(selector, text) {
        try {
            await this.page.waitForSelector(selector)
            await this.page.type(selector, text)
        } catch (error) {
            console.error(`typing text into selector:${selector} failed!\n Error: ${error}`)
            return
        }
    }

    async waitAndSelect(selector, option) {
        try {
            await this.page.waitForSelector(selector)
            await this.page.select(selector, option)
        } catch (error) {
            console.error(`typing text into selector:${selector} failed!\n Error: ${error}`)
            return
        }
    }

    async getText(selector) {
        try {
            await this.page.waitForSelector(selector)
            const text = await this.page.$eval(selector, e => e.innerHTML)
            return text
        } catch (error) {
            console.error(`get text from selector:${selector} failed!\n Error: ${error}`)
            return
        }
    }

    async getCount(selector) {
        try {
            await this.page.waitForSelector(selector)
            const count = await this.page.$$eval(selector, items => items.length)
            return count
        } catch (error) {
            console.error(`get count of selector:${selector} failed!\n Error: ${error}`)
            return
        }
    }

    async isElementVisible(selector) {
        try {
            let visible = true
            await this.page.waitForSelector(selector, { visible, timeout: 3000 }).catch(() => {
                visible = false
            })
            return visible
        } catch (error) {
            console.error(`checking selector:${selector} visibility failed!\n Error: ${error}`)
            return
        }
    }

    async proceedWhenDnsError() {
        try {
            const hasDnsError = await this.isElementVisible('#details-button')
            if (hasDnsError) {
                await this.waitAndClick('#details-button')
                await this.waitAndClick('#proceed-link')
            }
            return
        } catch (error) {
            console.error(`proceed DNS error failed failed!\n Error: ${error}`)
            return
        }
    }

    async clearCookies() {
        try {
            const client = await this.page.target().createCDPSession()
            await client.send('Network.clearBrowserCookies')
            await client.send('Network.clearBrowserCache')
        } catch (error) {
            console.error(`clear cookies failed!\n Error: ${error}`)
            return
        }
    }
}