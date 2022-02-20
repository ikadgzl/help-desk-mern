import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
  tickets: [],
  ticket: {},
  error: false,
  success: false,
  isLoading: false,
  message: ''
};

export const createTicket = createAsyncThunk(
  'ticket/create',
  async (ticket, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.createTicket(ticket, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getTickets = createAsyncThunk(
  'ticket/getTickets',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTickets(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

export const getTicket = createAsyncThunk(
  'ticket/getTicket',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

export const closeTicket = createAsyncThunk(
  'ticket/closeTicket',
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.message);
    }
  }
);

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.tickets = action.payload.tickets;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.ticket = action.payload.ticket;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      });
  }
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
