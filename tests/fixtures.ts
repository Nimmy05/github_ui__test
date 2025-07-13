import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { CreateRepositoryPage } from 'pages/CreateRepositoryPage';
import { DeleteRepositoryPage } from 'pages/DeleteRepositoryPage';

type MyFixtures = {
  createRepository: CreateRepositoryPage;
  deleteRepository: DeleteRepositoryPage;
};

export const test = baseTest.extend<MyFixtures>({
  createRepository: async ({ page }, use) => {
    const createRepoPage = new CreateRepositoryPage(page);
    await use(createRepoPage);
  },
  deleteRepository: async ({ page }, use) => {
    const deleteRepoPage = new DeleteRepositoryPage(page);
    await use(deleteRepoPage);
  },
});

export const expect = baseExpect;
