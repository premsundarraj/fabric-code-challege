import { test, expect } from '@playwright/test'
import { PageManager } from '../../page-objects/pageManager'
import { faker } from '@faker-js/faker';

test.describe.configure({ mode: 'serial' });

const name = faker.person.fullName().substring(0, 3)
const userName = `${name}@xyz.biz`
const password = faker.internet.password()

test('register a user', async ({ page }) => {
    await page.goto('/parabank/register.htm')
    const pm = new PageManager(page)
    await pm.register().fillUserDetailsAndRegister(userName, password)
    await expect.soft(page.locator('text=Your account was created successfully. You are now logged in.')).toBeVisible({ timeout: 1000 })
    await expect(page.locator(`text=Welcome ${userName}`)).toBeVisible();
})

test('login to webApp using created user', async ({ page }) => {
    await page.goto('/parabank/index.htm')
    const pm = new PageManager(page)
    await pm.login().enterCredentialsAndLogin(userName, password)
    await expect(page.locator('h1').getByText('Accounts Overview')).toBeVisible();
})



