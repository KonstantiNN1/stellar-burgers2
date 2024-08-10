import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { TConstructorIngredient } from '@utils-types';
import {
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../../reducers/constructorItems';
import { BurgerConstructorElementUI } from '../ui/burger-constructor-element';

interface BurgerConstructorElementProps {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
}

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({
  ingredient,
  index,
  totalItems
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeIngredient(ingredient));
  };

  const handleMoveUp = () => {
    dispatch(moveIngredientUp(index));
  };

  const handleMoveDown = () => {
    dispatch(moveIngredientDown(index));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleDelete}
    />
  );
};
