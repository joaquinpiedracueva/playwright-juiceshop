import { defineConfig, devices } from '@playwright/test';

// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '../.env'), quiet: true });

const browsers = [
  { name: 'chromium', use: devices['Desktop Chrome'] },
  { name: 'firefox', use: devices['Desktop Firefox'] },
  { name: 'webkit', use: devices['Desktop Safari'] },
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: process.env.CI ? true : false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: process.env.CI ? 'github' : 'html',
  use: { ...devices['Desktop Chrome'] },
  projects: [
    // Non-browser projects
    {
      name: 'api',
      testMatch: 'api.spec.ts',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com/',
      },
    },
    {
      name: 'nosql',
      testMatch: 'nosql.spec.ts',
    },
    {
      name: 'sql',
      testMatch: 'sql.spec.ts',
    },

    // Browser-based projects
    ...browsers.flatMap(browser => [
      {
        name: `ui-${browser.name}`,
        testMatch: 'ui.spec.ts',
        use: {
          ...browser.use,
          baseURL: 'http://uitestingplayground.com/',
        },
      },
      {
        name: `accessibility-${browser.name}`,
        testMatch: 'accessibility.spec.ts',
        use: {
          ...browser.use,
          baseURL: 'https://www.w3.org/WAI/demos/', // /bad and /good
        },
      },
      {
        name: `visual-${browser.name}`,
        testMatch: 'visual.spec.ts',
        use: {
          ...browser.use,
          baseURL: 'http://uitestingplayground.com/',
        },
      },
    ]),
  ],
});