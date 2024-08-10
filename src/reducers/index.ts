import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import constructorItemsReducer from './constructorItems';
import orderReducer from './order';
import currentIngredientReducer from './currentIngredient';
import userReducer from './user'; 

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  order: orderReducer,
  currentIngredient: currentIngredientReducer,
  user: userReducer
});

export default rootReducer;
