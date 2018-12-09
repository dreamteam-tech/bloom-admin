import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default class Portal extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    target: PropTypes.string.isRequired
  };

  render() {
    return createPortal(
      this.props.children,
      document.getElementById(this.props.target)
    );
  }
}
