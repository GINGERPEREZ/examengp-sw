/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Endpoints para gestión de estudiantes
 */
import { Router } from 'express';
import { StudentsController } from './controller';
import { StudentRepositoryImpl } from '../../infrastructure/repositories/student.repository.impl';
import { StudentTypeOrmDatasourceImpl } from '../../infrastructure/datasource/student.typeorm.datasource.impl';

export class StudentRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new StudentTypeOrmDatasourceImpl();
    const repository = new StudentRepositoryImpl(datasource);
    const controller = new StudentsController(repository);

    /**
     * @swagger
     * /students:
     *   get:
     *     summary: Obtiene todos los estudiantes
     *     tags: [Students]
     *     responses:
     *       200:
     *         description: Lista de estudiantes
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Student'
     */
    router.get('/', controller.getStudents);

    /**
     * @swagger
     * /students/{id}:
     *   get:
     *     summary: Obtiene un estudiante por ID
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del estudiante
     *     responses:
     *       200:
     *         description: Estudiante encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Student'
     *       404:
     *         description: Estudiante no encontrado
     */
    router.get('/:id', controller.getStudentById);

    /**
     * @swagger
     * /students:
     *   post:
     *     summary: Crea un nuevo estudiante
     *     tags: [Students]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/StudentInput'
     *     responses:
     *       201:
     *         description: Estudiante creado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Student'
     *       400:
     *         description: Datos inválidos
     */
    router.post('/', controller.createStudent);

    /**
     * @swagger
     * /students/{id}:
     *   put:
     *     summary: Actualiza un estudiante
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del estudiante
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/StudentInput'
     *     responses:
     *       200:
     *         description: Estudiante actualizado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Student'
     *       400:
     *         description: Datos inválidos
     *       404:
     *         description: Estudiante no encontrado
     */
    router.put('/:id', controller.updateStudent);

    /**
     * @swagger
     * /students/{id}:
     *   delete:
     *     summary: Elimina un estudiante
     *     tags: [Students]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del estudiante
     *     responses:
     *       204:
     *         description: Estudiante eliminado
     *       404:
     *         description: Estudiante no encontrado
     */
    router.delete('/:id', controller.deleteStudent);

    return router;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *     StudentInput:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *       required:
 *         - userId
 */ 