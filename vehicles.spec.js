import { test, expect } from '@playwright/test';

function getRandomVehicleName() {
  const adjectives = ['Fast', 'Sleek', 'Heavy', 'Light', 'Robust'];
  const nouns = ['Truck', 'Car', 'Bike', 'Bus', 'Van'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
}

test('test', async ({ page }) => {
  await page.goto('https://resemolnet.admin.staging.bookingsystem.se/');
  await page.getByPlaceholder('E-postadress').click({
    button: 'right'
  });
  await page.getByPlaceholder('E-postadress').click();
  await page.getByPlaceholder('E-postadress').fill('tasnim.chowdhury@strativ.se');
  await page.getByPlaceholder('Lösenord').click();
  await page.getByPlaceholder('Lösenord').fill('test@1234');
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.locator('div').filter({ hasText: /^SV$/ }).nth(1).click();
  await page.getByText('EN', { exact: true }).click();
  await page.getByRole('menuitem', { name: 'Tour administration' }).click();
  await page.getByRole('menuitem', { name: 'Coupons' }).locator('span').first().click();
  await page.getByRole('menuitem', { name: 'Vehicles' }).click();
  await page.getByRole('button', { name: 'plus Create vehicle' }).click();
  
  const vehicleName = getRandomVehicleName();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill(vehicleName);
  
  await page.getByLabel('Vehicle type').click();
  await page.getByText('Road').click();
  await page.getByLabel('Capacity').click();
  await page.getByLabel('Capacity').fill('100');
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('no description');
  await page.getByRole('button', { name: 'Create' }).click();
});
