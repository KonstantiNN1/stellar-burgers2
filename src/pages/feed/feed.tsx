// // import { Preloader } from '@ui';
// // import { FeedUI } from '@ui-pages';
// // import { TOrder } from '@utils-types';
// // import { FC } from 'react';

// // export const Feed: FC = () => {
// //   /** TODO: взять переменную из стора */
// //   const orders: TOrder[] = [];

// //   if (!orders.length) {
// //     return <Preloader />;
// //   }

// //   <FeedUI orders={orders} handleGetFeeds={() => {}} />;
// // };

// import { Preloader } from '@ui';
// import { FeedUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../../services/store';
// import { loadOrders } from '../../reducers/order';

// export const Feed: FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   // Получаем заказы из состояния Redux
//   const orders = useSelector((state: RootState) => state.order.ordersData);
//   const isLoading = useSelector((state: RootState) => state.order.isRequesting);
//   const error = useSelector((state: RootState) => state.order.error);

//   // Загружаем заказы при монтировании компонента
//   useEffect(() => {
//     dispatch(loadOrders());
//   }, [dispatch]);

//   // Обработка состояния загрузки и ошибок
//   if (isLoading) {
//     return <Preloader />;
//   }

//   if (error) {
//     return <div>Ошибка: {error}</div>;
//   }

//   // Отображаем компоненты, когда заказы загружены
//   return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
// };
import { Preloader } from '@ui';
import { FeedInfoUI } from '../../components/ui/feed-info';
import { OrdersList } from '../../components/orders-list';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { loadOrders } from '../../reducers/order';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем заказы из состояния Redux
  const orders = useSelector((state: RootState) => state.order.ordersData);
  const isLoading = useSelector((state: RootState) => state.order.isRequesting);
  const error = useSelector((state: RootState) => state.order.error);
  const total = useSelector((state: RootState) => state.order.total);
  const totalToday = useSelector((state: RootState) => state.order.totalToday);

  // Логируем данные после получения их из состояния
  console.log('Orders:', orders);
  console.log('IsLoading:', isLoading);
  console.log('Error:', error);
  console.log('Total Orders:', total);
  console.log('Total Orders Today:', totalToday);

  // Загружаем заказы при монтировании компонента
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

  // Обработка состояния загрузки и ошибок
  if (isLoading) {
    console.log('Загрузка заказов...');
    return <Preloader />;
  }

  if (error) {
    console.log('Ошибка при загрузке заказов:', error);
    return <div>Ошибка: {error}</div>;
  }

  // Комбинируем отображение списка заказов и информацию о заказах
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
