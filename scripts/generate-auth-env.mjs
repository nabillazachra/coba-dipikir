import {pbkdf2Sync, randomBytes} from 'node:crypto';
import {writeFileSync} from 'node:fs';

const email = process.env.CMS_EMAIL?.trim();
const password = process.env.CMS_PASSWORD;

if (!email || !password) {
  throw new Error(
    'CMS_EMAIL dan CMS_PASSWORD wajib diisi sebagai GitHub Actions Secrets sebelum deploy.',
  );
}

const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, 310000, 32, 'sha256');

const lines = [
  `VITE_CMS_EMAIL=${email}`,
  `VITE_CMS_PASSWORD_SALT=${salt.toString('base64')}`,
  `VITE_CMS_PASSWORD_HASH=${hash.toString('base64')}`,
  '',
];

writeFileSync('.env.production', lines.join('\n'));
console.log('CMS auth verifier generated.');
