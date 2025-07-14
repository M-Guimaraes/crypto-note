import { TYPES } from '@/container/types';
import { IUserRepository } from '@/domain/repositories/user-repository';
import { injectable, inject } from 'inversify';

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly repository: IUserRepository
  ) {}

  async execute(userId: string): Promise<void> {
    await this.repository.delete(userId);
  }
}
