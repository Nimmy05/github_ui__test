import { generateRepoName } from 'utils/forms/formDataGenerators';

const thisTestConfig = {
  new_repository_name: generateRepoName(),
  "expected_repository_type": "Public",
  "value_to_rename": "lp_auto_test_rename_repo"
};

export default thisTestConfig;
