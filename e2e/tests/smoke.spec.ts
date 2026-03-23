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

  await page.getByLabel('New list name').fill('Personal')
  await page.getByRole('button', { name: 'Create list' }).click()
  await page.getByRole('button', { name: 'Personal' }).click()
  await page.getByLabel('New task in Personal').fill('Buy groceries')
  await page.getByRole('button', { name: '+ New task' }).click()

  await expect(page.getByText('Buy groceries')).toBeVisible()
  await expect(page.getByText('Publish release notes')).not.toBeVisible()

  await page.getByRole('button', { name: 'Combined view' }).click()
  await expect(page.getByText('Buy groceries')).toBeVisible()
  await expect(page.getByText('Publish release notes')).toBeVisible()
  await expect(page.getByLabel('Source list: Sprint backlog')).toBeVisible()
  await expect(page.getByLabel('Source list: Personal')).toBeVisible()

  await page.getByRole('checkbox', { name: 'Mark task "Publish release notes" as completed' }).click()
  await expect(page.getByRole('heading', { name: 'Completed tasks (combined view)' })).toBeVisible()
  await expect(page.getByLabel('Task status: Completed')).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'Mark task "Publish release notes" as active' })).toBeVisible()

  await page.getByRole('button', { name: 'Single list view' }).click()
  await expect(page.getByText('Buy groceries')).toBeVisible()
  await expect(page.getByText('Publish release notes')).not.toBeVisible()

  await page.getByRole('button', { name: 'Sprint backlog' }).click()
  await expect(page.getByText('Publish release notes')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Completed tasks' })).toBeVisible()

  await page.reload()
  await expect(page.getByRole('button', { name: 'Sprint backlog' })).toBeVisible()
  await expect(page.getByText('Publish release notes')).toBeVisible()
  await expect(page.getByRole('checkbox', { name: 'Mark task "Publish release notes" as active' })).toBeVisible()

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('region', { name: 'List and filter controls' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Primary task area' })).toBeVisible()
  await expect(page.getByRole('region', { name: 'Contextual actions' })).toBeVisible()

  const responsiveTaskInput = page.getByLabel('New task in Sprint backlog')
  await responsiveTaskInput.focus()
  await expect(responsiveTaskInput).toBeFocused()

  await page.setViewportSize({ width: 900, height: 900 })
  const layout = page.locator('.app-shell-layout')
  const tabletGridTemplateColumns = await layout.evaluate(
    (element) => window.getComputedStyle(element).gridTemplateColumns,
  )
  expect(tabletGridTemplateColumns.split(' ').length).toBe(1)
  await expect(responsiveTaskInput).toBeFocused()

  await page.setViewportSize({ width: 1024, height: 900 })
  const desktopGridTemplateColumns = await layout.evaluate(
    (element) => window.getComputedStyle(element).gridTemplateColumns,
  )
  expect(desktopGridTemplateColumns.split(' ').length).toBe(3)
  await expect(responsiveTaskInput).toBeFocused()

  await page.setViewportSize({ width: 1280, height: 900 })
  await expect(page.getByRole('button', { name: 'Sprint backlog' })).toBeVisible()
  await expect(page.getByText('Publish release notes')).toBeVisible()
})
