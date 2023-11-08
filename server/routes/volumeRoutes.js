import { Router } from 'express';
import volumeController from '../controllers/VolumeController';
const router = new Router();

router.get('/', volumeController.index);
router.post('/', volumeController.store);
router.put('/:id', volumeController.update);
router.get('/:id', volumeController.show);
router.delete('/:id', volumeController.delete);

export default router;
