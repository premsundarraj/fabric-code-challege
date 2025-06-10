import { Page } from "@playwright/test";
import { RegistrationPage } from './registrationPage'
import { LoginPage } from './loginPage'
import { NavigationPage } from './navigationPage'
import { NewAccountPage } from './newAccountPage'
import { AccountOverviewPage } from "./accountOverviewPage";
import { FundsTransferPage } from "./fundsTransferPage";
import { BillPaymentPage } from "./billPaymentPage";

export class PageManager {

    private readonly page: Page
    private readonly registrationPage: RegistrationPage
    private readonly loginPage: LoginPage
    private readonly navigationPage: NavigationPage
    private readonly newAccountPage: NewAccountPage
    private readonly accountOverviewPage: AccountOverviewPage
    private readonly fundsTransferPage: FundsTransferPage
    private readonly billPaymentPage : BillPaymentPage

    constructor(page: Page) {
        this.page = page
        this.registrationPage = new RegistrationPage(this.page)
        this.loginPage = new LoginPage(this.page)
        this.navigationPage = new NavigationPage(this.page)
        this.newAccountPage = new NewAccountPage(this.page)
        this.accountOverviewPage = new AccountOverviewPage(this.page)
        this.fundsTransferPage = new FundsTransferPage(this.page)
        this.billPaymentPage = new BillPaymentPage(this.page)
    }

    register() {
        return this.registrationPage
    }

    login() {
        return this.loginPage
    }

    navigateTo() {
        return this.navigationPage
    }

    newAccount() {
        return this.newAccountPage
    }

    accountOverview() {
        return this.accountOverviewPage
    }

    transferFunds() {
        return this.fundsTransferPage
    }

    payment(){
        return this.billPaymentPage
    }

}