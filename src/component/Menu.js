import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => (
  <div className='b-menu'>
    <Link className='b-menu__link' to='/'>
      Рабочий стол
    </Link>
    <Link className='b-menu__link' to='/strategy'>
      Стратегии
    </Link>
    <Link className='b-menu__link' to='/transaction'>
      Операции
    </Link>
    <Link className='b-menu__link' to='/user'>
      Пользователи
    </Link>
  </div>
);
