import dotenv from 'dotenv';
dotenv.config({ quiet: true });

const BASE_URLS: Record<string, string> = {
  local: 'http://localhost:3000',
  prod: 'https://demo.owasp-juice.shop',
};

if (!process.env.ENV) throw new Error('ENV is not set. Add ENV to your .env file (e.g. ENV=local)');
if (!BASE_URLS[process.env.ENV]) throw new Error(`Unknown ENV: ${process.env.ENV}`);

export const BASE_URL = BASE_URLS[process.env.ENV]!;
