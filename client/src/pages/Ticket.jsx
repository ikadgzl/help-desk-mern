import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import { getTickets } from '../redux/ticket/ticketSlice';
import TicketItem from '../components/TicketItem';
import { reset } from '../redux/ticket/ticketSlice';

const Ticket = () => {
  const ticketStore = useSelector((state) => state.ticket);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (ticketStore.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
        </div>

        {ticketStore.tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
};

export default Ticket;
