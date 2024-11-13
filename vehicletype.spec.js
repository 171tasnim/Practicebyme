import { test, expect } from '@playwright/test';

function getRandomVehicleTypeName() {
  const words = ['Fast', 'Sleek', 'Heavy', 'Light', 'Robust', 'Truck', 'Car', 'Bike', 'Bus', 'Van'];
  const randomIndex1 = Math.floor(Math.random() * words.length);
  const randomIndex2 = Math.floor(Math.random() * words.length);
  return `${words[randomIndex1]} ${words[randomIndex2]}`;
}

test('test', async ({ page }) => {
  await page.goto('https://resemolnet.admin.staging.bookingsystem.se/');
  await page.getByPlaceholder('E-postadress').click();
  await page.getByPlaceholder('E-postadress').fill('tasnim.chowdhury@strativ.se');
  await page.getByPlaceholder('Lösenord').click();
  await page.getByPlaceholder('Lösenord').fill('test@1234');
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.getByText('SV').click();
  await page.getByText('EN', { exact: true }).click();
  await page.getByRole('menuitem', { name: 'Tour administration' }).click();
  await page.getByRole('menuitem', { name: 'Vehicles' }).click();
  await page.getByRole('link', { name: 'Vehicle types' }).click();

  for (let i = 0; i < 2; i++) {
    const vehicleTypeName = getRandomVehicleTypeName();
    await page.getByRole('button', { name: 'plus Create vehicle type' }).click();
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill(vehicleTypeName);
    await page.getByRole('button', { name: 'Create', exact: true }).click();
  }
});
