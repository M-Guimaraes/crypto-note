import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { TYPES } from '@/container/types';
import { DeleteUserUseCase } from '@/application/use-cases/users/delete-user';
import { LoginUserUseCase } from '@/application/use-cases/users/login-user';
import { LogoutUserUseCase } from '@/application/use-cases/users/logout-user';
import { RegisterUserUseCase } from '@/application/use-cases/users/register-user';
import { RefreshTokenUseCase } from '@/application/use-cases/users/refresh-token';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.RegisterUserUseCase)
    private readonly registerUserUseCase: RegisterUserUseCase,
    @inject(TYPES.LoginUserUseCase)
    private readonly loginUserUseCase: LoginUserUseCase,
    @inject(TYPES.LogoutUserUseCase)
    private readonly logoutUserUseCase: LogoutUserUseCase,
    @inject(TYPES.RefreshTokenUseCase)
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    @inject(TYPES.DeleteUserUseCase)
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  async register(request: Request, response: Response) {
    const { email, password, name } = request.body;

    const user = await this.registerUserUseCase.execute({
      email,
      password,
      name,
    });

    response.status(201).json(user);
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await this.loginUserUseCase.execute({
      email,
      password,
    });

    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }

    response.status(200).json(user);
  }

  async logout(request: Request, response: Response) {
    const refreshToken = request.cookies?.refreshToken;

    await this.logoutUserUseCase.execute(refreshToken);

    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const { userId } = request.params;

    await this.deleteUserUseCase.execute(userId);

    response.status(204).send();
  }

  async refreshToken(request: Request, response: Response): Promise<void> {
    const refreshToken = request.cookies?.refreshToken;

    if (!refreshToken) {
      response.status(401).json({ message: 'Refresh token missing' });
      return;
    }

    try {
      const { accessToken, newRefreshToken } =
        await this.refreshTokenUseCase.execute(refreshToken);

      response
        .cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .json({ accessToken });
    } catch (error) {
      response.status(401).json({ message: 'Invalid or expired token' });
    }
  }
}
