import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../utils/types';
import {
  orderBurgerApi,
  getFeedsApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../utils/burger-api';
import { AppDispatch, RootState } from '../services/store';
import { CustomError } from '../utils/types';

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/fetchOrderByNumber', async (orderNumber, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(orderNumber);
    if (response.success && response.orders.length > 0) {
      return response.orders[0];
    } else {
      return rejectWithValue('Order not found');
    }
  } catch (error) {
    return rejectWithValue('Failed to fetch order');
  }
});

export const placeOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: CustomError }
>('order/placeOrder', async (ingredients: string[], { rejectWithValue }) => {
  try {
    const orderData = await orderBurgerApi(ingredients);
    return orderData.order;
  } catch (error) {
    if (error instanceof Error) {
      const customError: CustomError = {
        message: 'Ошибка при создании заказа',
        code: error.name
      };
      return rejectWithValue(customError);
    }
    return rejectWithValue({ message: 'Unknown error' });
  }
});

export const fetchOrders = createAsyncThunk<
  TOrdersData,
  void,
  { rejectValue: CustomError }
>('order/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const data = await getFeedsApi();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      const customError: CustomError = {
        message: 'Failed to fetch orders',
        code: error.name
      };
      return rejectWithValue(customError);
    }
    return rejectWithValue({ message: 'Unknown error' });
  }
});

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: CustomError }
>('user/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    const orders = await getOrdersApi();
    return orders;
  } catch (error) {
    if (error instanceof Error) {
      const customError: CustomError = {
        message: 'Ошибка при загрузке заказов',
        code: error.name
      };
      return rejectWithValue(customError);
    }
    return rejectWithValue({ message: 'Unknown error' });
  }
});

interface OrderState {
  isRequesting: boolean;
  ordersData: TOrder[];
  userOrdersData: TOrder[];
  orderData: TOrder | null;
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: OrderState = {
  isRequesting: false,
  ordersData: [],
  userOrdersData: [],
  orderData: null,
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
    setRequesting(state, action: PayloadAction<boolean>) {
      state.isRequesting = action.payload;
    },
    setOrderData(state, action: PayloadAction<TOrder>) {
      state.orderData = action.payload;
    },
    setOrdersData(state, action: PayloadAction<TOrdersData>) {
      state.ordersData = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setUserOrdersData(state, action: PayloadAction<TOrder[]>) {
      state.userOrdersData = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrdersData = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : 'Ошибка';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isRequesting = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isRequesting = false;
        const existingOrder = state.ordersData.find(
          (order) => order.number === action.payload.number
        );
        if (!existingOrder) {
          state.ordersData.push(action.payload);
        }
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isRequesting = false;
        state.error = action.payload || 'Failed to fetch order';
      });
  }
});

const loadOrders = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequesting(true));
    const ordersData = await getFeedsApi();
    dispatch(setOrdersData(ordersData));
    dispatch(setRequesting(false));
  } catch (error) {
    dispatch(setError('Failed to fetch orders'));
    dispatch(setRequesting(false));
    console.error('Ошибка при загрузке ленты заказов:', error);
  }
};

export const createOrder =
  (ingredients: string[]) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setRequesting(true));
      const orderData = await orderBurgerApi(ingredients);
      dispatch(setOrderData(orderData.order));

      const currentOrders = getState().order.ordersData;
      const newOrdersData = [orderData.order, ...currentOrders];
      dispatch(
        setOrdersData({
          orders: newOrdersData,
          total: newOrdersData.length,
          totalToday: getState().order.totalToday + 1
        })
      );

      dispatch(setRequesting(false));
    } catch (error) {
      dispatch(setError('Failed to create order'));
      dispatch(setRequesting(false));
      console.error('Ошибка при создании заказа:', error);
    }
  };

export { loadOrders };

export const {
  clearOrder,
  setRequesting,
  setOrderData,
  setOrdersData,
  setUserOrdersData,
  setError
} = orderSlice.actions;

export default orderSlice.reducer;
