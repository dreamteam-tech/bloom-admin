import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Tbody extends PureComponent {
  static propTypes = {
    objects: PropTypes.array.isRequired,
    renderRow: PropTypes.func.isRequired
  };

  render() {
    const {
      objects,
      renderRow
    } = this.props;

    return (
      <tbody className='b-table__tbody'>
        {objects.map(renderRow)}
      </tbody>
    );
  }
}
