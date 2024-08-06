import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';
import { createSelector } from 'reselect';
import { RootState } from '../services/store';

interface IngredientsState {
  isLoading: boolean;
  data: TIngredient[];
  error: string | null;
}

const initialState: IngredientsState = {
  isLoading: false,
  data: [],
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const ingredients = await getIngredientsApi();
      return ingredients;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  }
});

export default ingredientsSlice.reducer;

// Селекторы
const selectIngredientsState = (state: RootState) => state.ingredients;

export const selectBuns = createSelector(
  selectIngredientsState,
  (ingredientsState) =>
    ingredientsState.data.filter((item) => item.type === 'bun')
);

export const selectMains = createSelector(
  selectIngredientsState,
  (ingredientsState) =>
    ingredientsState.data.filter((item) => item.type === 'main')
);

export const selectSauces = createSelector(
  selectIngredientsState,
  (ingredientsState) =>
    ingredientsState.data.filter((item) => item.type === 'sauce')
);

export const selectIsLoading = createSelector(
  selectIngredientsState,
  (ingredientsState) => ingredientsState.isLoading
);
