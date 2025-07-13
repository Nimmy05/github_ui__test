import { faker } from "@faker-js/faker"

export function generateSecureMemorablePassword(length: number): string {
  let base = faker.internet.password({ length: length - 2, memorable: true });

  // Ensure at least one lowercase and one number
  const lowercase = faker.string.alpha({ casing: 'lower', length: 1 });
  const number = faker.string.numeric({ length: 1 });

  const combined = (base + lowercase + number).split('').sort(() => Math.random() - 0.5);
  return combined.join('');
};

export function generateValidUsername(): string {
  let username = faker.internet.username().toLowerCase();

  username = username.replace(/[^a-z0-9-]/g, '');
  username = username.replace(/-{2,}/g, '-');
  username = username.replace(/^-+/, '').replace(/-+$/, '');
  if (!username || username.length === 0) {
    username = 'user' + faker.number.int({ min: 100, max: 999 });
  }

  return username;
};

export function generateSignUpFormValues() {
  const uniqueTag = Date.now(); 

  return {
    email: `lptestgithubcreate+${uniqueTag}@gmail.com`,
    password: generateSecureMemorablePassword(12),
    username: generateValidUsername()
  };
};

export function generateTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14); 
};

export function generateRepoName(): string {
  const timestamp = generateTimestamp();
  return `lp_github_CRUD_auto_${timestamp}`;
};


