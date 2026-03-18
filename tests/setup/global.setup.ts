import { execSync } from 'node:child_process';
import { BASE_URL } from '../../environments';

export default async function globalSetup(): Promise<void> {
  if (process.env.ENV === 'local') {
    execSync('docker compose up -d', { stdio: 'inherit' });
  }

  const TIMEOUT = 30000;
  const INTERVAL = 1000;
  const START_DATE = Date.now();

  while (Date.now() - START_DATE < TIMEOUT) {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, INTERVAL));
  }

  throw new Error(`Server at ${BASE_URL} did not become ready within ${TIMEOUT}ms`);
}
