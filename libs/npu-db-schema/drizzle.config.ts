import { defineConfig } from 'drizzle-kit';
import { dbCredentials } from './src/env';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  dialect: 'postgresql',
  dbCredentials,
  schema: './src/lib/npu-db-schema.ts',
  out: './drizzle',
});
