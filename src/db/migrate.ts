import '@/../envConfig';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';


const migrationClient = postgres(process.env.POSTGRES_URL!, { max: 1 });
const db: PostgresJsDatabase = drizzle(migrationClient);

async function main() {
    console.info('Running migrations...');

    await migrate(db, { migrationsFolder: 'drizzle' });
    await migrationClient.end()

    console.info('Migrated successfully.');
    process.exit(0);
}

main().catch((error) => {
    console.error('Migration failed.');
    console.error(error)
    process.exit(1);
});
