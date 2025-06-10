import { Page } from "@playwright/test"

export class NavigationPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async openNewAccount() {
        await this.page.getByRole('link', { name: 'Open New Account' }).click()
    }

    async transferFunds() {
        await this.page.getByRole('link', { name: 'Transfer Funds' }).click()
    }

    async accountsOverview() {
        await this.page.getByRole('link', { name: 'Accounts Overview' }).click()
    }

    async payBill() {
        await this.page.getByRole('link', { name: 'Bill Pay' }).click()
    }
}