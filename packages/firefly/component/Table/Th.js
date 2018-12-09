import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { bem } from '..';

export class Th extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    modifiers: PropTypes.any,
    children: PropTypes.any.isRequired
  };

  static defaultProps = {
    modifiers: null,
    className: null
  };

  render() {
    const {
      modifiers,
      children,
      className,
      ...rest
    } = this.props;

    return (
      <th className={cx(bem('b-table__th', modifiers), className)} {...rest}>
        {children}
      </th>
    );
  }
}
