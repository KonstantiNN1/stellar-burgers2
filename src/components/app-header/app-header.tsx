// import { FC } from 'react';
// import { AppHeaderUI } from '@ui';

// export const AppHeader: FC = () => <AppHeaderUI userName='' />;

// import { FC } from 'react';
// import { NavLink } from 'react-router-dom';
// import styles from '../../components/ui/app-header/app-header.module.css';

// export const AppHeader: FC = () => {
//   return (
//     <header className={styles.header}>
//       <nav className={styles.nav}>
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? `${styles.link} ${styles.active}` : styles.link
//           }
//         >
//           Конструктор
//         </NavLink>
//         <NavLink
//           to="/feed"
//           className={({ isActive }) =>
//             isActive ? `${styles.link} ${styles.active}` : styles.link
//           }
//         >
//           Лента заказов
//         </NavLink>
//         <NavLink
//           to="/profile"
//           className={({ isActive }) =>
//             isActive ? `${styles.link} ${styles.active}` : styles.link
//           }
//         >
//           Профиль
//         </NavLink>
//       </nav>
//     </header>
//   );
// };

// export default AppHeader;

import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.name);

  return <AppHeaderUI userName={userName ?? undefined} />;
};

export default AppHeader;
