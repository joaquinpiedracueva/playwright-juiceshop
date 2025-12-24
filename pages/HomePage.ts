import { expect } from '../fixtures';
import type { Locator, Page } from '../fixtures';

export class HomePage {
  constructor(
    private page: Page,
    private pageUrl: string = '/home',
    private pageTitle: string = 'UI Test Automation Playground',
    private pageHeading: Locator = page.getByRole('heading', { name: 'UI Test Automation Playground' }),
    private pageDescriptionAlert: Locator = page.getByRole('alert'),
    private cubeImage: Locator = page.getByRole('img', { name: 'Responsive image' }),
    private cubeLicenceLink: Locator = page.getByRole('link', { name: 'CC 4.0 BY-NC' }),
    private cubeRubikLink: Locator = page.getByRole('link', { name: 'Rubik\'s Cube' }),
    private uitapLink: Locator = page.getByRole('link', { name: 'UITAP' }),
    private homeLink: Locator = page.getByRole('link', { name: 'Home' }),
    private dinamicIdLink: Locator = page.getByRole('link', { name: 'Dynamic ID' }),
    private classAttributeLink: Locator = page.getByRole('link', { name: 'Class Attribute' }),
    private hiddenLayersLink: Locator = page.getByRole('link', { name: 'Hidden Layers' }),
    private loadDelayLink: Locator = page.getByRole('link', { name: 'Load Delay' }),
    private ajaxDataLink: Locator = page.getByRole('link', { name: 'AJAX Data' }),
    private clientSideDelayLink: Locator = page.getByRole('link', { name: 'Client Side Delay' }),
    private clickLink: Locator = page.getByRole('link', { name: 'Click' }),
    private textInputLink: Locator = page.getByRole('link', { name: 'Text Input' }),
    private scrollbarsLink: Locator = page.getByRole('link', { name: 'Scrollbars' }),
    private dynamicTableLink: Locator = page.getByRole('link', { name: 'Dynamic Table' }),
    private verifyTextLink: Locator = page.getByRole('link', { name: 'Verify Text' }),
    private progressBarLink: Locator = page.getByRole('link', { name: 'Progress Bar' }),
    private visibilityLink: Locator = page.getByRole('link', { name: 'Visibility' }),
    private sampleAppLink: Locator = page.getByRole('link', { name: 'Sample App' }),
    private mouseOverLink: Locator = page.getByRole('link', { name: 'Mouse Over' }),
    private nonBreakingSpaceLink: Locator = page.getByRole('link', { name: 'Non-Breaking Space' }),
    private overlappedElementLink: Locator = page.getByRole('link', { name: 'Overlapped Element' }),
    private shadowDomLink: Locator = page.getByRole('link', { name: 'Shadow DOM' }),
    private alertsLink: Locator = page.getByRole('link', { name: 'Alerts' }),
    private fileUploadLink: Locator = page.getByRole('link', { name: 'File Upload' }),
    private animatedButtonLink: Locator = page.getByRole('link', { name: 'Animated Button' }),
    private disabledInputLink: Locator = page.getByRole('link', { name: 'Disabled Input' }),
    private autoWaitLink: Locator = page.getByRole('link', { name: 'Auto Wait' }),
    private resourcesLink: Locator = page.getByRole('link', { name: 'Resources' }),
    private forkMeOnGitHubLink: Locator = page.getByRole('link', { name: 'Fork the website on GitHub' }),
    private rapiseLink: Locator = page.getByRole('link', { name: 'Rapise' }),
    private inflectraLink: Locator = page.getByRole('link', { name: 'Inflectra' }),
    private apacheLicenseLink: Locator = page.getByRole('link', { name: 'Apache License 2.0' }),

) {}
  async navigate() {
    await this.page.goto(this.pageUrl);
  }
  async assertPageUrl() {
    await expect(this.page).toHaveURL(this.pageUrl);
  }
  async assertPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }
  async assertPageHeading() {
    await expect(this.pageHeading).toBeVisible();
  }
  async assertPageDescription() {
    await expect(this.pageDescriptionAlert).toBeVisible();
    await expect(this.pageDescriptionAlert).toHaveText(
      'The purpose of this website is to provide a platform for sharpening UI test automation skills. Use it to practice with your test automation tool. Use it to learn test automation techniques.'
    );
  }
  async assertCubeImage() {
    await expect(this.cubeImage).toBeVisible();
    await expect(this.cubeImage).toHaveAttribute('src', '/static/cube.png');
    await expect(this.cubeImage).toHaveAttribute('alt', 'Responsive image');
  }
  async assertFooterLinks() {
    await expect(this.cubeLicenceLink).toBeVisible();
    await expect(this.cubeRubikLink).toBeVisible();
    await expect(this.forkMeOnGitHubLink).toBeVisible();
    await expect(this.rapiseLink).toBeVisible();
    await expect(this.inflectraLink).toBeVisible();
    await expect(this.apacheLicenseLink).toBeVisible();
    await expect(this.cubeLicenceLink).toHaveAttribute('href', 'https://creativecommons.org/licenses/by-nc/4.0/');
    await expect(this.cubeRubikLink).toHaveAttribute('href', 'http://pngimg.com/download/46552');
    await expect(this.forkMeOnGitHubLink).toHaveAttribute('href', 'https://github.com/inflectra/ui-test-automation-playground');
    await expect(this.rapiseLink).toHaveAttribute('href', 'https://www.inflectra.com/Rapise/');
    await expect(this.inflectraLink).toHaveAttribute('href', 'https://www.inflectra.com/');
    await expect(this.apacheLicenseLink).toHaveAttribute('href', 'https://www.apache.org/licenses/LICENSE-2.0');
  }
  async assertNavigationLinks() {
    await expect(this.uitapLink).toBeVisible();
    await expect(this.homeLink).toBeVisible();
    await expect(this.dinamicIdLink).toBeVisible();
    await expect(this.classAttributeLink).toBeVisible();
    await expect(this.hiddenLayersLink).toBeVisible();
    await expect(this.loadDelayLink).toBeVisible();
    await expect(this.ajaxDataLink).toBeVisible();
    await expect(this.clientSideDelayLink).toBeVisible();
    await expect(this.clickLink).toBeVisible();
    await expect(this.textInputLink).toBeVisible();
    await expect(this.scrollbarsLink).toBeVisible();
    await expect(this.dynamicTableLink).toBeVisible();
    await expect(this.verifyTextLink).toBeVisible();
    await expect(this.progressBarLink).toBeVisible();
    await expect(this.visibilityLink).toBeVisible();
    await expect(this.sampleAppLink).toBeVisible();
    await expect(this.mouseOverLink).toBeVisible();
    await expect(this.nonBreakingSpaceLink).toBeVisible();
    await expect(this.overlappedElementLink).toBeVisible();
    await expect(this.shadowDomLink).toBeVisible();
    await expect(this.alertsLink).toBeVisible();
    await expect(this.fileUploadLink).toBeVisible();
    await expect(this.animatedButtonLink).toBeVisible();
    await expect(this.disabledInputLink).toBeVisible();
    await expect(this.autoWaitLink).toBeVisible();
    await expect(this.resourcesLink).toBeVisible();
  }
  async clickUITAPLink() {
    await expect(this.uitapLink).toBeVisible();
    await this.uitapLink.click();
  }
  async clickHomeLink() {
    await expect(this.homeLink).toBeVisible();
    await this.homeLink.click();
  }
  async clickDinamicIdLink() {
    await expect(this.dinamicIdLink).toBeVisible();
    await this.dinamicIdLink.click();
  }
  async clickClassAttributeLink() {
    await expect(this.classAttributeLink).toBeVisible();
    await this.classAttributeLink.click();
  }
  async clickHiddenLayersLink() {
    await expect(this.hiddenLayersLink).toBeVisible();
    await this.hiddenLayersLink.click();
  }
  async clickLoadDelayLink() {
    await expect(this.loadDelayLink).toBeVisible();
    await this.loadDelayLink.click();
  }
  async clickAjaxDataLink() {
    await expect(this.ajaxDataLink).toBeVisible();
    await this.ajaxDataLink.click();
  }
  async clickClientSideDelayLink() {
    await expect(this.clientSideDelayLink).toBeVisible();
    await this.clientSideDelayLink.click();
  }
  async clickClickLink() {
    await expect(this.clickLink).toBeVisible();
    await this.clickLink.click();
  }
  async clickTextInputLink() {
    await expect(this.textInputLink).toBeVisible();
    await this.textInputLink.click();
  }
  async clickScrollbarsLink() {
    await expect(this.scrollbarsLink).toBeVisible();
    await this.scrollbarsLink.click();
  }
  async clickDynamicTableLink() {
    await expect(this.dynamicTableLink).toBeVisible();
    await this.dynamicTableLink.click();
  }
  async clickVerifyTextLink() {
    await expect(this.verifyTextLink).toBeVisible();
    await this.verifyTextLink.click();
  }
  async clickProgressBarLink() {
    await expect(this.progressBarLink).toBeVisible();
    await this.progressBarLink.click();
  }
  async clickVisibilityLink() {
    await expect(this.visibilityLink).toBeVisible();
    await this.visibilityLink.click();
  }
  async clickSampleAppLink() {
    await expect(this.sampleAppLink).toBeVisible();
    await this.sampleAppLink.click();
  }
  async clickMouseOverLink() {
    await expect(this.mouseOverLink).toBeVisible();
    await this.mouseOverLink.click();
  }
  async clickNonBreakingSpaceLink() {
    await expect(this.nonBreakingSpaceLink).toBeVisible();
    await this.nonBreakingSpaceLink.click();
  }
  async clickOverlappedElementLink() {
    await expect(this.overlappedElementLink).toBeVisible();
    await this.overlappedElementLink.click();
  }
  async clickShadowDomLink() {
    await expect(this.shadowDomLink).toBeVisible();
    await this.shadowDomLink.click();
  }
  async clickAlertsLink() {
    await expect(this.alertsLink).toBeVisible();
    await this.alertsLink.click();
  }
  async clickFileUploadLink() {
    await expect(this.fileUploadLink).toBeVisible();
    await this.fileUploadLink.click();
  }
  async clickAnimatedButtonLink() {
    await expect(this.animatedButtonLink).toBeVisible();
    await this.animatedButtonLink.click();
  }
  async clickDisabledInputLink() {
    await expect(this.disabledInputLink).toBeVisible();
    await this.disabledInputLink.click();
  }
  async clickAutoWaitLink() {
    await expect(this.autoWaitLink).toBeVisible();
    await this.autoWaitLink.click();
  }
  async clickResourcesLink() {
    await expect(this.resourcesLink).toBeVisible();
    await this.resourcesLink.click();
  }
}