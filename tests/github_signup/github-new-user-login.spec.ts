import { test } from '@playwright/test';
import { signupToGitHub } from 'utils/githubSignUpUtils';
import { testData } from 'globalConfig/constants';
import { LoginUtils } from 'utils/loginUtils';
import { config as loadDotenv } from 'dotenv';

loadDotenv();

test.describe(`Automate '${testData.headings.sign_up_page}'`, () => {
  test.describe.configure({ timeout: 30 * 60 * 1000 });

  test(`Verify create new '${testData.headings.github}' user and new user login`, async ({ page }) => {
    await signupToGitHub(page);

    const loginUtils = new LoginUtils(page, { mode: 'dynamic' });
    await loginUtils.performLogin();
  });
});
