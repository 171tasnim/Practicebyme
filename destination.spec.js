import { test, expect } from '@playwright/test';

function getRandomName(type) {
  const locations = ['Phuket', 'Bangkok', 'Chiang Mai', 'Pattaya', 'Krabi'];
  const pickupLocations = ['Central Mall', 'Train Station', 'Airport', 'Hotel Lobby', 'Bus Terminal'];

  if (type === 'location') {
    return locations[Math.floor(Math.random() * locations.length)];
  } else if (type === 'pickup') {
    return pickupLocations[Math.floor(Math.random() * pickupLocations.length)];
  }
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
  await page.getByRole('menuitem', { name: 'Destinations' }).locator('span').first().click();
  await page.getByRole('button', { name: 'plus Create location' }).click();

  const randomLocationName = getRandomName('location');
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill(randomLocationName);

  await page.getByLabel('Territory').click();
  await page.getByText('EU', { exact: true }).click();
  await page.getByLabel('Country').click();
  await page.getByLabel('Country').fill('');
  await page.getByTitle('Bulgaria').click();
  await page.getByRole('button', { name: 'Create' }).click();

  await page.getByRole('tab', { name: 'Pickup locations' }).click();
  await page.getByRole('button', { name: 'plus Create pickup location' }).click();

  const randomPickupLocationName = getRandomName('pickup');
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill(randomPickupLocationName);

  await page.locator('.ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
  await page.locator('.rc-virtual-list-scrollbar-thumb').click();
  await page.getByLabel('Pickup location area').fill('');
  await page.getByText('Berlin').click();
  await page.getByRole('button', { name: 'Create' }).click();
});
