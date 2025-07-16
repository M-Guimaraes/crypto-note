import { TYPES } from '../../../container/types';
import { IUserRepository } from '../../..//domain/repositories/user-repository';
import { AppError } from '../../../interfaces/http/middlewares/error-handler';
import { injectable, inject } from 'inversify';

@injectable()
export class LogoutUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly repository: IUserRepository
  ) {}

  async execute(token: string): Promise<void> {
    if (!token) {
      throw new AppError('Refresh token is required for logout', 400);
    }

    const existing = await this.repository.findValidRefreshToken(token);

    if (!existing) {
      throw new AppError(
        'Refresh token is already revoked or does not exist',
        400
      );
    }

    await this.repository.revokeToken(token);
  }
}
