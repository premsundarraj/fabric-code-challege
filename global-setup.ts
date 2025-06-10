import { faker } from '@faker-js/faker'
import { chromium, FullConfig } from '@playwright/test';
import { PageManager } from './page-objects/pageManager'

async function globalSetup(config: FullConfig) {
    const randomName = faker.person.fullName().substring(0, 3)
    const randomUserName = `${randomName}@xyz.biz`
    const randomPassword = faker.internet.password()
    process.env.USERNAME = randomUserName
    process.env.PASSWORD = randomPassword

    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://parabank.parasoft.com/parabank/register.htm')
    const pm = new PageManager(page)
    await pm.register().fillUserDetailsAndRegister(randomUserName, randomPassword)

    const pageContext = page.context()
    const cookie = await pageContext.cookies('https://parabank.parasoft.com/parabank/register.htm')
    process.env.COOKIE_VALUE = cookie[0].value
}

export default globalSetup;