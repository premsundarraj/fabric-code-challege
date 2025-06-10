import { faker } from "@faker-js/faker";
import { Page } from "@playwright/test";

export class BillPaymentPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Pay Bill from any account to Payee
     * @param accountNumber 
     * @param amount 
     * @param payeeName
     */
    async payBill(accountNumber: string, amount: string, payeeName: string) {
        const senderAccountNumber = faker.number.int(100000)
        await this.page.locator('input[name="payee.name"]').fill(payeeName)
        await this.page.locator('input[name="payee.address.street"]').fill(`${faker.location.street()}`)
        await this.page.locator('input[name="payee.address.city"]').fill(`${faker.location.city()}`)
        await this.page.locator('input[name="payee.address.state"]').fill(`${faker.location.state()}`)
        await this.page.locator('input[name="payee.address.zipCode"]').fill(`${faker.location.zipCode()}`)
        await this.page.locator('input[name="payee.phoneNumber"]').fill(`${faker.phone.number()}`)
        await this.page.locator('input[name="payee.accountNumber"]').pressSequentially(`${senderAccountNumber}`,{delay: 200})
        await this.page.locator('input[name="verifyAccount"]').pressSequentially(`${senderAccountNumber}`,{delay: 200})
        await this.page.locator('input[name="amount"]').pressSequentially(amount,{delay: 200})
        await this.page.locator('select[name="fromAccountId"]').selectOption(accountNumber)
        await this.page.locator('input.button[value="Send Payment"]').click({delay: 100});
    }
}