import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  getTickets,
  createTicket,
  deleteTicket,
  getTicketById,
  updateTicket
} from '../controllers/ticketController.js';

export const ticketRouter = Router();

ticketRouter
  .route('/')
  .get(authMiddleware, getTickets)
  .post(authMiddleware, createTicket);

ticketRouter
  .route('/:id')
  .get(authMiddleware, getTicketById)
  .put(authMiddleware, updateTicket)
  .delete(authMiddleware, deleteTicket);
