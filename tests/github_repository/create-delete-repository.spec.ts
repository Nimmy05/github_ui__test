
import { readConstantCreds } from 'utils/.envReader';
import { test } from 'tests/fixtures';
import { testData } from 'globalConfig/constants';
import { button } from 'utils/clickUtils';
import { byId } from 'utils/locators';
import thisTestConfig from 'configs/create-delete-repository.config.spec'

test.describe(`Automate the "creation and deletion" of a '${testData.headings.github}' '${testData.texts.repository}'`, () => {
    test(`should create and delete '${testData.headings.github}' '${testData.texts.repository}' successfully`, async ({ page, createRepository: createRepoPage, deleteRepository: deleteRepoPage }) => {
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

        await test.step(`Click on the '${testData.labels.settings}' tab`, async ({ }) => {
            await button.clickOnButton(byId(page, 'a', testData.id.repo_settings));
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step(`Verify the '${testData.headings.github}' '${repositoryName}' is deleted successfully`, async ({ }) => {
            await deleteRepoPage.deleteRepository(username, repositoryName);
        });
    });
});



