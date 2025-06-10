import { Page } from "@playwright/test"

export class LoginPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * Login to WebApp using username and password
     * @param username 
     * @param password 
     */
    async enterCredentialsAndLogin(username: string, password: string) {
        await this.page.locator('input[type="text"][name="username"]').pressSequentially(username, { delay: 100 })
        await this.page.locator('input[type="password"][name="password"]').fill(password)
        await this.page.getByRole('button', { name: 'Log In' }).click()
    }

}