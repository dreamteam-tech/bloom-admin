import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Thead extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    const {
      children
    } = this.props;

    return (
      <thead className='b-table__thead'>
        {children}
      </thead>
    );
  }
}
