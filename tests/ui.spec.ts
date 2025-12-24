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

  type TestCase = `${Page}`;

test.describe('UI Automation', () => {
  test('HomePage' satisfies TestCase, async ({ homePage }) => {
    await homePage.navigate();
    await homePage.assertPageUrl();
    await homePage.assertPageTitle();
    await homePage.assertPageHeading();
    await homePage.assertPageDescription();
    await homePage.assertCubeImage();
    await homePage.assertFooterLinks();
    await homePage.assertNavigationLinks();
  });
  test('DynamicIdPage' satisfies TestCase, async ({ homePage, dynamicIdPage }) => {
    await homePage.navigate();
    await homePage.clickDinamicIdLink();
    await dynamicIdPage.assertPageUrl();
    await dynamicIdPage.assertPageTitle();
    await dynamicIdPage.assertPageHeading();
   // Additional assertions for DynamicIdPage can be added here
  });
});