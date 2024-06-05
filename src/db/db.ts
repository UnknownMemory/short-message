import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const queryClient = postgres(process.env.POSTGRES_URL!);
export const db: PostgresJsDatabase = drizzle(queryClient);
