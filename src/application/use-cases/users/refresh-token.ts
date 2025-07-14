import { TYPES } from '@/container/types';
import { IUserRepository } from '@/domain/repositories/user-repository';
import { AppError } from '@/interfaces/http/middlewares/error-handler';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private readonly repository: IUserRepository
  ) {}

  async execute(
    refreshToken: string
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    const payload = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    const userId = payload.sub as string;

    const valid = await this.repository.findValidRefreshToken(refreshToken);

    if (!valid || valid.userId.toString() !== userId) {
      throw new AppError('Refresh token is invalid, expired, or revoked', 400);
    }

    // Revoga o token antigo
    await this.repository.revokeToken(refreshToken);

    // Gera novo access token
    const newAccessToken = jwt.sign(
      { sub: { userId } },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: '15m',
      }
    );

    // Gera novo refresh token
    const newRefreshToken = jwt.sign(
      { sub: { userId } },
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    // Salva novo refresh token no banco
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias
    await this.repository.revokeToken(refreshToken); // Revoga o token antigo
    await this.repository.saveRefreshToken(userId, newRefreshToken, expiresAt);

    return {
      accessToken: newAccessToken,
      newRefreshToken,
    };
  }
}
