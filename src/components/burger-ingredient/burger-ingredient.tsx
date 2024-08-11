import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { setCurrentIngredient } from '../../reducers/currentIngredient';
import { addIngredientWithId, addBun } from '../../reducers/constructorItems';
import { TBurgerIngredientProps } from './type';
import { BurgerIngredientUI } from '@ui';
import { selectIngredientCount } from '../../reducers/constructorItems';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const count = useSelector((state) =>
      selectIngredientCount(state, ingredient._id)
    );

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
        dispatch(addIngredientWithId(ingredient));
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
