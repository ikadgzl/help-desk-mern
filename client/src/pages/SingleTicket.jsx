import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { closeTicket, getTicket, reset } from '../redux/ticket/ticketSlice';

const SingleTicket = () => {
  const ticketStore = useSelector((state) => state.ticket);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTicketClose = () => {
    dispatch(closeTicket(id));

    toast.success('Ticket closed!');

    setTimeout(() => {
      navigate('/tickets');
    }, 2000);
  };

  useEffect(() => {
    if (ticketStore.error) {
      toast.error(ticketStore.message);
    }

    dispatch(getTicket(id));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, ticketStore.error, ticketStore.message, id]);

  if (ticketStore.error) {
    return <h3>Something went wrong.</h3>;
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <h2>
          Ticket ID: {ticketStore.ticket._id}
          <span className={`status status-${ticketStore.ticket.status}`}>
            {ticketStore.ticket.status}
          </span>
        </h2>

        <h3>
          Date Submitted:
          {new Date(ticketStore.ticket.createdAt).toLocaleString()}
        </h3>
        <h3>Product: {ticketStore.ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticketStore.ticket.description}</p>
        </div>
      </header>

      {ticketStore.ticket.status !== 'closed' && (
        <button
          className='btn btn-block btn-danger'
          onClick={handleTicketClose}
        >
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default SingleTicket;
