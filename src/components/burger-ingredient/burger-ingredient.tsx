import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { useDispatch } from 'react-redux';
import { setCurrentIngredient } from '../../reducers/currentIngredient';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdd = () => {
      if (ingredient) {
        dispatch(setCurrentIngredient(ingredient));
        navigate(`/ingredients/${ingredient._id}`, {
          state: { background: location }
        });
      } else {
        console.error('Ingredient is undefined:', ingredient);
      }
    };
    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
