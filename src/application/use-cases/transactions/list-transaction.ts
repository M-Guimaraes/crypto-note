import { inject, injectable } from 'inversify';
import { TYPES } from '../../../container/types';
import { ITransactionRepository } from '../../../domain/repositories/transaction-repository';
import { Transaction } from '../../../domain/entities/transaction';

@injectable()
export class ListTransactionUseCase {
  constructor(
    @inject(TYPES.ITransactionRepository)
    private readonly repository: ITransactionRepository
  ) {}

  async execute(userId: string): Promise<Transaction[]> {
    return await this.repository.findAll(userId);
  }
}
