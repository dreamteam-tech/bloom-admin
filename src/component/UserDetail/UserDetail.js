import React, { Component } from 'react';
import * as Icons from 'react-feather';
import PropTypes from 'prop-types';
import { H1, SmartDetailTable } from 'firefly/component';

export default class UserDetail extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const {
      user
    } = this.props;

    const mapping = [
      {
        title: 'Идентификатор',
        value: 'id'
      },
      {
        title: 'Электронная почта',
        value: 'email'
      },
      {
        title: 'Телефон',
        value: x => x.phone ? x.phone : <Icons.Minus />
      },
      {
        title: 'Дата регистрации',
        value: 'created_at'
      },
      {
        title: 'Город',
        value: x => x.city_id ? x.city.name : <Icons.Minus />
      },
      {
        title: 'Активирован',
        value: x => x.is_active ? <Icons.Check /> : <Icons.Minus />
      },
      {
        title: 'Администратор',
        value: x => x.is_admin ? <Icons.Check /> : <Icons.Minus />
      }
    ];

    return (
      <div>
        <H1>{user.email}</H1>
        <SmartDetailTable
          object={user}
          mapping={mapping} />
      </div>
    );
  }
}
