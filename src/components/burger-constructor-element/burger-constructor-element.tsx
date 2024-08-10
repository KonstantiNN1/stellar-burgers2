import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import { TConstructorIngredient } from '@utils-types';
import { removeIngredient } from '../../reducers/constructorItems';
import styles from '../../components/ui/burger-constructor-element/burger-constructor-element.module.css';

interface BurgerConstructorElementProps {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
}

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({ ingredient }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeIngredient(ingredient));
  };

  return (
    <li className={styles.item}>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleDelete}
      />
    </li>
  );
};