// // // import { FC, useMemo } from 'react';
// // // import { useSelector, useDispatch } from '../../services/store';
// // // import { placeOrder } from '../../reducers/order';
// // // import { TConstructorIngredient } from '@utils-types';
// // // import { BurgerConstructorUI } from '../ui/burger-constructor';

// // // export const BurgerConstructor: FC = () => {
// // //   const dispatch = useDispatch();
// // //   const constructorItems = useSelector((state) => state.constructorItems);
// // //   const orderRequest = useSelector((state) => state.order.isRequesting);
// // //   const orderModalData = useSelector((state) => state.order.orderData);

// // //   const onOrderClick = () => {
// // //     if (!constructorItems.bun || orderRequest) return;
// // //     const ingredientIds = constructorItems.ingredients.map(
// // //       (item: TConstructorIngredient) => item.id
// // //     );
// // //     dispatch(placeOrder(ingredientIds));
// // //   };

// // //   const closeOrderModal = () => {
// // //     // Логика закрытия модального окна
// // //   };

// // //   const price = useMemo(
// // //     () =>
// // //       (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
// // //       constructorItems.ingredients.reduce(
// // //         (s: number, v: TConstructorIngredient) => s + v.price,
// // //         0
// // //       ),
// // //     [constructorItems]
// // //   );

// // //   return (
// // //     <BurgerConstructorUI
// // //       price={price}
// // //       orderRequest={orderRequest}
// // //       constructorItems={constructorItems}
// // //       orderModalData={orderModalData}
// // //       onOrderClick={onOrderClick}
// // //       closeOrderModal={closeOrderModal}
// // //     />
// // //   );
// // // };

// // import { FC, useMemo } from 'react';
// // import { useSelector, useDispatch } from '../../services/store';
// // import { placeOrder } from '../../reducers/order';
// // import { TConstructorIngredient } from '@utils-types';
// // import { BurgerConstructorUI } from '../ui/burger-constructor';
// // import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для перенаправления

// // export const BurgerConstructor: FC = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate(); // Инициализируем useNavigate
// //   const constructorItems = useSelector((state) => state.constructorItems);
// //   const orderRequest = useSelector((state) => state.order.isRequesting);
// //   const orderModalData = useSelector((state) => state.order.orderData);
// //   const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Проверка авторизации

// //   const onOrderClick = () => {
// //     if (!isLoggedIn) {
// //       navigate('/login'); // Перенаправляем на страницу логина, если пользователь не авторизован
// //       return;
// //     }

// //     if (!constructorItems.bun || orderRequest) return;

// //     const ingredientIds = constructorItems.ingredients.map(
// //       (item: TConstructorIngredient) => item.id
// //     );

// //     dispatch(placeOrder(ingredientIds));
// //   };

// //   const closeOrderModal = () => {
// //     // Логика закрытия модального окна
// //   };

// //   const price = useMemo(
// //     () =>
// //       (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
// //       constructorItems.ingredients.reduce(
// //         (s: number, v: TConstructorIngredient) => s + v.price,
// //         0
// //       ),
// //     [constructorItems]
// //   );

// //   return (
// //     <BurgerConstructorUI
// //       price={price}
// //       orderRequest={orderRequest}
// //       constructorItems={constructorItems}
// //       orderModalData={orderModalData}
// //       onOrderClick={onOrderClick}
// //       closeOrderModal={closeOrderModal}
// //     />
// //   );
// // };

// import { FC, useMemo } from 'react';
// import { useSelector, useDispatch } from '../../services/store';
// import { addIngredient, addBun } from '../../reducers/constructorItems';
// import { TConstructorIngredient } from '@utils-types';
// import { BurgerConstructorUI } from '../ui/burger-constructor';
// import { useNavigate } from 'react-router-dom';
// import { placeOrder } from '../../reducers/order'; // Импортируем placeOrder, если у вас есть этот редуктор

// export const BurgerConstructor: FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const constructorItems = useSelector((state) => state.constructorItems);
//   const orderRequest = useSelector((state) => state.order.isRequesting);
//   const orderModalData = useSelector((state) => state.order.orderData);
//   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

//   const onOrderClick = () => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }

//     if (!constructorItems.bun || orderRequest) return;

//     const ingredientIds = [
//       constructorItems.bun._id,
//       ...constructorItems.ingredients.map(
//         (item: TConstructorIngredient) => item._id
//       ),
//       constructorItems.bun._id,
//     ];

//     dispatch(placeOrder(ingredientIds));
//   };

//   const closeOrderModal = () => {
//     // Логика закрытия модального окна
//   };

//   const price = useMemo(
//     () =>
//       (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
//       constructorItems.ingredients.reduce(
//         (s: number, v: TConstructorIngredient) => s + v.price,
//         0
//       ),
//     [constructorItems]
//   );

//   // Логика добавления ингредиента
//   const onAddIngredient = (ingredient: TConstructorIngredient) => {
//     if (ingredient.type === 'bun') {
//       dispatch(addBun(ingredient));
//     } else {
//       dispatch(addIngredient(ingredient));
//     }
//   };

//   return (
//     <BurgerConstructorUI
//       price={price}
//       orderRequest={orderRequest}
//       constructorItems={constructorItems}
//       orderModalData={orderModalData}
//       onOrderClick={onOrderClick}
//       closeOrderModal={closeOrderModal}
//     />
//   );
// };

import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { createOrder } from '../../reducers/order'; // Используем функцию createOrder
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '../ui/burger-constructor';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.constructorItems);
  const orderRequest = useSelector((state) => state.order.isRequesting);
  const orderModalData = useSelector((state) => state.order.orderData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id, // добавляем булку в начале
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      ),
      constructorItems.bun._id // добавляем булку в конце
    ];

    dispatch(createOrder(ingredientIds)); // Используем createOrder для отправки заказа
  };

  const closeOrderModal = () => {
    // Логика закрытия модального окна
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
