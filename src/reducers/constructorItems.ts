import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<any>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    }
  }
});

export const { addBun, addIngredient, removeIngredient } =
  constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
