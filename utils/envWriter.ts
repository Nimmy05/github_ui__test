import fs from 'fs';
import path from 'path';

export function writeEnvFile(envVars: Record<string, string>) {
  const envPath = path.resolve(__dirname, '../.env');
  const content = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  fs.writeFileSync(envPath, content);
  console.log(`.env written with user: ${envVars.DYNAMIC_GITHUB_USER}`);
  console.log(`.env written with user: ${envVars.DYNAMIC_GITHUB_EMAIL}`);
  console.log(`.env written with user: ${envVars.DYNAMIC_GITHUB_PASS}`);
}
