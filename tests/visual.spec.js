import { test, expect } from '@playwright/test';

test('parallax section 2 visibility and content', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  
  const parallax2 = page.locator('#parallax-section-2');
  await expect(parallax2).toBeVisible();
  
  const img = parallax2.locator('.parallax img');
  await expect(img).toBeVisible();
  
  // Check naturalWidth to ensure image is loaded
  const naturalWidth = await img.evaluate(el => el.naturalWidth);
  expect(naturalWidth).toBeGreaterThan(0);
  
  // Check if "What You Can Find Here" text is visible and has shadow (indirectly by class)
  const header = page.locator('h2:has-text("What You Can Find Here")');
  await expect(header).toBeVisible();
  await expect(header).toHaveClass(/shadow-text/);
  
  // Check collection visibility
  const collection = page.locator('.solid-collection');
  await expect(collection).toBeVisible();
});
