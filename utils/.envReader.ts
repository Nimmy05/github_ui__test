import dotenv from 'dotenv';
dotenv.config();

export function readEnvVars() {
  const username = process.env.DYNAMIC_GITHUB_USER || '';
  const password = process.env.DYNAMIC_GITHUB_PASS || '';
  const email = process.env.DYNAMIC_GITHUB_EMAIL || '';

  return { username, password, email };
}


export function readConstantCreds() {
  const username = process.env.CONST_GITHUB_USER || '';
  const password = process.env.CONST_GITHUB_PASS || '';
  const email = process.env.CONST_GITHUB_EMAIL || '';
  
  return { username, password, email };
}


