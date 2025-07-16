import { Router } from 'express';
import { container } from '../../../container/inversify.config';
import { TYPES } from '../../../container/types';
import { AuthController } from '../controllers/auth.controller';

const controller = container.get<AuthController>(TYPES.AuthController);

const router = Router();

router.post('/register', (request, response) =>
  controller.register(request, response)
);

router.post('/login', (request, response) =>
  controller.login(request, response)
);

router.post('/logout', (request, response) =>
  controller.logout(request, response)
);

router.delete('/me', (request, response) =>
  controller.delete(request, response)
);

router.delete('/refresh', (request, response) =>
  controller.refreshToken(request, response)
);

export default router;
