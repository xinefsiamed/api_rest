import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = new Router();

router.post('/', UserController.store);
router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;

/*
index -> listar todos os usuarios -> GET
store/create -> cria um usuario -> POST
delete -> deleta usuario -> DELETE
show -> mostra um usuario -> GET
update -> atualiza um usuario -> PATCH/PUT

*/
