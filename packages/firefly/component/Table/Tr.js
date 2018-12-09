import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Tr extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    const {
      children
    } = this.props;

    return (
      <tr className='b-table__tr'>
        {children}
      </tr>
    );
  }
}
