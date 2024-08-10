import { Preloader } from '@ui';
import { FeedInfoUI } from '../../components/ui/feed-info';
import { OrdersList } from '../../components/orders-list';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { loadOrders } from '../../reducers/order';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.order.ordersData);
  const isLoading = useSelector((state: RootState) => state.order.isRequesting);
  const error = useSelector((state: RootState) => state.order.error);
  const total = useSelector((state: RootState) => state.order.total);
  const totalToday = useSelector((state: RootState) => state.order.totalToday);

  console.log('Orders:', orders);
  console.log('IsLoading:', isLoading);
  console.log('Error:', error);
  console.log('Total Orders:', total);
  console.log('Total Orders Today:', totalToday);

  useEffect(() => {
    console.log(
      'Компонент Feed смонтирован. Отправляем запрос на загрузку заказов.'
    );
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

  console.log('Ready Orders:', readyOrders);
  console.log('Pending Orders:', pendingOrders);

  if (isLoading) {
    console.log('Загрузка заказов...');
    return <Preloader />;
  }

  if (error) {
    console.log('Ошибка при загрузке заказов:', error);
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <OrdersList orders={orders} />
      <FeedInfoUI
        feed={feedData}
        readyOrders={readyOrders}
        pendingOrders={pendingOrders}
      />
    </>
  );
};
