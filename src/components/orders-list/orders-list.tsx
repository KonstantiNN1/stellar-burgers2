// import { FC, memo } from 'react';

// import { OrdersListProps } from './type';
// import { OrdersListUI } from '@ui';

// export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
//   const orderByDate = [...orders].sort(
//     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   );

//   return <OrdersListUI orderByDate={orderByDate} />;
// });

import { FC, memo, useEffect } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  useEffect(() => {
    console.log('Лента заказов обновлена:', orders);
  }, [orders]);

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
