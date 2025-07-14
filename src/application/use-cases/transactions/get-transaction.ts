import { inject, injectable } from 'inversify';
import { TYPES } from '@/container/types';
import { ITransactionRepository } from '@/domain/repositories/transaction-repository';
import { Transaction } from '@/domain/entities/transaction';

interface GetTransactionRequest {
  transactionId: string;
  userId: string;
}

@injectable()
export class GetTransactionUseCase {
  constructor(
    @inject(TYPES.ITransactionRepository)
    private readonly repository: ITransactionRepository
  ) {}

  async execute(request: GetTransactionRequest): Promise<Transaction | void> {
    const { transactionId, userId } = request;
    const transaction = await this.repository.findById(transactionId, userId);

    if (!transaction) return;

    return transaction;
  }
}
