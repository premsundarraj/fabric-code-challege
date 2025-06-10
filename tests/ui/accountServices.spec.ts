import { test, expect } from '@playwright/test'
import { PageManager } from '../../page-objects/pageManager'
import { faker } from '@faker-js/faker';

test.describe.configure({ mode: 'serial' });
let accountNumber: string
let payeeName: string

test.beforeEach(async ({ page }) => {
    await page.goto('/parabank/index.htm')
    const pm = new PageManager(page)
    await pm.login().enterCredentialsAndLogin(`${process.env.USERNAME}`, `${process.env.PASSWORD}`)
    await expect(page.locator('h1').getByText('Accounts Overview')).toBeVisible()
})

test('open new account', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().openNewAccount()
    await pm.newAccount().savingsAccount()
    await expect(page.getByText('Congratulations, your account is now open.')).toBeVisible()
    accountNumber = await pm.newAccount().newAccountDetails()
})

test('view account balance', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().accountsOverview()
    const balance = await pm.accountOverview().getBalance(accountNumber)
    expect(balance).toEqual('$100.00')
})

test('transfer funds to different account', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().transferFunds()
    await pm.transferFunds().send('50', accountNumber)
    await expect(page.locator('#amountResult')).toHaveText('$50.00');
    await expect(page.locator('#fromAccountIdResult')).toHaveText(accountNumber);

})

test('pay bill using created account', async ({ page }) => {
    const pm = new PageManager(page)
    payeeName = faker.person.fullName()
    await pm.navigateTo().payBill()
    await pm.payment().payBill(accountNumber, '20', payeeName)
    await expect(page.locator('#amount')).toHaveText('$20.00');
    await expect(page.locator('#fromAccountId')).toHaveText(accountNumber);
})

test('search transactions via API', async ({ request }) => {
    const transactionResponse = await request.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountNumber}/transactions/amount/20?timeout=30000`, {
        headers: {
            "cookie": `JSESSIONID=${process.env.COOKIE_VALUE}`
        }
    })
    expect(transactionResponse.status()).toEqual(200)
    const responseData = await transactionResponse.json()

    expect(responseData[0].accountId).toEqual(Number(accountNumber))
    expect(responseData[0].amount).toEqual(20.00)
    expect(responseData[0].description).toEqual(`Bill Payment to ${payeeName}`)






})

