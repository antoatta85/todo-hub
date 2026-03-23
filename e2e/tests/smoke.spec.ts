import { expect, test } from '@playwright/test'

test('loads the app shell', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => {
    localStorage.removeItem('todo.lists.v1')
    localStorage.removeItem('todo.tasks.v1')
  })
  await page.reload()

  await expect(page.getByRole('region', { name: 'List and filter controls' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Primary task area' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Contextual actions' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'List Management' })).toBeVisible()

  const listInput = page.getByLabel('New list name')
  await listInput.fill('Sprint backlog')
  await page.getByRole('button', { name: 'Create list' }).click()

  await expect(page.getByRole('button', { name: 'Sprint backlog' })).toBeVisible()

  const taskInput = page.getByLabel('New task in Sprint backlog')
  await taskInput.fill('Publish release notes')
  await page.getByRole('button', { name: '+ New task' }).click()

  await expect(page.getByText('Publish release notes')).toBeVisible()

  await page.reload()
  await expect(page.getByRole('button', { name: 'Sprint backlog' })).toBeVisible()
  await expect(page.getByText('Publish release notes')).toBeVisible()

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('region', { name: 'List and filter controls' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Primary task area' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Contextual actions' })).toBeVisible()

  await page.setViewportSize({ width: 900, height: 900 })
  const layout = page.locator('.app-shell-layout')
  const gridTemplateColumns = await layout.evaluate(
    (element) => window.getComputedStyle(element).gridTemplateColumns,
  )
  expect(gridTemplateColumns.split(' ').length).toBe(3)

  await page.setViewportSize({ width: 1280, height: 900 })
  await expect(page.getByRole('button', { name: 'Sprint backlog' })).toBeVisible()
  await expect(page.getByText('Publish release notes')).toBeVisible()
})
