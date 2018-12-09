import React, { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Thead } from './Thead';
import { Tbody } from './Tbody';

export class Table extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  renderThead() {
    const { children } = this.props;

    return Children.map(children, child => {
      return (child && child.type === Thead) ? child : null;
    });
  }

  renderTbody() {
    const { children } = this.props;

    return Children.map(children, child => {
      return (child && child.type === Tbody) ? child : null;
    });
  }

  render() {
    return (
      <table className='b-table'>
        {this.renderThead()}
        {this.renderTbody()}
      </table>
    );
  }
}
