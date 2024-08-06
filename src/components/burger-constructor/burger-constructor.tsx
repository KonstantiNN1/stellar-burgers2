import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { placeOrder } from '../../reducers/order';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '../ui/burger-constructor';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector((state) => state.constructorItems);
  const orderRequest = useSelector((state) => state.order.isRequesting);
  const orderModalData = useSelector((state) => state.order.data);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    const ingredientIds = constructorItems.ingredients.map(
      (item: TConstructorIngredient) => item.id
    );
    dispatch(placeOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    // Логика закрытия модального окна
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
