import { test, expect } from '@playwright/test'
import { PageManager } from '../../page-objects/pageManager'


test.beforeEach(async ({ page }) => {
    await page.goto('/parabank/index.htm')
    const pm = new PageManager(page)
    await pm.login().enterCredentialsAndLogin(`${process.env.USERNAME}`, `${process.env.PASSWORD}`)
    await expect(page.locator('h1').getByText('Accounts Overview')).toBeVisible();
})

test('navigate to account services', async ({ page }) => {
    await expect(page.locator('#leftPanel h2')).toHaveText('Account Services');

    const expectedLinks = [
        { navigator: 'Open New Account', message: 'Open New Account' },
        { navigator: 'Accounts Overview', message: 'Accounts Overview' },
        { navigator: 'Transfer Funds', message: 'Transfer Funds' },
        { navigator: 'Bill Pay', message: 'Bill Payment Service' },
        { navigator: 'Find Transactions', message: 'Find Transactions' },
        { navigator: 'Update Contact Info', message: 'Update Profile' },
        { navigator: 'Request Loan', message: 'Apply for a Loan' },
        { navigator: 'Log Out', message: 'Logout' }
    ];

    for (const linkText of expectedLinks) {
        await expect(page.getByRole('link', { name: linkText.navigator })).toBeVisible();

        if (linkText.navigator !== 'Log Out') {
            await page.getByRole('link', { name: linkText.navigator }).click()
            await expect(page.locator('h1').getByText(linkText.message)).toBeVisible();
        }
    }
})


