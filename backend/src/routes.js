import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryOderController from './app/controllers/DeliveryOrderController';
import DeliveryController from './app/controllers/DeliveryController';
import ListDeliveryOrdersToDelivemanController from './app/controllers/ListDeliveryOrdersToDelivemanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Users Routes
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Session Route
routes.post('/session', SessionController.store);

// Recipients Routes
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

// File Route
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/files', upload.single('file'), FileController.index);
routes.put('/files/:id', upload.single('file'), FileController.update);
routes.delete('/files/:id', FileController.delete);

// Deliverymans Routes
routes.post('/deliverymans', DeliverymanController.store);
routes.get('/deliverymans', DeliverymanController.index);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

// DeliveryOrders Routes
routes.post('/deliveryorders', DeliveryOderController.store);
routes.get('/deliveryorders', DeliveryOderController.index);
routes.put('/deliveryorders/:id', DeliveryOderController.update);
routes.delete('/deliveryorders/:id', DeliveryOderController.delete);

// Delivery Routes
routes.post('/delivery', DeliveryController.store);
routes.put('/finalize_delivery', DeliveryController.update);
// Deliveryman Routes List yours deliveries
routes.get(
  '/deliverieslist/:id',
  ListDeliveryOrdersToDelivemanController.index
);

// Middleware Route
routes.use(authMiddleware);

export default routes;
