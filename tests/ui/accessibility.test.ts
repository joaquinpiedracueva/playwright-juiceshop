import { test, expect } from '../fixtures/ui';

test.fixme(
  'should match home page accessibility guidelines @desktop-only',
  {
    annotation: {
      type: 'issue',
      description: 'https://github.com/joaquinpiedracueva/playwright-juiceshop/issues/4',
    },
  },
  async ({ axeBuilder }) => {
    const results = await axeBuilder.analyze();
    expect(results.violations).toEqual([]);
  },
);
