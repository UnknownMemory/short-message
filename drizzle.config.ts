import './envConfig.ts';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/app/db/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
});
