// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { loginUserApi, registerUserApi } from '../utils/burger-api';

// interface UserState {
//   name: string | null;
//   email: string | null;
//   isLoggedIn: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   name: null,
//   email: null,
//   isLoggedIn: false,
//   error: null
// };

// export const loginUser = createAsyncThunk<
//   { name: string; email: string },
//   { email: string; password: string },
//   { rejectValue: string }
// >('user/login', async ({ email, password }, { rejectWithValue }) => {
//   try {
//     const response = await loginUserApi({ email, password });
//     return response.user;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response?.data?.message || 'Ошибка авторизации'
//     );
//   }
// });

// export const registerUser = createAsyncThunk<
//   { name: string; email: string },
//   { userName: string; email: string; password: string },
//   { rejectValue: string }
// >(
//   'user/register',
//   async ({ userName, email, password }, { rejectWithValue }) => {
//     try {
//       const response = await registerUserApi({
//         email,
//         name: userName,
//         password
//       });
//       return response.user;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Ошибка регистрации'
//       );
//     }
//   }
// );

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUser(state, action: PayloadAction<{ name: string; email: string }>) {
//       state.name = action.payload.name;
//       state.email = action.payload.email;
//       state.isLoggedIn = true;
//       state.error = null;
//     },
//     clearUser(state) {
//       state.name = null;
//       state.email = null;
//       state.isLoggedIn = false;
//       state.error = null;
//     },
//     logout(state) {
//       state.name = null;
//       state.email = null;
//       state.isLoggedIn = false;
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.isLoggedIn = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.payload as string;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.isLoggedIn = true;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.error = action.payload as string;
//       });
//   }
// });

// export const { setUser, clearUser, logout } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi, logoutApi } from '../utils/burger-api'; // Импортируем нужные API функции
import { setCookie } from '../utils/cookie'; // Импортируем функцию setCookie

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

// Асинхронное действие для авторизации
export const loginUser = createAsyncThunk<
  { name: string; email: string }, // Успешный тип ответа
  { email: string; password: string }, // Тип аргументов
  { rejectValue: string } // Тип ошибки
>('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await loginUserApi({ email, password });

    // Сохранение токена после успешного логина
    setCookie('accessToken', response.accessToken);

    return response.user;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Ошибка авторизации'
    );
  }
});

// Асинхронное действие для регистрации
export const registerUser = createAsyncThunk<
  { name: string; email: string }, // Успешный тип ответа
  { userName: string; email: string; password: string }, // Тип аргументов
  { rejectValue: string } // Тип ошибки
>(
  'user/register',
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerUserApi({
        email,
        name: userName,
        password
      });

      // Сохранение токена после успешной регистрации
      setCookie('accessToken', response.accessToken);

      return response.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка регистрации'
      );
    }
  }
);

// Асинхронное действие для выхода
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      setCookie('accessToken', '', { expires: -1 });
    } catch (error: any) {
      return rejectWithValue('Ошибка при выходе из системы');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ name: string; email: string }>) {
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
        state.error = action.payload as string;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.name = null;
        state.email = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
