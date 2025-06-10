import { Page } from "@playwright/test"

export class NewAccountPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async savingsAccount() {
        await this.page.locator('#type').selectOption('SAVINGS')
        await this.page.locator('#fromAccountId').selectOption({ index: 0 });
        await this.page.getByRole('button', { name: 'Open New Account' }).click();
    }

    async newAccountDetails() {
        const accountNumber = await this.page.locator('#newAccountId').innerText()
        return accountNumber
    }

}