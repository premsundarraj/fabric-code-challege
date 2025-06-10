import { Page } from "@playwright/test"
import { faker } from "@faker-js/faker"

export class RegistrationPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * Fill User Details form for User Registration
     * @param username
     * @param password 
     */
    async fillUserDetailsAndRegister(username: string, password: string) {
        await this.page.locator('id=customer.firstName').fill(`${faker.person.firstName()}`)
        await this.page.locator('id=customer.lastName').fill(`${faker.person.lastName()}`)
        await this.page.locator('id=customer.address.street').fill(`${faker.location.street()}`)
        await this.page.locator('id=customer.address.city').fill(`${faker.location.city()}`)
        await this.page.locator('id=customer.address.state').fill(`${faker.location.state()}`)
        await this.page.locator('id=customer.address.zipCode').fill(`${faker.location.zipCode()}`)
        await this.page.locator('id=customer.phoneNumber').fill(`${faker.number.int(10000)}`)
        await this.page.locator('id=customer.ssn').fill(`${faker.number.int(1000)}`)
        await this.page.locator('id=customer.username').pressSequentially(username, { delay: 100 });
        await this.page.locator('id=customer.password').pressSequentially(password, { delay: 100 });
        await this.page.locator('id=repeatedPassword').pressSequentially(password, { delay: 100 });
        await this.page.getByRole('button', { name: 'Register' }).click();
    }

}