import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
// Array of possible supplement names
const supplementNames = ['Historical_automate', 'Adventuretour_automate', 'Cultural_automate', 'Photography_automate', 'Festival_automate'];

// Function to get a random supplement name
function getRandomSupplementName() {
  const randomIndex = Math.floor(Math.random() * supplementNames.length);
  return supplementNames[randomIndex];
}

const randomName = getRandomSupplementName();


  await page.goto('https://resemolnet.admin.staging.bookingsystem.se/');
  await page.getByText('SV').click();
  await page.getByText('EN', { exact: true }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('tasnim.chowdhury@strativ.se');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('test@1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('menuitem', { name: 'Tour administration' }).locator('span').first().click();
  await page.getByRole('menuitem', { name: 'Tour categories' }).click();
  await page.getByRole('button', { name: 'plus Create category' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill('random');
  await page.getByRole('button', { name: 'Create' }).click();
});
