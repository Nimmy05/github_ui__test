import { Page, expect } from '@playwright/test';
import { SignUPForm, InputFieldKey } from 'data/interfaces';
import { testData, timeout } from 'globalConfig/constants';
import { writeEnvFile } from 'utils/envWriter';
import { fillSignUpForm, selectOptionBySearchText } from 'utils/forms/formHandlers';
import { getByClassContains, byButtonTextIs, byClass, byButtonContainsText } from 'utils/locators';
import { button } from 'utils/clickUtils';

import thisTestConfig from 'configs/githubSignupUtils.config';

export async function signupToGitHub(page: Page): Promise<void> {
  const signUp: string = testData.github_main_page_class_names.header_menus.sign_up;
  const acceptButtonText: string = testData.button_texts.accept_button;
  const signUpButtonLocator = getByClassContains(page, signUp);
  const acceptButtonLocator = byButtonTextIs(page, acceptButtonText);
  const { sign_up_form_fields } = thisTestConfig;

  await page.goto('/');
  await expect(signUpButtonLocator).toBeVisible();
  await signUpButtonLocator.click();

  try {
    await acceptButtonLocator.waitFor({ state: "visible", timeout });
    await acceptButtonLocator.click();
  } catch {
    console.log(`Cookies banner not found.`);
  }

  await expect(page.getByRole('heading', { level: 2, name: testData.headings.sign_up_page })).toBeVisible();

  const formFields = sign_up_form_fields as SignUPForm;

  for (const key of ['email', 'password', 'login', 'country_or_region'] as const) {
    const field = formFields[key];

    if (field.field_type === 'input') {
      const filledValue = await fillSignUpForm(page, field.field_id, field.value_to_fill, key as InputFieldKey);
      field.value_to_fill = filledValue;
    } else if (field.field_type === 'dropDown') {
      await selectOptionBySearchText.selectdropDownValueBySearch(
        page,
        byClass(page, field.field_id, testData.class_names.sign_up_form_select_panel),
        field.value_to_fill,
        field.country_code,
        key
      );
    }
  }

  writeEnvFile({
    GITHUB_USER: formFields.login.value_to_fill,
    GITHUB_PASS: formFields.password.value_to_fill,
    GITHUB_EMAIL: formFields.email.value_to_fill,
  });

  await button.clickOnButton(byButtonContainsText(page, testData.button_texts.continue_button));

  const captchaHeader = page.locator('h2:has-text("Verify your account")');
  const emailVerificationHeader = page.locator('h2:has-text("Confirm your email address")');
  const successHeader = page.locator('//div[text()="Your account was created successfully! Please sign in to continue."]');

  const maxWaitTimeMs = 15 * 60 * 1000;
  const pollInterval = 3000;
  const startTime = Date.now();

  while ((await captchaHeader.isVisible().catch(() => false)) && Date.now() - startTime < maxWaitTimeMs) {
    console.log('CAPTCHA step... waiting...');
    await page.waitForTimeout(pollInterval);
  }

  while ((await emailVerificationHeader.isVisible().catch(() => false)) && Date.now() - startTime < maxWaitTimeMs) {
    console.log('Email verification... waiting...');
    await page.waitForTimeout(pollInterval);
  }

  await expect(successHeader).toBeVisible({ timeout: 30_000 });
  console.log('GitHub Signup successful!');
}
