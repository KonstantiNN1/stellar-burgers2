// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';

// interface ConstructorItemsState {
//   bun: any | null;
//   ingredients: any[];
// }

// const initialState: ConstructorItemsState = {
//   bun: null,
//   ingredients: []
// };

// const constructorItemsSlice = createSlice({
//   name: 'constructorItems',
//   initialState,
//   reducers: {
//     addBun(state, action: PayloadAction<any>) {
//       state.bun = action.payload;
//     },
//     addIngredient(state, action: PayloadAction<any>) {
//       state.ingredients.push({ ...action.payload, id: uuidv4() }); // Присваиваем уникальный id
//     },
//     removeIngredient(state, action: PayloadAction<any>) {
//       state.ingredients = state.ingredients.filter(
//         (ingredient) => ingredient.id !== action.payload.id
//       );
//     },
//     clearBun(state) {
//       state.bun = null;
//     }
//   }
// });

// export const { addBun, addIngredient, removeIngredient } =
//   constructorItemsSlice.actions;
// export default constructorItemsSlice.reducer;

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
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
