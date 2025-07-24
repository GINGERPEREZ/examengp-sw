import { Request, Response } from 'express';
import { CreateStudent, UpdateStudent, DeleteStudent, GetStudent, GetStudents, StudentRepository } from '../../domain';
import { CreateStudentDto, UpdateStudentDto } from '../../domain/dtos';

export class StudentsController {
  constructor(private readonly studentRepository: StudentRepository) {}

  public getStudents = async (req: Request, res: Response) => {
    const students = await new GetStudents(this.studentRepository).execute();
    res.json(students);
  };

  public getStudentById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const student = await new GetStudent(this.studentRepository).execute(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  };

  public createStudent = async (req: Request, res: Response) => {
    const [error, dto] = CreateStudentDto.create(req.body);
    if (error) return res.status(400).json({ error });
    const student = await new CreateStudent(this.studentRepository).execute(dto! as any);
    res.status(201).json(student);
  };

  public updateStudent = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, dto] = UpdateStudentDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });
    const student = await new UpdateStudent(this.studentRepository).execute(dto! as any);
    res.json(student);
  };

  public deleteStudent = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await new DeleteStudent(this.studentRepository).execute(id);
    res.status(204).send();
  };
} 