import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Array of possible supplement names
  const supplementNames = ['Pepsi_automate', 'Coke_automate', 'Sprite_automate', 'Fanta_automate', '7Up_automate'];

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
  await page.getByRole('menuitem', { name: 'Tour administration' }).click();
  await page.getByText('Supplement', { exact: true }).click();
  await page.getByRole('button', { name: 'plus Create supplement' }).click();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill(randomName); // Use the random name
  await page.getByLabel('Unit type').click();
  await page.getByText('Per night', { exact: true }).click();
  await page.getByLabel('Price').click();
  await page.getByLabel('Price').fill('80');
  await page.getByLabel('Quantity').click();
  await page.getByLabel('Quantity').fill('1');
  await page.getByLabel('Category').click();
  await page.getByText('Food', { exact: true }).click();
  await page.getByLabel('Mark as calculated').click();
  await page.getByRole('button', { name: 'Create' }).click();
});
