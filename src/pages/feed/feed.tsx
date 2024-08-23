import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { FeedInfoUI } from '../../components/ui/feed-info';
import { OrdersList } from '../../components/orders-list';
import { RootState, AppDispatch } from '../../services/store';
import { loadOrders } from '../../reducers/order';
import styles from '../../components/ui/feed-info/feed-info.module.css';

export const Feed: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.order.ordersData);
  const isLoading = useSelector((state: RootState) => state.order.isRequesting);
  const error = useSelector((state: RootState) => state.order.error);
  const total = useSelector((state: RootState) => state.order.total);
  const totalToday = useSelector((state: RootState) => state.order.totalToday);

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  const readyOrders = orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number);

  const pendingOrders = orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number);

  const feedData = {
    orders,
    total,
    totalToday,
    isLoading,
    error
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedContent}>
        <OrdersList orders={orders} />
      </div>
      <div className={styles.sideInfo}>
        <FeedInfoUI
          feed={feedData}
          readyOrders={readyOrders}
          pendingOrders={pendingOrders}
        />
      </div>
    </div>
  );
};
