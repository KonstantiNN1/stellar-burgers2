// import { Preloader } from '@ui';
// import { FeedUI } from '@ui-pages';
// import { TOrder } from '@utils-types';
// import { FC } from 'react';

// export const Feed: FC = () => {
//   /** TODO: взять переменную из стора */
//   const orders: TOrder[] = [];

//   if (!orders.length) {
//     return <Preloader />;
//   }

//   <FeedUI orders={orders} handleGetFeeds={() => {}} />;
// };

import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
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

  // Загружаем заказы при монтировании компонента
  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  // Обработка состояния загрузки и ошибок
  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  // Отображаем компоненты, когда заказы загружены
  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
