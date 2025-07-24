/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gestión de usuarios
 */
import { Router } from 'express';
import { UsersController } from './controller';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserTypeOrmDatasourceImpl } from '../../infrastructure/datasource/user.typeorm.datasource.impl';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new UserTypeOrmDatasourceImpl();
    const repository = new UserRepositoryImpl(datasource);
    const controller = new UsersController(repository);

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: Obtiene todos los usuarios
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Lista de usuarios
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/User'
     */
    router.get('/', controller.getUsers);

    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     summary: Obtiene un usuario por ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del usuario
     *     responses:
     *       200:
     *         description: Usuario encontrado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       404:
     *         description: Usuario no encontrado
     */
    router.get('/:id', controller.getUserById);

    /**
     * @swagger
     * /users:
     *   post:
     *     summary: Crea un nuevo usuario
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       201:
     *         description: Usuario creado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Datos inválidos
     */
    router.post('/', controller.createUser);

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     summary: Actualiza un usuario
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del usuario
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       200:
     *         description: Usuario actualizado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       400:
     *         description: Datos inválidos
     *       404:
     *         description: Usuario no encontrado
     */
    router.put('/:id', controller.updateUser);

    /**
     * @swagger
     * /users/{id}:
     *   delete:
     *     summary: Elimina un usuario
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID del usuario
     *     responses:
     *       204:
     *         description: Usuario eliminado
     *       404:
     *         description: Usuario no encontrado
     */
    router.delete('/:id', controller.deleteUser);

    return router;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *     UserInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - password
 */ 