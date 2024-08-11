import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedInfoUI } from '@ui';
import { RootState, AppDispatch } from '../../services/store';
import { loadOrders } from '../../reducers/order';

export const FeedInfo: FC = () => {
  const orders = useSelector((state: RootState) => state.order.ordersData);
  const isLoading = useSelector((state: RootState) => state.order.isRequesting);
  const error = useSelector((state: RootState) => state.order.error);
  const total = useSelector((state: RootState) => state.order.total);
  const totalToday = useSelector((state: RootState) => state.order.totalToday);

  console.log('orders:', orders);
  console.log('isLoading:', isLoading);
  console.log('error:', error);

  if (isLoading) {
    console.log('Данные еще загружаются...');
    return <Preloader />;
  }

  if (error) {
    console.error('Ошибка при загрузке данных:', error);
    return <div>Ошибка: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    console.log('Заказы отсутствуют или еще не загружены.');
    return <div>Заказы отсутствуют или еще не загружены.</div>;
  }

  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number);
  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number);

  console.log('Готовые заказы:', readyOrders);
  console.log('Заказы в работе:', pendingOrders);

  return (
    <FeedInfoUI
      feed={{
        orders,
        total,
        totalToday,
        isLoading: false,
        error: null
      }}
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
    />
  );
};
