import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '../../reducers/currentIngredient';
import { addIngredient } from '../../reducers/constructorItems';
import { addBun } from '../../reducers/constructorItems';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenDetails = () => {
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
        navigate(`/ingredients/${ingredient._id}`, {
          state: { background: location }
        });
      } else {
        console.error('Ingredient is undefined:', ingredient);
      }
    };

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
        handleOpenDetails={handleOpenDetails}
      />
    );
  }
);
