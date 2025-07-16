import { inject, injectable } from 'inversify';
import { TYPES } from '../../../container/types';
import { ITransactionRepository } from '../../../domain/repositories/transaction-repository';

@injectable()
export class DeleteTransactionUseCase {
  constructor(
    @inject(TYPES.ITransactionRepository)
    private readonly repository: ITransactionRepository
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    await this.repository.delete(id, userId);
  }
}
