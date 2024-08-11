import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient, TConstructorIngredient } from '../utils/types';
import { createSelector } from 'reselect';
import { RootState } from '../services/store';

interface ConstructorItemsState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorItemsState = {
  bun: null,
  ingredients: []
};

// Action creator для добавления ингредиента с генерацией UUID
export const addIngredientWithId = (ingredient: TIngredient) => ({
  type: 'constructorItems/addIngredient',
  payload: { ...ingredient, id: uuidv4() }
});

const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addBun(state, action: PayloadAction<TIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<{ id: string }>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < state.ingredients.length - 1) {
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = temp;
      }
    },
    clearIngredients(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

// Селекторы

export const selectConstructorItems = (state: RootState) =>
  state.constructorItems;

export const selectIngredientCount = createSelector(
  [
    selectConstructorItems,
    (_: RootState, ingredientId: string) => ingredientId
  ],
  (constructorItems, ingredientId) => {
    if (constructorItems.bun?._id === ingredientId) {
      return 2;
    }
    return constructorItems.ingredients.filter(
      (item) => item._id === ingredientId
    ).length;
  }
);

export const {
  addBun,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearIngredients
} = constructorItemsSlice.actions;

export default constructorItemsSlice.reducer;
