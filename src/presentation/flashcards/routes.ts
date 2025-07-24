/**
 * @swagger
 * tags:
 *   name: Flashcards
 *   description: Endpoints para gestión de flashcards
 */
import { Router } from 'express';
import { FlashcardsController } from './controller';
import { FlashcardRepositoryImpl } from '../../infrastructure/repositories/flashcard.repository.impl';
import { FlashcardTypeOrmDatasourceImpl } from '../../infrastructure/datasource/flashcard.typeorm.datasource.impl';

export class FlashcardRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new FlashcardTypeOrmDatasourceImpl();
    const repository = new FlashcardRepositoryImpl(datasource);
    const controller = new FlashcardsController(repository);

    /**
     * @swagger
     * /flashcards:
     *   get:
     *     summary: Obtiene todas las flashcards
     *     tags: [Flashcards]
     *     parameters:
     *       - in: query
     *         name: categoryId
     *         schema:
     *           type: integer
     *         required: false
     *         description: Filtrar por ID de categoría
     *     responses:
     *       200:
     *         description: Lista de flashcards
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Flashcard'
     */
    router.get('/', controller.getFlashcards);

    /**
     * @swagger
     * /flashcards/{id}:
     *   get:
     *     summary: Obtiene una flashcard por ID
     *     tags: [Flashcards]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la flashcard
     *     responses:
     *       200:
     *         description: Flashcard encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Flashcard'
     *       404:
     *         description: Flashcard no encontrada
     */
    router.get('/:id', controller.getFlashcardById);

    /**
     * @swagger
     * /flashcards:
     *   post:
     *     summary: Crea una nueva flashcard
     *     tags: [Flashcards]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FlashcardInput'
     *     responses:
     *       201:
     *         description: Flashcard creada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Flashcard'
     *       400:
     *         description: Datos inválidos
     */
    router.post('/', controller.createFlashcard);

    /**
     * @swagger
     * /flashcards/{id}:
     *   put:
     *     summary: Actualiza una flashcard
     *     tags: [Flashcards]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la flashcard
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/FlashcardInput'
     *     responses:
     *       200:
     *         description: Flashcard actualizada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Flashcard'
     *       400:
     *         description: Datos inválidos
     *       404:
     *         description: Flashcard no encontrada
     */
    router.put('/:id', controller.updateFlashcard);

    /**
     * @swagger
     * /flashcards/{id}:
     *   delete:
     *     summary: Elimina una flashcard
     *     tags: [Flashcards]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la flashcard
     *     responses:
     *       204:
     *         description: Flashcard eliminada
     *       404:
     *         description: Flashcard no encontrada
     */
    router.delete('/:id', controller.deleteFlashcard);

    return router;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Flashcard:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         imageUrl:
 *           type: string
 *         createdBy:
 *           type: integer
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *     FlashcardInput:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         imageUrl:
 *           type: string
 *         createdBy:
 *           type: integer
 *         categoryIds:
 *           type: array
 *           items:
 *             type: integer
 *       required:
 *         - question
 *         - answer
 *         - createdBy
 *         - categoryIds
 */ 