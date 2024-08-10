import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { createOrder } from '../../reducers/order';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '../ui/burger-constructor';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.constructorItems);
  const orderRequest = useSelector((state) => state.order.isRequesting);
  const orderModalData = useSelector((state) => state.order.orderData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id,
    ];
    
    dispatch(createOrder(ingredientIds));
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
