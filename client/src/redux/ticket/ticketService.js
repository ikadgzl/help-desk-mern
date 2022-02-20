import axios from 'axios';

const createTicket = async (ticket, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post('/api/tickets', ticket, config);

  return response.data;
};

const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get('/api/tickets', config);

  return response.data;
};

const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`/api/tickets/${ticketId}`, config);

  return response.data;
};

const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(
    `/api/tickets/${ticketId}`,
    { status: 'closed' },
    config
  );

  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket
};

export default ticketService;
