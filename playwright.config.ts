import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  timeout: 10 * 60 * 1000,

  expect: {
    timeout: 15 * 1000,
  },

  outputDir: 'e2e-results/',

  forbidOnly: !!process.env.CI,
  retries: 0,
  // workers: undefined, // runs with default workers; change if needed

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-html' }],
    ['json', { outputFile: 'test-results.json' }],
    ['json', { outputFile: '.e2e-result/e2e-results.json' }],
  ],

  snapshotDir: '.e2e-result/fail/imgs',
  snapshotPathTemplate: 'e2e/snapshot/{testFilePath}-{testName}/{arg}{ext}',

  use: {
    viewport: { width: 1000, height: 1000 },

    video: {
      mode: 'on',
      size: { width: 1000, height: 1000 },
    },

    contextOptions: {
      recordVideo: {
        dir: '.e2e-result/fail/videos/',
      },
    },

    actionTimeout: 20_000,
    trace: 'on',
    headless: false,
    screenshot: 'on',
    testIdAttribute: 'data-test-id',
    browserName: 'chromium',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    },
  ],
};

try {
  config.globalSetup = require.resolve('./e2e/test/utils/global-setup');
} catch {
  // ignore if not present
}

export default config;
