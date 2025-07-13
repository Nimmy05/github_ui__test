import { Page } from '@playwright/test';
import { readEnvVars, readConstantCreds } from './.envReader';

interface GitHubCredentials {
  email: string;
  password: string;
  username?: string;
}

export class LoginUtils {
  readonly page: Page;
  readonly creds: GitHubCredentials;

  constructor(page: Page, options?: { mode?: 'dynamic' | 'constant'; creds?: GitHubCredentials }) {
    this.page = page;

    if (options?.creds) {
      this.creds = options.creds;
    } else if (options?.mode === 'dynamic') {
      this.creds = readEnvVars();
    } else {
      this.creds = readConstantCreds();
    }

    if (!this.creds.email || !this.creds.password) {
      throw new Error(`Missing credentials for mode: ${options?.mode || 'constant'}`);
    }
  }

  async performLogin() {
    await this.page.goto('/login');
    await this.page.fill('input[id="login_field"]', this.creds.email);
    await this.page.fill('input[id="password"]', this.creds.password);
    await this.page.click('input[type="submit"]');
    await this.page.waitForLoadState('domcontentloaded');
  }
}
