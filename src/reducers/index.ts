import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import constructorItemsReducer from './constructorItems';
import orderReducer from './order';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorItems: constructorItemsReducer,
  order: orderReducer
});

export default rootReducer;
