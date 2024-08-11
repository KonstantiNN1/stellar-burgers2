import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../utils/types';
import { orderBurgerApi, getFeedsApi, getOrdersApi } from '../utils/burger-api';
import { AppDispatch, RootState } from '../services/store';
import { CustomError } from '../utils/types';

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
  orderData: TOrder | null;
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: OrderState = {
  isRequesting: false,
  ordersData: [],
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
    setError(state, action: PayloadAction<string | null>) {
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

export const loadOrders = () => async (dispatch: AppDispatch) => {
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

export default orderSlice.reducer;
