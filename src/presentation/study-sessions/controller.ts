import { Request, Response } from 'express';
import { CreateStudySession, UpdateStudySession, DeleteStudySession, GetStudySession, GetStudySessions, StudySessionRepository } from '../../domain';
import { CreateStudySessionDto, UpdateStudySessionDto } from '../../domain/dtos';

export class StudySessionsController {
  constructor(private readonly studySessionRepository: StudySessionRepository) {}

  public getStudySessions = async (req: Request, res: Response) => {
    const { studentId } = req.query;
    if (studentId) {
      const sessions = await this.studySessionRepository.findByStudent(Number(studentId));
      return res.json(sessions);
    }
    const sessions = await new GetStudySessions(this.studySessionRepository).execute();
    res.json(sessions);
  };

  public getStudySessionById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const session = await new GetStudySession(this.studySessionRepository).execute(id);
    if (!session) return res.status(404).json({ error: 'StudySession not found' });
    res.json(session);
  };

  public createStudySession = async (req: Request, res: Response) => {
    const [error, dto] = CreateStudySessionDto.create(req.body);
    if (error) return res.status(400).json({ error });
    const session = await new CreateStudySession(this.studySessionRepository).execute(dto! as any);
    res.status(201).json(session);
  };

  public updateStudySession = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [error, dto] = UpdateStudySessionDto.create({ ...req.body, id });
    if (error) return res.status(400).json({ error });
    const session = await new UpdateStudySession(this.studySessionRepository).execute(dto! as any);
    res.json(session);
  };

  public deleteStudySession = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await new DeleteStudySession(this.studySessionRepository).execute(id);
    res.status(204).send();
  };
} 