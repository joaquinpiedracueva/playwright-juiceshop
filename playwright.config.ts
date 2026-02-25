import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  webServer: process.env.CI
    ? undefined
    : {
        command: 'docker compose up',
        port: 3000,
        reuseExistingServer: true,
        timeout: 60000,
      },
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: process.env.CI ? 'only-on-failure' : 'only-on-failure',
    trace: process.env.CI ? 'retain-on-failure' : 'retain-on-failure',
    video: process.env.CI ? 'off' : 'retain-on-failure',
  },
  testDir: './tests',
  snapshotPathTemplate: 'tests/baselines/{arg}{ext}',
  fullyParallel: process.env.CI ? false : true,
  expect: {
    timeout: process.env.CI ? 60000 : 45000,
    toHaveScreenshot: process.env.CI ? { maxDiffPixelRatio: 0.03 } : { maxDiffPixelRatio: 0.03 },
  },
  forbidOnly: process.env.CI ? true : false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 5,
  reporter: process.env.CI ? [['github'], ['blob']] : [['html', { open: 'on-failure' }]],
  timeout: process.env.CI ? 120000 : 90000,
  projects: [
    {
      name: 'api',
      testDir: './tests/api',
    },
    {
      name: 'ui-auth',
      testDir: './tests/setup',
      testMatch: 'auth.ui.setup.ts',
    },
    {
      name: 'ui',
      testDir: './tests/ui',
      dependencies: ['ui-auth'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/auth.json',
      },
    },
  ],
});
