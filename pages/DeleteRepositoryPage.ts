import { Page, Locator, expect } from '@playwright/test';
import { testData } from 'globalConfig/constants';
import { byId } from 'utils/locators';
import { button } from 'utils/clickUtils';
import { textField } from 'utils/forms/formHandlers';

export class DeleteRepositoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async deleteRepository(username: string, repositoryName: string): Promise<void> {
  
    const deleteBtn = byId(this.page, 'button', testData.id.delete_repo);
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    await expect(byId(this.page, 'dialog', testData.id.delete_repo_dialog)).toBeVisible();
    await button.clickOnButton(byId(this.page, 'button', testData.id.confirm_delete_repo));
    await button.clickOnButton(byId(this.page, 'button', testData.id.confirm_delete_repo));

    await textField.fill(byId(this.page, 'input', testData.id.delete_proceed_verification), `${username}/${repositoryName}`);
    await button.clickOnButton(byId(this.page, 'button', testData.id.confirm_delete_repo));

    const alertLocator: Locator = this.page.getByRole('alert');
    await expect(alertLocator).toBeVisible();
    await expect(alertLocator).toHaveText(
      new RegExp(`Your repository "${username}/${repositoryName}" was successfully deleted.`)
    );
  }
}
