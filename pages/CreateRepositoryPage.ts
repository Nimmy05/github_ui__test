
import { Page, Locator, expect } from '@playwright/test';
import { testData, url } from 'globalConfig/constants';
import { textField } from 'utils/forms/formHandlers';
import { byId, byText, byDataValidation } from 'utils/locators';
import { button } from 'utils/clickUtils';

export class CreateRepositoryPage {
  readonly page: Page;
  readonly publicRadioButton: Locator;
  readonly repositoryTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.publicRadioButton = page.locator(`input[value='${testData.attrValues.repository_type}']`);
    this.repositoryTitle = page.locator('div[id="repo-title-component"]');
  }

  async createRepository(repoName: string, expectedRepoType: string, username: string) {
    await this.page.goto(url.navigate_to.create_new_repository);
    await this.page.waitForLoadState('domcontentloaded');

    await textField.fill(byId(this.page, 'input', testData.id.repository_name), repoName);
    await expect(byDataValidation(this.page, 'div span', 'success')).toBeVisible();

    await expect(this.publicRadioButton).toBeVisible();
    await expect(this.publicRadioButton).toBeChecked();

    await button.clickOnButton(byText(this.page, 'button span', testData.button_texts.create_repository));
  };

   async isRepositoryCreated(repoName: string, expectedRepoType: string, username: string) {
    const expectedRepoPath = `/${username}/${repoName}`;
    await expect(this.page).toHaveURL(new RegExp(`.*${expectedRepoPath}`));

    const repositoryNameLocator = this.repositoryTitle.locator('strong a');
    const repositoryTypeLocator = this.repositoryTitle.locator('span[class*="Label"]');

    await expect(repositoryNameLocator).toHaveText(repoName);
    await expect(repositoryTypeLocator).toHaveText(expectedRepoType);
  }
}
