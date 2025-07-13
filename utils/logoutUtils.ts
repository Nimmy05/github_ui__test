import { Page } from '@playwright/test';
import { button } from './clickUtils';  
import { readConstantCreds } from 'utils/.envReader';

const { username } = readConstantCreds();

export class LogoutUtils {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openUserMenu() {
    await button.clickOnButton(this.page.locator(`button[data-login="${username}"]`));
  }

  async logout() {
    const logoutButton = this.page.locator(`a[href="/logout"]`);
    await button.clickOnButton(logoutButton);
  }

  async performLogout() {
    await this.openUserMenu();
    await this.logout();
  }
}



