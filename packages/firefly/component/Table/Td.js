import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Td extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render() {
    const {
      children
    } = this.props;

    return (
      <td className='b-table__td'>
        {children}
      </td>
    );
  }
}
