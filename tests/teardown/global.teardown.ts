import { execSync } from 'node:child_process';

export default async function globalTeardown(): Promise<void> {
  if (process.env.ENV === 'local') {
    execSync('docker compose down');
  }
}
