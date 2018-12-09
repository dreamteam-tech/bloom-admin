import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Portal from '../../Portal';
import Notification from '../Notification';

export default class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.object,
    remove: PropTypes.func.isRequired
  };

  static defaultProps = {
    notifications: []
  };

  remove = id => {
    this.props.remove(id);
  };

  render() {
    const {
      notifications
    } = this.props;

    const nodes = Object.keys(notifications).map(id => (
      <Notification
        key={id}
        callback={this.remove}
        {...notifications[id]} />
    ));

    return (
      <Portal target="notification">
        <div className={cx('notification__container')}>
          {nodes}
        </div>
      </Portal>
    );
  }
}
