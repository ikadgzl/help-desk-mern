import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook', 'iMac', 'iPad']
    },
    description: {
      type: String,
      required: [true, 'Please include a description']
    },
    status: {
      type: String,
      required: [true],
      enum: ['new', 'open', 'closed'],
      default: 'new'
    }
  },
  { timestamps: true }
);

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
