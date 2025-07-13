******* Level Path "Github" Test suite *****
Overview
------------------
This project contains an automated test suite for "GitHub CRUD scenarios". The tests are implemented using Playwright UI testing in TypeScript and are Page Object Model. 

Features Tested
-------------------
1. Create a repostory

2. Update a repository

3. Delete a repository

4. Update the Pull request - auto merge status 

5. Github Signup 

Tools
-------------------
1 Playwright (UI testing)

2. TypeScript / Node.js

3. JSON format for test data management

Prerequisites
-------------------
Node.js (v14+ recommended)

npm package manager

Internet connection to access the mock gateway at http://www.github.com/

Installation
-------------------
****Clone this repository:
git clone this repository
cd lp_github_ui_automation_task
***Install dependencies:
npm install
***Install playwright
npm init playwright@latest

Configuration
------------------
The base URL for the payment gateway is set in the playwright.config.ts.
Test interface is managed in the pages/interfaces.ts file.

Running Tests
-------------------
***Execute the full test suite with:
npx playwright test

***For a specific test file, run:
npx playwright test tests/testfile.test.js(eg: npx playwright test tests/githb_repository/create-delete-repository.spec.ts)

Test Data
-------------------
The test data is stored in respective config file in the format of JSON format.

Project Structure
--------------------
/.github
  /workflows
    ci.yml             # GitHub actions workflow for CI
/data
  paymentData.json     # Test data for API tests
/tests
  cancelPaymentSimulation.spec.js
  digitalWalletSimulation.spec.js
  emailConfirmation.spec.js
  expiredCardSimulation.spec.js
  insufficientFundsSimulation.spec.js
  invalidCardSimulation.spec.js
  invalidCVVSimulation.spec.js
  successSimulation.spec.js
 
/utils
  logUtils.js           # Mask sensitive info
  paymentApi.js         # API call logic with retry
/.tmp
  emailLog              # mock email confirmation of payment transaction
package.json            # Node.js dependencies and scripts
/playwright.config.js   # Playwright configuration file
README.md               # Project documentation

*************************CI/CD Integration (GitHub Actions) ****************************************
-----------------------------------------------------------------------------------------------------------
This project includes a GitHub Actions workflow that automatically runs the test suite on every push to the main branch or on pull requests targeting main.

CI Workflow:
--------------------

1. Checks out the code from the repository

2.Sets up Node.js (v18) and installs project dependencies using npm install

3. Installs Playwright along with required browser binaries using npx playwright install --with-deps

4. Runs all Playwright tests using npx playwright test

5. Uploads an HTML test report to the GitHub Actions artifacts section (even if tests fail)

6. Uploads an HTML test report as an artifact

Location of CI workflow file:
-------------------------------
.github/workflows/ci.yml

Run Tests Locally:
--------------------
npm install
npx init playwright@latest
npx playwright test
npx playwright show-report
You can view test results and download HTML reports in the Actions tab of your GitHub repository.

Additional Notes
---------------------
The project is structred in the Page Object Model

Support
----------
For any questions or issues, please contact Nimmy Abraham Chandredath at nimmysmail@gmail.com

Author
-------------
Nimmy Abraham Chandredath
QA Automation Engineer | FinTech & Security Testing Enthusiast
