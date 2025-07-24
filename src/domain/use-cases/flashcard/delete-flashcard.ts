import { FlashcardRepository } from '../../repositories/flashcard.repository';

export class DeleteFlashcard {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}

  async execute(id: number): Promise<void> {
    return this.flashcardRepository.delete(id);
  }
} 