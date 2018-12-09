import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PermissionDenied from './PermissionDenied';
import { bindConnect, isGranted } from '../utils';

class PermissionContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    user: PropTypes.object,
    throwError: PropTypes.bool,
    permission: PropTypes.string
  };

  static defaultProps = {
    throwError: false,
    permission: 'admin',
    user: null
  };

  render() {
    const {
      user,
      throwError,
      permission,
      children
    } = this.props;

    if (isGranted(user, permission)) {
      return children;
    }

    if (throwError) {
      return <PermissionDenied />;
    }

    return null;
  }
}

export default bindConnect(state => ({
  user: state.current_user.user
}))(PermissionContainer);
