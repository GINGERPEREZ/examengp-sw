/**
 * @swagger
 * tags:
 *   name: StudySessions
 *   description: Endpoints para gestión de sesiones de estudio
 */
import { Router } from 'express';
import { StudySessionsController } from './controller';
import { StudySessionRepositoryImpl } from '../../infrastructure/repositories/study-session.repository.impl';
import { StudySessionTypeOrmDatasourceImpl } from '../../infrastructure/datasource/study-session.typeorm.datasource.impl';
import { FlashcardRepositoryImpl } from '../../infrastructure/repositories/flashcard.repository.impl';
import { FlashcardTypeOrmDatasourceImpl } from '../../infrastructure/datasource/flashcard.typeorm.datasource.impl';

export class StudySessionRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new StudySessionTypeOrmDatasourceImpl();
    const repository = new StudySessionRepositoryImpl(datasource);
    const controller = new StudySessionsController(repository);

    /**
     * @swagger
     * /study-sessions/{id}/flashcards:
     *   get:
     *     summary: Obtiene las flashcards asociadas a la categoría de la sesión de estudio
     *     tags: [StudySessions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la sesión de estudio
     *     responses:
     *       200:
     *         description: Lista de flashcards de la sesión
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Flashcard'
     *       404:
     *         description: Sesión no encontrada
     */
    router.get('/:id/flashcards', async (req, res) => {
      const sessionId = Number(req.params.id);
      const session = await repository.findById(sessionId);
      if (!session) return res.status(404).json({ error: 'StudySession not found' });
      const flashcardRepo = new FlashcardRepositoryImpl(new FlashcardTypeOrmDatasourceImpl());
      const flashcards = await flashcardRepo.findByCategory(session.categoryId);
      res.json(flashcards);
    });

    /**
     * @swagger
     * /study-sessions:
     *   get:
     *     summary: Obtiene todas las sesiones de estudio
     *     tags: [StudySessions]
     *     parameters:
     *       - in: query
     *         name: studentId
     *         schema:
     *           type: integer
     *         required: false
     *         description: Filtrar por ID de estudiante
     *     responses:
     *       200:
     *         description: Lista de sesiones de estudio
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/StudySession'
     */
    router.get('/', controller.getStudySessions);

    /**
     * @swagger
     * /study-sessions/{id}:
     *   get:
     *     summary: Obtiene una sesión de estudio por ID
     *     tags: [StudySessions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la sesión de estudio
     *     responses:
     *       200:
     *         description: Sesión encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/StudySession'
     *       404:
     *         description: Sesión no encontrada
     */
    router.get('/:id', controller.getStudySessionById);

    /**
     * @swagger
     * /study-sessions:
     *   post:
     *     summary: Crea una nueva sesión de estudio
     *     tags: [StudySessions]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/StudySessionInput'
     *     responses:
     *       201:
     *         description: Sesión creada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/StudySession'
     *       400:
     *         description: Datos inválidos
     */
    router.post('/', controller.createStudySession);

    /**
     * @swagger
     * /study-sessions/{id}:
     *   put:
     *     summary: Actualiza una sesión de estudio
     *     tags: [StudySessions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la sesión de estudio
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/StudySessionInput'
     *     responses:
     *       200:
     *         description: Sesión actualizada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/StudySession'
     *       400:
     *         description: Datos inválidos
     *       404:
     *         description: Sesión no encontrada
     */
    router.put('/:id', controller.updateStudySession);

    /**
     * @swagger
     * /study-sessions/{id}:
     *   delete:
     *     summary: Elimina una sesión de estudio
     *     tags: [StudySessions]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la sesión de estudio
     *     responses:
     *       204:
     *         description: Sesión eliminada
     *       404:
     *         description: Sesión no encontrada
     */
    router.delete('/:id', controller.deleteStudySession);

    return router;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     StudySession:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         studentId:
 *           type: integer
 *         categoryId:
 *           type: integer
 *         startedAt:
 *           type: string
 *           format: date-time
 *         endedAt:
 *           type: string
 *           format: date-time
 *     StudySessionInput:
 *       type: object
 *       properties:
 *         studentId:
 *           type: integer
 *         categoryId:
 *           type: integer
 *       required:
 *         - studentId
 *         - categoryId
 */ 