import test, { expect } from "@playwright/test";

test('test', async ({page}) => {
  await page.goto('http://localhost:5173/')
  const text = page.getByText('Dashboard Statistic');
  expect(text).toHaveText('Dashboard Statistic')
})