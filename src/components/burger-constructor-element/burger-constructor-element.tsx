// import { FC, memo } from 'react';
// import { BurgerConstructorElementUI } from '@ui';
// import { BurgerConstructorElementProps } from './type';

// export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
//   ({ ingredient, index, totalItems }) => {
//     const handleMoveDown = () => {};

//     const handleMoveUp = () => {};

//     const handleClose = () => {};

//     return (
//       <BurgerConstructorElementUI
//         ingredient={ingredient}
//         index={index}
//         totalItems={totalItems}
//         handleMoveUp={handleMoveUp}
//         handleMoveDown={handleMoveDown}
//         handleClose={handleClose}
//       />
//     );
//   }
// );

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

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({
  ingredient
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeIngredient(ingredient)); // Удаляем конкретный ингредиент
  };

  return (
    <li className={styles.item}>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleDelete} // Привязываем удаление ингредиента
      />
    </li>
  );
};
