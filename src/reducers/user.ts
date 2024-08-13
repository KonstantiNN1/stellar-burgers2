import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi
} from '../utils/burger-api';
import { setCookie, getCookie } from '../utils/cookie';
import { fetchOrders } from './order';
import { CustomError, TUser } from '../utils/types';
import { AppDispatch, RootState } from '../services/store';

interface UserState {
  name: string | null;
  email: string | null;
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: UserState = {
  name: null,
  email: null,
  isLoggedIn: false,
  error: null
};

export const loginUser = createAsyncThunk<
  TUser,
  { email: string; password: string },
  { rejectValue: CustomError; dispatch: AppDispatch; state: RootState }
>('user/login', async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    const response = await loginUserApi({ email, password });
    setCookie('accessToken', response.accessToken);
    dispatch(fetchOrders());

    return response.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
        code: error.name
      });
    }
    return rejectWithValue({ message: 'Unknown error occurred' });
  }
});

export const registerUser = createAsyncThunk<
  TUser,
  { userName: string; email: string; password: string },
  { rejectValue: CustomError }
>(
  'user/register',
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerUserApi({
        email,
        name: userName,
        password
      });
      setCookie('accessToken', response.accessToken);

      return response.user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue({
          message: error.message,
          code: error.name
        });
      }
      return rejectWithValue({ message: 'Unknown error occurred' });
    }
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: CustomError; dispatch: AppDispatch }
>('user/logout', async (_, { rejectWithValue, dispatch }) => {
  try {
    await logoutApi();
    setCookie('accessToken', '', { expires: -1 });

    dispatch(fetchOrders());
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
        code: error.name
      });
    }
    return rejectWithValue({ message: 'Unknown error occurred' });
  }
});

export const checkAuth = createAsyncThunk<
  TUser,
  void,
  { rejectValue: CustomError }
>('user/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserApi();
    return response.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue({
        message: error.message,
        code: error.name
      });
    }
    return rejectWithValue({ message: 'Unknown error occurred' });
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.error = null;
    },
    clearUser(state) {
      state.name = null;
      state.email = null;
      state.isLoggedIn = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload?.message || null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload?.message || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.name = null;
        state.email = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload?.message || null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoggedIn = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload?.message || null;
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
