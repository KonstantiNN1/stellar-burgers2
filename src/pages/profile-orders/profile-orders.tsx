import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUserOrders } from '../../reducers/order';
import { OrdersList } from '@components';
import { ProfileMenuUI } from '@ui';
import styles from '../../components/ui/orders-list/orders-list.module.css';

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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.menuContainer}>
        <ProfileMenuUI pathname='/profile/orders' handleLogout={() => {}} />
      </div>
      <div className={styles.ordersContainer}>
        <OrdersList orders={orders} />
      </div>
    </div>
  );
};
