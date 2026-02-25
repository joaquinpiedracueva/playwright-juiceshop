export function generateEmail(): string {
  return `test_${Date.now()}@test.com`;
}

export function generatePassword(): string {
  return `Pass_${Date.now()}`;
}
