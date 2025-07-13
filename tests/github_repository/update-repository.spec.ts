import { expect, Locator } from '@playwright/test';
import { readConstantCreds } from 'utils/.envReader';
import { test } from 'tests/fixtures';
import { button } from 'utils/clickUtils';
import { testData } from 'globalConfig/constants';
import thisTestConfig from 'configs/update-repository.config.spec'
import { byClass, byId, byPartialClass } from 'utils/locators';
import { textField } from 'utils/forms/formHandlers';

test.describe(`Automate the update of a '${testData.headings.github}' '${testData.texts.repository}'`, () => {
    test(`should rename a  '${testData.headings.github}' '${testData.texts.repository}' successfully`, async ({ page, createRepository: createRepoPage, deleteRepository: deleteRepoPage }) => {
        const { username } = readConstantCreds();
        const repositoryName: string = thisTestConfig.new_repository_name;
        const repoNameToRename: string = thisTestConfig.value_to_rename;
        const repositoryType: string = thisTestConfig.expected_repository_type;

        await createRepoPage.createRepository(
            repositoryName,
            repositoryType,
            username
        );

        await createRepoPage.isRepositoryCreated(
            repositoryName,
            thisTestConfig.expected_repository_type,
            username
        );

        await test.step(`Click on the '${testData.labels.settings}'`, async ({ }) => {
            await button.clickOnButton(byId(page, 'a', testData.id.repo_settings));
            await page.waitForLoadState('domcontentloaded');
        });

        const renameButton: Locator = byClass(page, 'button', 'flex-self-end btn');

        await test.step(`Clear and fill the '${testData.texts.repository}' rename field`, async () => {
            const renameInputFieldLocator = byId(page, 'input', testData.id.repo_rename);

            await expect(renameInputFieldLocator).toHaveValue(repositoryName);

            await textField.fill(renameInputFieldLocator, '');
            await expect(renameButton).toBeDisabled();
            await textField.fill(renameInputFieldLocator, repoNameToRename);
            await page.click('body');

            await expect(byPartialClass(page, 'input', testData.class_names.auto_load)).toBeVisible();
            await expect(byPartialClass(page, 'input', testData.class_names.auto_check_success)).toBeVisible();
        });

        await test.step(`Click on the '${testData.button_texts.rename}' button`, async () => {
            await expect(renameButton).toBeEnabled();
            await renameButton.click();
        });

        await createRepoPage.isRepositoryCreated(
            repoNameToRename,
            repositoryType,
            username
        );

        await test.step(`Click on the '${testData.labels.settings}' tab`, async ({ }) => {
            await button.clickOnButton(byId(page, 'a', testData.id.repo_settings));
            await page.waitForLoadState('domcontentloaded');
        });

        await deleteRepoPage.deleteRepository(username, repoNameToRename);

    });
});



