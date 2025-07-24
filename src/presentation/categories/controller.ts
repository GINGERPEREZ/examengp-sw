import { Request, Response } from 'express';
import { CreateCategory, UpdateCategory, DeleteCategory, GetCategory, GetCategories, CategoryRepository } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos';
import { UpdateCategoryDto } from '../../domain/dtos';

export class CategoriesController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public getCategories = async (req: Request, res: Response) => {
    console.log('[CategoriesController] getCategories called');
    const categories = await new GetCategories(this.categoryRepository).execute();
    res.json(categories);
  };

  public getCategoryById = async (req: Request, res: Response) => {
    console.log('[CategoriesController] getCategoryById called');
    const id = Number(req.params.id);
    const category = await new GetCategory(this.categoryRepository).execute(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  };

  public createCategory = async (req: Request, res: Response) => {
    console.log('[CategoriesController] createCategory called');
    const [error, dto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({ error });
    const category = await new CreateCategory(this.categoryRepository).execute(dto! as any);
    res.status(201).json(category);
  };

  public updateCategory = async (req: Request, res: Response) => {
    console.log('[CategoriesController] updateCategory called');
    const id = Number(req.params.id);
    const [error, dto] = UpdateCategoryDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });
    const category = await new UpdateCategory(this.categoryRepository).execute(dto! as any);
    res.json(category);
  };

  public deleteCategory = async (req: Request, res: Response) => {
    console.log('[CategoriesController] deleteCategory called');
    const id = Number(req.params.id);
    await new DeleteCategory(this.categoryRepository).execute(id);
    res.status(204).send();
  };
} 