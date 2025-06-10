import { Page } from "@playwright/test";

export class FundsTransferPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Send Funds from one account to another account
     * @param amount
     * @param senderAccountNumer
     */
    async send(amount: string, senderAccountNumer: string) {
        await this.page.locator("#amount").fill(amount);
        await this.page.locator("#fromAccountId").selectOption(senderAccountNumer);

        const options = await this.page
            .locator("#toAccountId option")
            .allInnerTexts();
        const validOptions = options.filter(
            (value) => value !== senderAccountNumer
        );

        if (validOptions.length > 0) {
            await this.page.locator("#toAccountId").selectOption(validOptions[0]);
        } else {
            await this.page.locator("#toAccountId").selectOption(senderAccountNumer);
        }
        await this.page.getByRole("button", { name: "Transfer" }).click();
    }
}
