/**
 * @swagger
 * tags:
 *   name: FlashcardInteractions
 *   description: Endpoints para registrar y consultar interacciones con flashcards
 */
import { Router } from 'express';
import { FlashcardInteractionsController } from './controller';
import { FlashcardInteractionRepositoryImpl } from '../../infrastructure/repositories/flashcard-interaction.repository.impl';
import { FlashcardInteractionTypeOrmDatasourceImpl } from '../../infrastructure/datasource/flashcard-interaction.typeorm.datasource.impl';

export class FlashcardInteractionRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new FlashcardInteractionTypeOrmDatasourceImpl();
    const repository = new FlashcardInteractionRepositoryImpl(datasource);
    const controller = new FlashcardInteractionsController(repository);

    /**
     * @swagger
     * /flashcard-interactions:
     *   get:
     *     summary: Lista todas las interacciones o filtra por sesión o flashcard
     *     tags: [FlashcardInteractions]
     *     parameters:
     *       - in: query
     *         name: studySessionId
     *         schema:
     *           type: integer
     *         required: false
     *         description: Filtrar por ID de sesión de estudio
     *       - in: query
     *         name: flashcardId
     *         schema:
     *           type: integer
     *         required: false
     *         description: Filtrar por ID de flashcard
     *     responses:
     *       200:
     *         description: Lista de interacciones
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/FlashcardInteraction'
     */
    router.get('/', controller.getInteractions);

    /**
     * @swagger
     * /flashcard-interactions:
     *   post:
     *     summary: Registra una nueva interacción con una flashcard
     *     tags: [FlashcardInteractions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FlashcardInteractionInput'
     *     responses:
     *       201:
     *         description: Interacción registrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/FlashcardInteraction'
     *       400:
     *         description: Datos inválidos
     */
    router.post('/', controller.createInteraction);

    return router;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     FlashcardInteraction:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         studySessionId:
 *           type: integer
 *         flashcardId:
 *           type: integer
 *         shownAt:
 *           type: string
 *           format: date-time
 *         answered:
 *           type: boolean
 *         correct:
 *           type: boolean
 *         responseTime:
 *           type: integer
 *     FlashcardInteractionInput:
 *       type: object
 *       properties:
 *         studySessionId:
 *           type: integer
 *         flashcardId:
 *           type: integer
 *         answered:
 *           type: boolean
 *         correct:
 *           type: boolean
 *         responseTime:
 *           type: integer
 *       required:
 *         - studySessionId
 *         - flashcardId
 *         - answered
 *         - correct
 */ 