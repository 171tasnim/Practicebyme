import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Generate a random coupon code
  const randomCouponCode = `coupon${Math.random().toString(36).substr(2, 9)}`;

  await page.goto('https://resemolnet.admin.staging.bookingsystem.se/');
  await page.getByPlaceholder('E-postadress').click();
  await page.getByPlaceholder('E-postadress').fill('tasnim.chowdhury@strativ.se');
  await page.getByPlaceholder('Lösenord').click();
  await page.getByPlaceholder('Lösenord').fill('test@1234');
  await page.locator('path').nth(1).click();
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.getByText('SV').click();
  await page.getByText('EN', { exact: true }).click();
  await page.locator('#root').getByText('Tour administration').click();
  await page.getByRole('menuitem', { name: 'Coupons' }).click();
  await page.getByRole('button', { name: 'plus Create coupon' }).click();
  await page.getByLabel('Coupon code').click();
  await page.getByLabel('Coupon code').fill(randomCouponCode);
  await page.getByPlaceholder('Valid from date').click();
  await page.getByTitle('-11-11').locator('div').click();
  await page.locator('div:nth-child(2) > .ant-picker-date-panel > .ant-picker-header > .ant-picker-header-super-next-btn').click();
  await page.getByTitle('-12-31').locator('div').click();
  await page.getByLabel('Discount type').click();
  await page.getByText('Percentage', { exact: true }).click();
  await page.getByLabel('Discount', { exact: true }).click();
  await page.getByLabel('Discount', { exact: true }).fill('5');
  await page.getByRole('button', { name: 'Create' }).click();
});
