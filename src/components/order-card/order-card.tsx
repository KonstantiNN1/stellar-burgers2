// import { FC, memo, useMemo } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useSelector } from '../../services/store';
// import { OrderCardProps } from './type';
// import { TIngredient } from '@utils-types';
// import { OrderCardUI } from '../ui/order-card';

// const maxIngredients = 6;

// export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
//   const location = useLocation();

//   const ingredients: TIngredient[] = useSelector(
//     (state) => state.ingredients.data
//   );

//   console.log('Order received in OrderCard:', order);
//   console.log('Ingredients from store:', ingredients);

//   const orderInfo = useMemo(() => {
//     if (!ingredients.length) return null;

//     const ingredientsInfo = order.ingredients.reduce(
//       (acc: TIngredient[], item: string) => {
//         const ingredient = ingredients.find((ing) => ing._id === item);
//         if (ingredient) return [...acc, ingredient];
//         return acc;
//       },
//       []
//     );

//     const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

//     const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

//     const remains =
//       ingredientsInfo.length > maxIngredients
//         ? ingredientsInfo.length - maxIngredients
//         : 0;

//     const date = new Date(order.createdAt);
//     console.log('Order Info generated:', {
//       ...order,
//       ingredientsInfo,
//       ingredientsToShow,
//       remains,
//       total,
//       date
//     });

//     return {
//       ...order,
//       ingredientsInfo,
//       ingredientsToShow,
//       remains,
//       total,
//       date
//     };
//   }, [order, ingredients]);

//   if (!orderInfo) {
//     console.log('Order Info is null, returning null for rendering');
//     return null;
//   }

//   return (
//     <OrderCardUI
//       orderInfo={orderInfo}
//       maxIngredients={maxIngredients}
//       locationState={{ background: location }}
//     />
//   );
// });

import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.data
  );

  console.log('Order received in OrderCard:', order);
  console.log('Ingredients from store:', ingredients);

  const orderInfo = useMemo(() => {
    if (
      !ingredients.length ||
      !order.ingredients ||
      !Array.isArray(order.ingredients)
    ) {
      console.log('No ingredients found or order.ingredients is not an array');
      return null;
    }

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    console.log('Order Info generated:', {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    });

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    console.log('Order Info is null, returning null for rendering');
    return null;
  }

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
