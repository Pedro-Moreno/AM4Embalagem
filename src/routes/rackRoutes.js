import { Router } from 'express';
import rackController from '../controllers/RackController';
const router = new Router();

router.get('/', rackController.index);
router.post('/', rackController.store);
router.put('/:id', rackController.update);
router.get('/:id', rackController.show);
router.delete('/:id', rackController.delete);

export default router;
