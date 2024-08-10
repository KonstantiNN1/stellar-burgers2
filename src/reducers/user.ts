// // import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // interface UserState {
// //   name: string | null;
// //   email: string | null;
// // }

// // const initialState: UserState = {
// //   name: null,
// //   email: null
// // };

// // const userSlice = createSlice({
// //   name: 'user',
// //   initialState,
// //   reducers: {
// //     setUser(state, action: PayloadAction<{ name: string; email: string }>) {
// //       state.name = action.payload.name;
// //       state.email = action.payload.email;
// //     },
// //     clearUser(state) {
// //       state.name = null;
// //       state.email = null;
// //     }
// //   }
// // });

// // export const { setUser, clearUser } = userSlice.actions;
// // export default userSlice.reducer;
// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { loginUserApi, registerUserApi } from '../utils/burger-api'; // Подключаем API

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
//   error: null,
// };

// // Асинхронное действие для авторизации
// export const loginUser = createAsyncThunk<
//   { name: string; email: string }, // Успешный тип ответа
//   { email: string; password: string }, // Тип аргументов
//   { rejectValue: string } // Тип ошибки
// >(
//   'user/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await loginUserApi({ email, password });
//       return response.user;
//     } catch (error: any) { // Указываем, что error имеет тип any
//       return rejectWithValue(error.response?.data?.message || 'Ошибка авторизации');
//     }
//   }
// );

// // Асинхронное действие для регистрации
// export const registerUser = createAsyncThunk<
//   { name: string; email: string }, // Успешный тип ответа
//   { userName: string; email: string; password: string }, // Тип аргументов
//   { rejectValue: string } // Тип ошибки
// >(
//   'user/register',
//   async ({ userName, email, password }, { rejectWithValue }) => {
//     try {
//       const response = await registerUserApi({ email, name: userName, password });
//       return response.user;
//     } catch (error: any) { // Указываем, что error имеет тип any
//       return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
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
//         state.error = action.payload as string; // Указываем, что ошибка типа string
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.name = action.payload.name;
//         state.email = action.payload.email;
//         state.isLoggedIn = true;
//         state.error = null;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.error = action.payload as string; // Указываем, что ошибка типа string
//       });
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi } from '../utils/burger-api'; // Подключаем API

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
      return response.user;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка регистрации'
      );
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
    },
    logout(state) {
      // Добавляем действие logout
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
      });
  }
});

export const { setUser, clearUser, logout } = userSlice.actions;
export default userSlice.reducer;
