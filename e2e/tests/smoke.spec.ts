import { expect, test } from '@playwright/test'

test('loads the app shell', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'List Management' })).toBeVisible()

  const input = page.getByLabel('New list name')
  await input.fill('Sprint backlog')
  await page.getByRole('button', { name: 'Create list' }).click()

  await expect(page.getByText('Sprint backlog')).toBeVisible()

  await page.reload()
  await expect(page.getByText('Sprint backlog')).toBeVisible()
})
