import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserTypeOrm } from './user.entity';
import { CategoryTypeOrm } from './category.entity';
import { FlashcardTypeOrm } from './flashcard.entity';
import { StudentTypeOrm } from './student.entity';
import { StudySessionTypeOrm } from './study-session.entity';
import { FlashcardInteractionTypeOrm } from './flashcard-interaction.entity';

config(); // Carga las variables de entorno

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: true, // En desarrollo, crea las tablas automáticamente
    logging: process.env.NODE_ENV === 'development',
    entities: [
      UserTypeOrm,
      CategoryTypeOrm,
      FlashcardTypeOrm,
      StudentTypeOrm,
      StudySessionTypeOrm,
      FlashcardInteractionTypeOrm
    ],
    migrations: ['src/data/typeorm/migrations/**/*.ts'],
    subscribers: ['src/data/typeorm/subscribers/**/*.ts'],
});

// Para inicializar la conexión
export const initializeTypeORM = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');
    } catch (error) {
        console.error('Error during Data Source initialization:', error);
        throw error;
    }
}; 