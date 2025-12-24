import { test as base, expect } from '@playwright/test';

// Pages
import { HomePage } from './pages/HomePage';
import { DynamicIdPage } from './pages/DynamicIdPage';
import { ClassAttributePage } from './pages/ClassAttributePage';
import { HiddenLayersPage } from './pages/HiddenLayersPage';
import { LoadDelayPage } from './pages/LoadDelayPage';
import { AjaxDataPage } from './pages/AjaxDataPage';
import { ClientSideDelayPage } from './pages/ClientSideDelayPage';
import { ClickPage } from './pages/ClickPage';
import { TextInputPage } from './pages/TextInputPage';
import { ScrollbarsPage } from './pages/ScrollbarsPage';
import { DynamicTablePage } from './pages/DynamicTablePage';
import { VerifyTextPage } from './pages/VerifyTextPage';
import { ProgressBarPage } from './pages/ProgressBarPage';
import { VisibilityPage } from './pages/VisibilityPage';
import { SampleAppPage } from './pages/SampleAppPage';
import { MouseOverPage } from './pages/MouseOverPage';
import { NonBreakingSpacePage } from './pages/NonBreakingSpacePage';
import { OverlappedElementPage } from './pages/OverlappedElementPage';
import { ShadowDomPage } from './pages/ShadowDomPage';
import { AlertsPage } from './pages/AlertsPage';
import { FileUploadPage } from './pages/FileUploadPage';
import { AnimatedButtonPage } from './pages/AnimatedButtonPage';
import { DisabledInputPage } from './pages/DisabledInputPage';
import { AutoWaitPage } from './pages/AutoWaitPage';
import { ResourcesPage } from './pages/ResourcesPage';

type Pages = {
  homePage: HomePage;
  dynamicIdPage: DynamicIdPage;
  classAttributePage: ClassAttributePage;
  hiddenLayersPage: HiddenLayersPage;
  loadDelayPage: LoadDelayPage;
  ajaxDataPage: AjaxDataPage;
  clientSideDelayPage: ClientSideDelayPage;
  clickPage: ClickPage;
  textInputPage: TextInputPage;
  scrollbarsPage: ScrollbarsPage;
  dynamicTablePage: DynamicTablePage;
  verifyTextPage: VerifyTextPage;
  progressBarPage: ProgressBarPage;
  visibilityPage: VisibilityPage;
  sampleAppPage: SampleAppPage;
  mouseOverPage: MouseOverPage;
  nonBreakingSpacePage: NonBreakingSpacePage;
  overlappedElementPage: OverlappedElementPage;
  shadowDomPage: ShadowDomPage;
  alertsPage: AlertsPage;
  fileUploadPage: FileUploadPage;
  animatedButtonPage: AnimatedButtonPage;
  disabledInputPage: DisabledInputPage;
  autoWaitPage: AutoWaitPage;
  resourcesPage: ResourcesPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  dynamicIdPage: async ({ page }, use) => {
    await use(new DynamicIdPage(page));
  },
  classAttributePage: async ({ page }, use) => {
    await use(new ClassAttributePage(page));
  },
  hiddenLayersPage: async ({ page }, use) => {
    await use(new HiddenLayersPage(page));
  },
  loadDelayPage: async ({ page }, use) => {
    await use(new LoadDelayPage(page));
  },
  ajaxDataPage: async ({ page }, use) => {
    await use(new AjaxDataPage(page));
  },
  clientSideDelayPage: async ({ page }, use) => {
    await use(new ClientSideDelayPage(page));
  },
  clickPage: async ({ page }, use) => {
    await use(new ClickPage(page));
  },
  textInputPage: async ({ page }, use) => {
    await use(new TextInputPage(page));
  },
  scrollbarsPage: async ({ page }, use) => {
    await use(new ScrollbarsPage(page));
  },
  dynamicTablePage: async ({ page }, use) => {
    await use(new DynamicTablePage(page));
  },
  verifyTextPage: async ({ page }, use) => {
    await use(new VerifyTextPage(page));
  },
  progressBarPage: async ({ page }, use) => {
    await use(new ProgressBarPage(page));
  },
  visibilityPage: async ({ page }, use) => {
    await use(new VisibilityPage(page));
  },
  sampleAppPage: async ({ page }, use) => {
    await use(new SampleAppPage(page));
  },
  mouseOverPage: async ({ page }, use) => {
    await use(new MouseOverPage(page));
  },
  nonBreakingSpacePage: async ({ page }, use) => {
    await use(new NonBreakingSpacePage(page));
  },
  overlappedElementPage: async ({ page }, use) => {
    await use(new OverlappedElementPage(page));
  },
  shadowDomPage: async ({ page }, use) => {
    await use(new ShadowDomPage(page));
  },
  alertsPage: async ({ page }, use) => {
    await use(new AlertsPage(page));
  },
  fileUploadPage: async ({ page }, use) => {
    await use(new FileUploadPage(page));
  },
  animatedButtonPage: async ({ page }, use) => {
    await use(new AnimatedButtonPage(page));
  },
  disabledInputPage: async ({ page }, use) => {
    await use(new DisabledInputPage(page));
  },
  autoWaitPage: async ({ page }, use) => {
    await use(new AutoWaitPage(page));
  },
  resourcesPage: async ({ page }, use) => {
    await use(new ResourcesPage(page));
  },
});

export { expect };
export type { Page, Locator } from '@playwright/test';