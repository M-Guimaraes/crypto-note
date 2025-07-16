import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { container } from '../../../container/inversify.config';
import { TYPES } from '../../../container/types';
import { authMiddleware } from '../middlewares/auth.middleware';

const controller = container.get<TransactionController>(
  TYPES.TransactionController
);

const router = Router();

router.get('/transactions', authMiddleware, (request, response) =>
  controller.list(request, response)
);
router.post('/transactions', authMiddleware, (request, response) =>
  controller.create(request, response)
);
router.get('/transactions/:id', authMiddleware, (request, response) =>
  controller.get(request, response)
);
router.delete('/transactions/:id', authMiddleware, (request, response) =>
  controller.delete(request, response)
);

export default router;
