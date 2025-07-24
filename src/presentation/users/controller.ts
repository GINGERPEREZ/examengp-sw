import { Request, Response } from 'express';
import { CreateUser, UpdateUser, DeleteUser, GetUser, GetUsers, UserRepository } from '../../domain';
import { CreateUserDto, UpdateUserDto } from '../../domain/dtos';

export class UsersController {
  constructor(private readonly userRepository: UserRepository) {}

  public getUsers = async (req: Request, res: Response) => {
    const users = await new GetUsers(this.userRepository).execute();
    res.json(users);
  };

  public getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await new GetUser(this.userRepository).execute(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  };

  public createUser = async (req: Request, res: Response) => {
    const [error, dto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({ error });
    const user = await new CreateUser(this.userRepository).execute(dto! as any);
    res.status(201).json(user);
  };

  public updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, dto] = UpdateUserDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });
    const user = await new UpdateUser(this.userRepository).execute(dto! as any);
    res.json(user);
  };

  public deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await new DeleteUser(this.userRepository).execute(id);
    res.status(204).send();
  };
} 