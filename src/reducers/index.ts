import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import constructorItemsReducer from './constructorItems';
import orderReducer from './order';
import currentIngredientReducer from './currentIngredient';
import userReducer from './user'; // Импортируйте редьюсер user

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  user: userReducer // Добавьте редьюсер user
});

export default rootReducer;
