
import { readConstantCreds } from 'utils/.envReader';
import { Locator } from '@playwright/test';
import { button } from 'utils/clickUtils';
import { byId } from 'utils/locators';
import { test, expect } from 'tests/fixtures';
import { testData } from 'globalConfig/constants';

import thisTestConfig from 'configs/create-delete-repository.config.spec';

test.describe(`Update the '${testData.headings.github}' '${testData.texts.repository}' '${testData.texts.auto_merge}' '${testData.texts.pull_request}' settings`, () => {
    test(`should 'Enable' and 'Disable' '${testData.headings.github}' '${testData.texts.repository}' '${testData.texts.auto_merge}' '${testData.texts.pull_request}' settings successfully`, async ({ page, createRepository: createRepoPage, deleteRepository: deleteRepoPage }) => {
        const { username } = readConstantCreds();
        const repositoryName: string = thisTestConfig.new_repository_name;
        const repositoryType: string = thisTestConfig.expected_repository_type;

        await test.step(`Verify the new '${testData.headings.github}' '${testData.texts.repository}' is created successfully`, async ({ }) => {
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

        });

        await test.step(`Click on the '${testData.labels.settings}'`, async ({ }) => {
            await button.clickOnButton(byId(page, 'a', testData.id.repo_settings));
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step(`Verify the '${testData.texts.pull_request}' heading is visible`, async ({ }) => {
            const pullRequestHeading = page.getByRole('heading', { name: 'Pull Requests' });
            
            await expect(pullRequestHeading).toBeVisible();
        });

        const statusIndicator: Locator = page.locator('span[class*="status-indicator-success"]');
        const autoMergeCheckBox: Locator = byId(page, 'input', testData.id.auto_merge);
        
        await test.step(`Verify the '${testData.texts.auto_merge}' checkbox is initially unchecked`, async () => {
            await expect(autoMergeCheckBox).not.toBeChecked();
            await expect(statusIndicator).not.toBeVisible();
        });

        await test.step(`Enable '${testData.texts.auto_merge}' and wait for update`, async () => {
            await autoMergeCheckBox.check();
            await expect(statusIndicator).toBeVisible();
            await expect(autoMergeCheckBox).toBeChecked();
        });

        await test.step(`Disable '${testData.texts.auto_merge}' and wait for update`, async () => {
            await autoMergeCheckBox.uncheck();
            await page.reload();
            await expect(statusIndicator).not.toBeVisible();
            await expect(autoMergeCheckBox).not.toBeChecked();
        });

        await test.step(`Verify the '${testData.headings.github}' '${repositoryName}' is deleted successfully`, async ({ }) => {
            await deleteRepoPage.deleteRepository(username, repositoryName);
        });

    });
});



