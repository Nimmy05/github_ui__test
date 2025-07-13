import { generateRepoName } from 'utils/forms/formDataGenerators';

const thisTestConfig = {
  new_repository_name: generateRepoName(),
  "expected_repository_type": "Public"
};

export default thisTestConfig;
