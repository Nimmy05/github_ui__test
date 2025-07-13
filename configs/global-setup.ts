import { chromium } from '@playwright/test';
import { readConstantCreds } from '../utils/.envReader';
import path from 'path';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const creds = readConstantCreds();

  if (!creds.email || !creds.password) {
    throw new Error('Missing GitHub login credentials.');
  }

  await page.goto('https://github.com/login');
  await page.fill('input[id="login_field"]', creds.email);
  await page.fill('input[id="password"]', creds.password);
  await page.click('input[type="submit"]');
  await page.waitForLoadState('domcontentloaded');

  const storagePath = path.resolve(process.cwd(), 'storage/github-auth.json');
  await page.context().storageState({ path: storagePath });

  await browser.close();
}

export default globalSetup;
