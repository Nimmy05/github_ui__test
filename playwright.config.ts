import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./configs/global-setup'),

  use: {
    baseURL: 'https://github.com',
    trace: 'on-first-retry',
    // Store the storage state in the root-level storage folder
    storageState: path.resolve(process.cwd(), 'storage/github-auth.json'),
    headless: false,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
