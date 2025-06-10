# Playwright Test Automation

This repository contains sample Playwright test scripts for ParaBank web application.

## Prerequisites

* Node.js installed
* Playwright installed globally using npm i -g playwright

## Running Tests
* To run all tests, navigate to the project directory and execute the following command:
  
`npx playwright test`

* To run a specific test file, replace <test-file> with the path to the test file and execute the following command:
`npx playwright test <test-file>`

For example, to run the registration.spec.js test file, execute the following command:

`npx playwright test tests/ui/navigation.spec.js`

## Framework Architecture

**Page Objects**
* All Pages classes are located in page-objects folder. I am not a big fan of defining locators inside page object classes since they make the class look ugly.

**Global Setup**
* Global Setup is configured to register a user and use the same user across all tests and also to get cookie values for API authentication

**Tests**
* All the test cases are grouped under the tests/ui folder. Each file is target to test a user flow in the application

**Test Data Generation**
* Faker node library is used to create fake/mock data for testing purpose.