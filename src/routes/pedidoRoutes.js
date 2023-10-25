import { Router } from 'express';
import pedidoController from '../controllers/PedidoController';
const router = new Router();

router.get('/', pedidoController.index);
router.post('/', pedidoController.store);
router.put('/:id', pedidoController.update);
router.get('/:id', pedidoController.show);
router.delete('/:id', pedidoController.delete);

export default router;
