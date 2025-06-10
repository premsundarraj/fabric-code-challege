import { Page } from "@playwright/test";

export class AccountOverviewPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Get Balance for any Account Number
     * @param accountNumber
     */
    async getBalance(accountNumber: string) {
        const balance = await this.page
            .locator(`tr:has(a[href*="${accountNumber}"]) td:nth-child(2)`)
            .textContent();
        return balance;
    }
}
