import { defineConfig, devices } from '@playwright/test'

const port = 4173

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    // Layout changes between these widths and the two above, so check them for overflow and accessibility.
    { name: 'tablet', grep: /scroll sideways|axe violations/, use: { ...devices['Desktop Chrome'], viewport: { width: 820, height: 1180 } } },
    { name: 'narrow', grep: /scroll sideways/, use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 640 } } },
  ],
  webServer: {
    command: `npx serve .output/public -l ${port} --no-clipboard`,
    port,
    reuseExistingServer: !process.env.CI,
  },
})
