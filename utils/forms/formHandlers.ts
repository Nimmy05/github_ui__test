import { Page, Locator, expect } from '@playwright/test';
import { byTextFieldId, byClass } from 'utils/locators';
import { generateSignUpFormValues } from 'utils/forms/formDataGenerators'
import { timeout } from 'globalConfig/constants';
import type { InputFieldKey, FallbackValues } from 'data/interfaces';

export const fillSignUpForm = async (
  page: Page,
  inputId: string,
  valueToFill: string,
  fieldLabel: InputFieldKey
): Promise<string> => {
  const inputLocator = byTextFieldId(page, inputId);
  await inputLocator.waitFor({ state: 'visible' });

  let actualValue = '';
  let newValue = valueToFill;
  const maxRetries = 5;
  let attempts = 0;

  const valueMap: Record<InputFieldKey, keyof FallbackValues> = {
    email: 'email',
    password: 'password',
    login: 'username',
  };

  do {
    await inputLocator.fill('');
    await inputLocator.fill(newValue);
    console.log(`${fieldLabel} value set as ${newValue}`);
    await page.click('body');
    await page.waitForTimeout(timeout / 10);

    actualValue = await inputLocator.inputValue();

    if (actualValue !== newValue) {
      throw new Error(`Value mismatch: Expected ${newValue}, got ${actualValue}`);
    }

    const errorLocator = byClass(page, 'div', 'error');
    const hasError = await errorLocator.isVisible();

    if (!hasError) break;

    console.warn(`Validation error for '${fieldLabel}', retrying...`);

    if (++attempts >= maxRetries) {
      throw new Error(`Validation error for ${fieldLabel}, max retries reached.`);
    }

    const fallbackValues = generateSignUpFormValues();
    const fallbackKey = valueMap[fieldLabel];
    newValue = fallbackValues[fallbackKey];
  } while (true);

  return actualValue;
};

export const selectOptionBySearchText = {
  async selectdropDownValueBySearch(page: Page, dropDownLocator: Locator, value_to_fill: string, countryCode: string, fieldLabel: string) {

    console.log(`Selecting ${fieldLabel} as '${value_to_fill}'..`);
    await dropDownLocator.waitFor({ state: "visible", timeout: timeout });
    await dropDownLocator.click();

    const searchLocator: Locator = page.locator(`input[type='search']`);
    await searchLocator.fill(value_to_fill);

    const optionToSelect: Locator = page.locator(`ul li[data-item-id='${countryCode}']`);
    await optionToSelect.click();

    await expect(page.locator(`//button[@aria-labelledby="country-dropdown-label"]//span[contains(text(), '${value_to_fill}')]`)).toBeVisible();
  },
};

export const textField = {
  async fill(buttonLocator: Locator, valueToFill: string) {
    await buttonLocator.waitFor({ state: 'visible', timeout });
    await buttonLocator.click();
    await buttonLocator.fill(valueToFill);

    const actualValue = await buttonLocator.inputValue();

    if (actualValue !== valueToFill) {
      throw new Error(`Text field value mismatch: expected "${valueToFill}", but got "${actualValue}".`);
    }

  }
};






