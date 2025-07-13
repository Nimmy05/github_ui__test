import { Locator } from '@playwright/test';
import { timeout } from 'globalConfig/constants';

export const button = {
  async clickOnButton(buttonLocator: Locator) {
    await buttonLocator.waitFor({ state: 'visible', timeout });
    await buttonLocator.click();
  }
};
