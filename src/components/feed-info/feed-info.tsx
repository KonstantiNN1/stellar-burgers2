import React, { FC } from 'react';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedInfoUI } from '@ui';
import { RootState } from '../../services/store';

export const FeedInfo: FC = () => {
  const orders = useSelector((state: RootState) => state.order.ordersData);
  const isLoading = useSelector((state: RootState) => state.order.isRequesting);
  const error = useSelector((state: RootState) => state.order.error);
  const total = useSelector((state: RootState) => state.order.total);
  const totalToday = useSelector((state: RootState) => state.order.totalToday);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>Заказы отсутствуют или еще не загружены.</div>;
  }

  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number);
  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number);

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
