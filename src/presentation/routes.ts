import { Router } from 'express';
import { UserRoutes } from './users/routes';
import { CategoryRoutes } from './categories/routes';
import { FlashcardRoutes } from './flashcards/routes';
import { StudentRoutes } from './students/routes';
import { StudySessionRoutes } from './study-sessions/routes';
import { FlashcardInteractionRoutes } from './flashcard-interactions/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use('/users', UserRoutes.routes);
    router.use('/categories', CategoryRoutes.routes);
    router.use('/flashcards', FlashcardRoutes.routes);
    router.use('/students', StudentRoutes.routes);
    router.use('/study-sessions', StudySessionRoutes.routes);
    router.use('/flashcard-interactions', FlashcardInteractionRoutes.routes);
    return router;
  }
}

