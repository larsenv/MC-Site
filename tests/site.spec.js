import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('tagline does not contain "preserving"', async ({ page }) => {
  const tagline = page.locator('h5.header');
  await expect(tagline).toContainText('The premier repository for Wii and GameCube goodies.');
  await expect(tagline).not.toContainText('preserving');
});

test('fonts are loading correctly (no 404s)', async ({ page }) => {
  const missingResources = [];
  page.on('response', response => {
    if (response.status() === 404) {
      missingResources.push(response.url());
    }
  });
  
  await page.reload();
  expect(missingResources).not.toContain(expect.stringContaining('.woff'));
  expect(missingResources).not.toContain(expect.stringContaining('.woff2'));
});

test('Materialize v2.3.3 is loaded', async ({ page }) => {
  const version = await page.evaluate(() => M.version);
  expect(version).toBe('2.3.3');
});

test('JSON-LD description is correct', async ({ page }) => {
  const jsonLd = await page.evaluate(() => {
    const script = document.querySelector('script[type="application/ld+json"]');
    return JSON.parse(script.innerHTML);
  });
  expect(jsonLd.description).toBe('The premier repository for Wii and GameCube goodies.');
});
