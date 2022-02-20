import ApiError from '../middlewares/ApiError.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

export const getTickets = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    next(ApiError.UNAUTHORIZED('Unauthorized!'));

    return;
  }

  const tickets = await Ticket.find({ user: req.user._id });

  res.status(200).json({
    tickets
  });
};

export const getTicketById = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    next(ApiError.UNAUTHORIZED('Unauthorized!'));

    return;
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    next(ApiError.NOT_FOUND('Ticket not found.'));

    return;
  }

  if (ticket.user.toString() !== req.user._id.toString()) {
    next(ApiError.UNAUTHORIZED('Unauthorized!'));

    return;
  }

  res.status(200).json({
    ticket
  });
};

export const createTicket = async (req, res, next) => {
  const { product, description } = req.body;

  if (!product || !description) {
    next(ApiError.BAD_REQUEST('Please provide all the details.'));

    return;
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    next(ApiError.UNAUTHORIZED('Unauthorized!'));

    return;
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user._id,
    status: 'new'
  });

  res.status(201).json({
    ticket
  });
};

export const updateTicket = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    next(ApiError.UNAUTHORIZED('Unauthorized!'));

    return;
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    next(ApiError.NOT_FOUND('Ticket not found.'));

    return;
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(201).json({
    updatedTicket
  });
};

export const deleteTicket = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    next(ApiError.UNAUTHORIZED('Unauthorized!'));

    return;
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    next(ApiError.NOT_FOUND('Ticket not found.'));

    return;
  }

  await ticket.remove();

  res.status(201).json({
    success: true
  });
};
