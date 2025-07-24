/// <reference types="node" />
import 'reflect-metadata';
import { envs } from './config/envs';
import { Server } from './presentation/server';
import { initializeTypeORM } from './data/typeorm/typeorm.config';
import { AppRoutes } from './presentation/routes';

(async()=> {
  main();
})();

async function main() {
  try {
    console.log('🔗 Initializing TypeORM database...');
    await initializeTypeORM();
    console.log('✅ TypeORM database initialized successfully');
  } catch (error) {
    console.error('❌ Error during TypeORM database initialization:', error);
    process.exit(1);
  }

  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
}