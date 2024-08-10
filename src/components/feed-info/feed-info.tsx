// import { FC } from 'react';

// import { TOrder } from '@utils-types';
// import { FeedInfoUI } from '../ui/feed-info';

// const getOrders = (orders: TOrder[], status: string): number[] =>
//   orders
//     .filter((item) => item.status === status)
//     .map((item) => item.number)
//     .slice(0, 20);

// export const FeedInfo: FC = () => {
//   /** TODO: взять переменные из стора */
//   const orders: TOrder[] = [];
//   const feed = {};

//   const readyOrders = getOrders(orders, 'done');

//   const pendingOrders = getOrders(orders, 'pending');

//   return (
//     <FeedInfoUI
//       readyOrders={readyOrders}
//       pendingOrders={pendingOrders}
//       feed={feed}
//     />
//   );
// };

import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  // Логируем данные на каждом этапе
  console.log('orders:', orders);
  console.log('isLoading:', isLoading);
  console.log('error:', error);

  // Проверяем, загружаются ли данные
  if (isLoading) {
    console.log('Данные еще загружаются...');
    return <Preloader />;
  }

  // Проверяем наличие ошибок
  if (error) {
    console.error('Ошибка при загрузке данных:', error);
    return <div>Ошибка: {error}</div>;
  }

  // Проверяем, загружены ли заказы
  if (!orders || orders.length === 0) {
    console.log('Заказы отсутствуют или еще не загружены.');
    return <div>Заказы отсутствуют или еще не загружены.</div>;
  }

  // Фильтруем заказы по статусам
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
