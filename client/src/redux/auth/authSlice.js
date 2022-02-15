import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  success: false,
  error: false,
  isLoading: false,
  message: ''
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    console.log('USER', user);
    console.log('THUNK', thunkAPI);
  }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log('USER', user);
  console.log('THUNK', thunkAPI);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

export default authSlice.reducer;