import { Router } from 'express';
import pedidoController from '../controllers/PedidoController';
const router = new Router();

router.get('/:id', pedidoController.index);
router.post('/', pedidoController.store);
router.put('/:id', pedidoController.update);
router.get('/pk/:id', pedidoController.show);
router.delete('/:id', pedidoController.delete);

export default router;
