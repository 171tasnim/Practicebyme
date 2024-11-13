import { test, expect } from '@playwright/test';

test('create multiple tours', async ({ page }) => {
  test.setTimeout(120000); // Increase timeout to 120 seconds

  await page.goto('https://resemolnet.admin.staging.bookingsystem.se/');
  await page.getByText('SV').click();
  await page.getByText('EN', { exact: true }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('tasnim.chowdhury@strativ.se');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('test@1234');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('menuitem', { name: 'Tour administration' }).click();

  // Adding wait to ensure the page has loaded properly
  await page.waitForSelector('text=All tours');
  await page.getByRole('menuitem', { name: 'All tours' }).locator('span').first().click();

  const tours = [
    { name: 'Thailand Tour 6', departureDate: '25' },
    { name: 'Thailand Tour 7', departureDate: '26' },
    { name: 'Thailand Tour 8', departureDate: '27' }
  ];

  for (const tour of tours) {
    console.log(`Creating tour: ${tour.name}`);
    await page.getByRole('button', { name: 'plus Create new tour' }).click();
    await page.waitForSelector('[placeholder="Name of tour"]');
    await page.getByPlaceholder('Name of tour').click();
    await page.getByPlaceholder('Name of tour').fill(tour.name);
    await page.getByLabel('Capacity').click();
    await page.getByLabel('Capacity').press('ArrowLeft');
    await page.getByLabel('Capacity').fill('100');
    await page.locator('.ant-picker').first().click();
    await page.getByText(tour.departureDate).click();
    await page.getByLabel('Territory').click();
    await page.getByText('EU', { exact: true }).click();
    await page.getByLabel('Country').click();
    await page.getByText('Croatia').click();
    await page.getByLabel('Tour price/person').click();
    await page.getByLabel('Tour price/person').fill('500');
    await page.getByLabel('Transport cost').click();
    await page.getByLabel('Transport cost').fill('200');

    await page.getByRole('button', { name: 'plus Add supplement' }).click();

    // Wait for the dialog to appear and stabilize
    await page.waitForSelector('div[role="dialog"]');

    // Use the page object to locate the category input in the dialog
    await page.locator('div[role="dialog"] #category').click();

    // Wait for the dropdown options to be available
    const listbox = await page.waitForSelector('div[role="listbox"]');
    
    // Check if the listbox is visible and contains the expected text
    const foodOption = listbox.locator('text=Food');
    await foodOption.waitFor({ state: 'visible', timeout: 5000 }); // Adjust timeout as needed
    await foodOption.click();

    // Ensure the supplement is added by using a retry mechanism
    const supplementLabel = page.locator('label').filter({ hasText: 'PineappleJuice(4)' });
    await supplementLabel.waitFor({ state: 'visible' });

    // Adding a retry loop for clicking the supplement label
    let supplementAdded = false;
    for (let i = 0; i < 5; i++) { // Retry up to 5 times
      try {
        await supplementLabel.click();
        supplementAdded = true;
        break;
      } catch (error) {
        console.log(`Attempt ${i + 1} failed, retrying...`);
        await page.waitForTimeout(1000); // Wait 1 second before retrying
      }
    }

    if (!supplementAdded) {
      throw new Error('Failed to add supplement after multiple attempts');
    }

    await page.getByRole('button', { name: 'Add', exact: true }).click();

    // Wait for the 'Create' button to be enabled and click it
    const createButton = page.getByRole('button', { name: 'Create' });
    await createButton.waitFor({ state: 'visible' });
    await createButton.click();

    // Wait for a confirmation message or the next page to ensure the tour is created
    await page.waitForSelector('text=Tour created successfully', { timeout: 60000 });

    // Wait for the tour to be created before creating the next one
    await page.waitForTimeout(1000);
  }
});
