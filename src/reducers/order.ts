import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

interface OrderState {
  isRequesting: boolean;
  data: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  isRequesting: false,
  data: null,
  error: null
};

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (ingredients: string[], { rejectWithValue }) => {
    try {
      const orderData = await orderBurgerApi(ingredients);
      return orderData.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.isRequesting = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.isRequesting = false;
        state.data = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action: PayloadAction<any>) => {
        state.isRequesting = false;
        state.error = action.payload;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
