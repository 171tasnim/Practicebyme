import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://resemolnet.admin.staging.bookingsystem.se/');
  await page.locator('.sc-fhzFiK').click();
  await page.locator('div').filter({ hasText: /^SV$/ }).nth(1).click();
  await page.getByTitle('EN', { exact: true }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('tasnim.chowdhury@strativ.se');
  await page.locator('#signIn span').nth(1).click();
  await page.getByPlaceholder('Password').fill('test@1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('menuitem', { name: 'Tour administration' }).click();
  await page.getByRole('menuitem', { name: 'Tour templates' }).locator('span').first().click();
  await page.getByRole('button', { name: 'plus Create tour template' }).click();
  await page.getByPlaceholder('Name of tour template').click();
  await page.getByPlaceholder('Name of tour template').fill('Darjelling tour template/tasnimPlaywright');
  await page.locator('.ant-form-item-control-input-content > .ant-select > .ant-select-selector').first().click();
  await page.getByText('Plane(US Bangla)').click();
  await page.getByLabel('Capacity').click();
  await page.getByLabel('Capacity').fill('100');
  await page.getByPlaceholder('Write text here...').click();
  await page.getByPlaceholder('Write text here...').fill('this is test tour');
  await page.locator('div:nth-child(8) > .ant-form-item > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
  await page.getByTitle('VAT 10% (10%)').click();
  await page.getByLabel('Vat class').press('ArrowDown');
  await page.getByLabel('Vat class').press('ArrowDown');
  await page.getByText('VAT 10% (10%)').nth(1).click();
  await page.getByLabel('Territory').click();
  await page.getByText('EU', { exact: true }).click();
  await page.locator('div:nth-child(10) > .ant-form-item > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
  await page.getByText('Austria').click();
  await page.locator('div:nth-child(11) > .ant-form-item > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
  await page.getByText('test_test_new_loc').click();
  await page.locator('div:nth-child(12) > .ant-form-item > .ant-row > div:nth-child(2) > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
  await page.getByText('City Tour').click();
  await page.getByLabel('Standard price (base)').click();
  await page.getByLabel('Standard price (base)').fill('15000');
  await page.getByLabel('Transport cost').click();
  await page.getByLabel('Transport cost').fill('100');
  await page.getByLabel('Cancel fee (%)').click();
  await page.getByLabel('Cancel fee (%)').fill('5');
  await page.getByLabel('Travel insurance fee (%)').click();
  await page.getByLabel('Travel insurance fee (%)').fill('10');
  await page.locator('#tour_information div').nth(2).click();
  await page.locator('#tour_information div').nth(2).fill('this is tour info');
  await page.getByRole('button', { name: 'plus Add pickup location' }).click();
  await page.getByLabel('Add pickup location').locator('div').filter({ hasText: /^Choose an option$/ }).nth(2).click();
  await page.getByText('Denmark city').click();
  await page.getByLabel('Set price').click();
  await page.getByLabel('Set price').fill('800');
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('button', { name: 'plus Add supplement' }).click();
  await page.getByRole('dialog').locator('#category').click();
  await page.getByText('Food').click();
  await page.getByText('Cashew nut').click();
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('button', { name: 'Create' }).click();
});