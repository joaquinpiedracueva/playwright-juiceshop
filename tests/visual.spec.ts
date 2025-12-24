import { test, expect } from '../fixtures';

type Page =
  | 'HomePage'
  | 'DynamicIdPage'
  | 'ClassAttributePage'
  | 'HiddenLayersPage'
  | 'LoadDelayPage'
  | 'AjaxDataPage'
  | 'ClientSideDelayPage'
  | 'ClickPage'
  | 'TextInputPage'
  | 'ScrollbarsPage'
  | 'DynamicTablePage'
  | 'VerifyTextPage'
  | 'ProgressBarPage'
  | 'VisibilityPage'
  | 'SampleAppPage'
  | 'MouseOverPage'
  | 'NonBreakingSpacePage'
  | 'OverlappedElementPage'
  | 'ShadowDomPage'
  | 'AlertsPage'
  | 'FileUploadPage'
  | 'AnimatedButtonPage'
  | 'DisabledInputPage'
  | 'AutoWaitPage'
  | 'ResourcesPage';

type Assertion = 'Screenshot';
type TestCase = `${Page} - ${Assertion}`;

test.describe('Visual Regression Tests', () => {
  test('HomePage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveScreenshot('HomePage.png');
  });

  test('DynamicIdPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/dynamicid');
    await expect(page).toHaveScreenshot('DynamicIdPage.png');
  });

  test('ClassAttributePage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/classattr');
    await expect(page).toHaveScreenshot('ClassAttributePage.png');
  });

  test('HiddenLayersPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/hiddenlayers');
    await expect(page).toHaveScreenshot('HiddenLayersPage.png');
  });

  test('LoadDelayPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/loaddelay');
    await expect(page).toHaveScreenshot('LoadDelayPage.png');
  });

  test('AjaxDataPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/ajax');
    await expect(page).toHaveScreenshot('AjaxDataPage.png');
  });

  test('ClientSideDelayPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/clientdelay');
    await expect(page).toHaveScreenshot('ClientSideDelayPage.png');
  });

  test('ClickPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/click');
    await expect(page).toHaveScreenshot('ClickPage.png');
  });

  test('TextInputPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/textinput');
    await expect(page).toHaveScreenshot('TextInputPage.png');
  });

  test('ScrollbarsPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/scrollbars');
    await expect(page).toHaveScreenshot('ScrollbarsPage.png');
  });

  //FIXME: This test is currently flaky due to dynamic content in the table
  test.skip('DynamicTablePage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/dynamictable');
    await expect(page).toHaveScreenshot('DynamicTablePage.png');
  });

  test('VerifyTextPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/verifytext');
    await expect(page).toHaveScreenshot('VerifyTextPage.png');
  });

  test('ProgressBarPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/progressbar');
    await expect(page).toHaveScreenshot('ProgressBarPage.png');
  });

  test('VisibilityPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/visibility');
    await expect(page).toHaveScreenshot('VisibilityPage.png');
  });

  test('SampleAppPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/sampleapp');
    await expect(page).toHaveScreenshot('SampleAppPage.png');
  });

  test('MouseOverPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/mouseover');
    await expect(page).toHaveScreenshot('MouseOverPage.png');
  });

  test('NonBreakingSpacePage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/nbsp');
    await expect(page).toHaveScreenshot('NonBreakingSpacePage.png');
  });

  test('OverlappedElementPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/overlapped');
    await expect(page).toHaveScreenshot('OverlappedElementPage.png');
  });

  test('ShadowDomPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/shadowdom');
    await expect(page).toHaveScreenshot('ShadowDomPage.png');
  });

  test('AlertsPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/alerts');
    await expect(page).toHaveScreenshot('AlertsPage.png');
  });

  test('FileUploadPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/upload');
    await expect(page).toHaveScreenshot('FileUploadPage.png');
  });

  test('AnimatedButtonPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/animation');
    await expect(page).toHaveScreenshot('AnimatedButtonPage.png');
  });

  test('DisabledInputPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/disabledinput');
    await expect(page).toHaveScreenshot('DisabledInputPage.png');
  });

  test('AutoWaitPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/autowait');
    await expect(page).toHaveScreenshot('AutoWaitPage.png');
  });

  test('ResourcesPage - Screenshot' satisfies TestCase, async ({ page }) => {
    await page.goto('/resources');
    await expect(page).toHaveScreenshot('ResourcesPage.png');
  });
});
