// import { ProfileOrdersUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC } from 'react';

// export const ProfileOrders: FC = () => {
//   /** TODO: взять переменную из стора */
//   const orders: TOrder[] = [];

//   return <ProfileOrdersUI orders={orders} />;
// };

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../reducers/order';
import { OrdersList } from '@components';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.ordersData);
  const isLoading = useSelector((state) => state.order.isRequesting);
  const error = useSelector((state) => state.order.error);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading) {
    return <div>Загрузка заказов...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return <OrdersList orders={orders} />;
};
