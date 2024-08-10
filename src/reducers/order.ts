// // import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// // import { orderBurgerApi } from '../utils/burger-api';
// // import { TOrder } from '../utils/types';

// // interface OrderState {
// //   isRequesting: boolean;
// //   data: TOrder | null;
// //   error: string | null;
// // }

// // const initialState: OrderState = {
// //   isRequesting: false,
// //   data: null,
// //   error: null
// // };

// // export const placeOrder = createAsyncThunk(
// //   'order/placeOrder',
// //   async (ingredients: string[], { rejectWithValue }) => {
// //     try {
// //       const orderData = await orderBurgerApi(ingredients);
// //       return orderData.order;
// //     } catch (error) {
// //       return rejectWithValue(error);
// //     }
// //   }
// // );

// // const orderSlice = createSlice({
// //   name: 'order',
// //   initialState,
// //   reducers: {
// //     clearOrder(state) {
// //       state.data = null;
// //     }
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(placeOrder.pending, (state) => {
// //         state.isRequesting = true;
// //         state.error = null;
// //       })
// //       .addCase(placeOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
// //         state.isRequesting = false;
// //         state.data = action.payload;
// //       })
// //       .addCase(placeOrder.rejected, (state, action: PayloadAction<any>) => {
// //         state.isRequesting = false;
// //         state.error = action.payload;
// //       });
// //   }
// // });

// // export const { clearOrder } = orderSlice.actions;
// // export default orderSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { TOrder, TOrdersData } from '../utils/types';
// import { orderBurgerApi, getFeedsApi } from '../utils/burger-api';

// // Асинхронное действие для создания заказа
// export const placeOrder = createAsyncThunk(
//   'order/placeOrder',
//   async (ingredients: string[], { rejectWithValue }) => {
//     try {
//       const orderData = await orderBurgerApi(ingredients);
//       return orderData.order;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// // Асинхронное действие для получения ленты заказов
// export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
//   const data = await getFeedsApi();
//   return data;
// });

// // Состояние редьюсера
// interface OrderState {
//   isRequesting: boolean;
//   orderData: TOrder | null; // Состояние для конкретного заказа
//   ordersData: TOrder[]; // Состояние для ленты заказов
//   total: number; // Общее количество заказов
//   totalToday: number; // Количество заказов за сегодня
//   error: string | null;
// }

// const initialState: OrderState = {
//   isRequesting: false,
//   orderData: null,
//   ordersData: [], // Изначально пустой массив для заказов
//   total: 0,
//   totalToday: 0,
//   error: null
// };

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     clearOrder(state) {
//       state.orderData = null;
//     },
//     setRequesting(state, action) {
//       state.isRequesting = action.payload;
//     },
//     setOrderData(state, action) {
//       state.orderData = action.payload;
//     },
//     setOrdersData(state, action) {
//       state.ordersData = action.payload.orders;
//       state.total = action.payload.total;
//       state.totalToday = action.payload.totalToday;
//     },
//     setError(state, action) {
//       state.error = action.payload;
//     }
//   }
// });

// export const {
//   clearOrder,
//   setRequesting,
//   setOrderData,
//   setOrdersData,
//   setError
// } = orderSlice.actions;

// // Действия для обработки создания заказа и загрузки ленты заказов
// export const createOrder = (ingredients: string[]) => async (dispatch: any) => {
//   try {
//     dispatch(setRequesting(true));
//     const orderData = await orderBurgerApi(ingredients);
//     dispatch(setOrderData(orderData.order));
//     dispatch(setRequesting(false));
//   } catch (error) {
//     dispatch(setError('Failed to create order'));
//     dispatch(setRequesting(false));
//   }
// };

// export const loadOrders = () => async (dispatch: any) => {
//   try {
//     dispatch(setRequesting(true));
//     const ordersData = await getFeedsApi();
//     dispatch(setOrdersData(ordersData));
//     dispatch(setRequesting(false));
//   } catch (error) {
//     dispatch(setError('Failed to fetch orders'));
//     dispatch(setRequesting(false));
//   }
// };

// export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../utils/types';
import { orderBurgerApi, getFeedsApi } from '../utils/burger-api';

// Асинхронное действие для создания заказа
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      console.log('Пытаемся создать заказ с ингредиентами:', ingredients);
      const orderData = await orderBurgerApi(ingredients);
      console.log('Успешно создан заказ:', orderData.order);
      return orderData.order;
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      return rejectWithValue(error);
    }
  }
);

// Асинхронное действие для получения ленты заказов
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  try {
    console.log('Запрос на получение ленты заказов отправлен');
    const data = await getFeedsApi();
    console.log('Успешно получены данные ленты заказов:', data);
    return data;
  } catch (error) {
    console.error('Ошибка при получении ленты заказов:', error);
    throw new Error('Failed to fetch orders');
  }
});

interface OrderState {
  isRequesting: boolean;
  orderData: TOrder | null;
  ordersData: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: OrderState = {
  isRequesting: false,
  orderData: null,
  ordersData: [],
  total: 0,
  totalToday: 0,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderData = null;
    },
    setRequesting(state, action) {
      state.isRequesting = action.payload;
    },
    setOrderData(state, action) {
      state.orderData = action.payload;
    },
    setOrdersData(state, action) {
      state.ordersData = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const {
  clearOrder,
  setRequesting,
  setOrderData,
  setOrdersData,
  setError
} = orderSlice.actions;

export const createOrder = (ingredients: string[]) => async (dispatch: any) => {
  try {
    console.log('Создание заказа инициировано с ингредиентами:', ingredients);
    dispatch(setRequesting(true));

    const orderData = await orderBurgerApi(ingredients);
    dispatch(setOrderData(orderData.order));

    console.log('Заказ успешно создан:', orderData.order);
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    dispatch(setError('Failed to create order'));
  } finally {
    dispatch(setRequesting(false));
  }
};

export const loadOrders = () => async (dispatch: any) => {
  try {
    console.log('Инициация загрузки ленты заказов');
    dispatch(setRequesting(true));
    const ordersData = await getFeedsApi();
    dispatch(setOrdersData(ordersData));
    dispatch(setRequesting(false));
    console.log('Лента заказов загружена и состояние обновлено');
  } catch (error) {
    dispatch(setError('Failed to fetch orders'));
    dispatch(setRequesting(false));
    console.error('Ошибка при загрузке ленты заказов:', error);
  }
};

export default orderSlice.reducer;
