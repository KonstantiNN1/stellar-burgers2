import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorItemsState {
  bun: any | null;
  ingredients: any[];
}

const initialState: ConstructorItemsState = {
  bun: null,
  ingredients: []
};

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<any>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<any>) {
      state.ingredients.push({ ...action.payload, id: uuidv4() }); // Присваиваем уникальный id
    },
    removeIngredient(state, action: PayloadAction<any>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearBun(state) {
      state.bun = null;
    }
  }
});

export const { addBun, addIngredient, removeIngredient } =
  constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
