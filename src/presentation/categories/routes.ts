/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints para gestión de categorías
 */
import { Router } from 'express';
import { CategoriesController } from './controller';
import { CategoryRepositoryImpl } from '../../infrastructure/repositories/category.repository.impl';
import { CategoryTypeOrmDatasourceImpl } from '../../infrastructure/datasource/category.typeorm.datasource.impl';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new CategoryTypeOrmDatasourceImpl();
    const repository = new CategoryRepositoryImpl(datasource);
    const controller = new CategoriesController(repository);

    /**
     * @swagger
     * /categories:
     *   get:
     *     summary: Obtiene todas las categorías
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: Lista de categorías
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Category'
     */
    router.get('/', controller.getCategories);

    /**
     * @swagger
     * /categories/{id}:
     *   get:
     *     summary: Obtiene una categoría por ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la categoría
     *     responses:
     *       200:
     *         description: Categoría encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       404:
     *         description: Categoría no encontrada
     */
    router.get('/:id', controller.getCategoryById);

    /**
     * @swagger
     * /categories:
     *   post:
     *     summary: Crea una nueva categoría
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CategoryInput'
     *     responses:
     *       201:
     *         description: Categoría creada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       400:
     *         description: Datos inválidos
     */
    router.post('/', controller.createCategory);

    /**
     * @swagger
     * /categories/{id}:
     *   put:
     *     summary: Actualiza una categoría
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la categoría
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CategoryInput'
     *     responses:
     *       200:
     *         description: Categoría actualizada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Category'
     *       400:
     *         description: Datos inválidos
     *       404:
     *         description: Categoría no encontrada
     */
    router.put('/:id', controller.updateCategory);

    /**
     * @swagger
     * /categories/{id}:
     *   delete:
     *     summary: Elimina una categoría
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: ID de la categoría
     *     responses:
     *       204:
     *         description: Categoría eliminada
     *       404:
     *         description: Categoría no encontrada
     */
    router.delete('/:id', controller.deleteCategory);

    return router;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     CategoryInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *       required:
 *         - name
 */ 