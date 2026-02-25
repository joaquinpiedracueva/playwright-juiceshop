function uniqueSuffix(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export function generateEmail(): string {
  return `test_${uniqueSuffix()}@test.com`;
}

export function generatePassword(): string {
  return `Pass_${uniqueSuffix()}`;
}
