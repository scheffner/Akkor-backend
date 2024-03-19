import { Given, Then, When } from "@cucumber/cucumber";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Builder, By } from 'selenium-webdriver';

const driver = new Builder().forBrowser('chrome').build();

Given('User navigates to the application', async function () {
    await driver.get('http://localhost:3000');
});

When('User navigates to the login page', async function () {
    await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/button')).click();
});

Then('User enter the username {string} and password {string}', async function (username, password) {
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[1]'))
        .sendKeys(username);

    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/input[2]'))
        .sendKeys(password);
});

Then('User clicks on the login button', async function () {
    await driver.findElement(By.xpath('//*[@id="root"]/section/div/div/div/button')).click();
});