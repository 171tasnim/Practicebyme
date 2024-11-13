import { test, expect } from '@playwright/test';

function getRandomTourTagName() {
  const adjectives = ['Historical', 'Adventure', 'Scenic', 'Cultural', 'Relaxing'];
  const nouns = ['Tour', 'Journey', 'Excursion', 'Expedition', 'Trip'];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100); // Add a random number to ensure uniqueness
  return `${adjective} ${noun}${randomNumber}`;
}

test('test', async ({ page }) => {
  await page.goto('https://resemolnet.admin.staging.bookingsystem.se/');
  await page.getByPlaceholder('E-postadress').click();
  await page.getByPlaceholder('E-postadress').fill('tasnim.chowdhury@strativ.se');
  await page.getByPlaceholder('Lösenord').click();
  await page.getByPlaceholder('Lösenord').fill('test@1234');
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.locator('div').filter({ hasText: /^SV$/ }).nth(1).click();
  await page.getByText('EN', { exact: true }).click();
  await page.getByRole('menuitem', { name: 'Tour administration' }).click();
  await page.getByRole('menuitem', { name: 'Tour tags' }).click();
  await page.getByRole('button', { name: 'plus Create tag' }).click();
  
  const tourTagName = getRandomTourTagName();
  await page.getByLabel('Name').click();
  await page.getByLabel('Name').fill(tourTagName);
  await page.getByRole('button', { name: 'Save' }).click();
});
