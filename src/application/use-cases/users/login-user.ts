import { injectable, inject } from 'inversify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TYPES } from '@/container/types';
import { IUserRepository } from '@/domain/repositories/user-repository';

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly repository: IUserRepository
  ) {}

  async execute(data: { email: string; password: string }) {
    const user = await this.repository.findByEmail(data.email);
    if (!user) return null;

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return null;

    const userId = user.id;

    const accessToken = jwt.sign({ sub: { userId } }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(
      {
        sub: {
          userId,
        },
      },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    await this.repository.saveRefreshToken(
      user.id,
      refreshToken,
      new Date(Date.now() + 7 * 86400000)
    );

    return { accessToken, refreshToken };
  }
}
