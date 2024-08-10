import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { TIngredient } from '../../utils/types';
import { IngredientDetailsUI } from '@ui';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((state: RootState) => state.ingredients.data);
  const ingredient = ingredients.find((item: TIngredient) => item._id === id);

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};

export default IngredientDetails;
