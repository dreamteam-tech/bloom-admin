import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Portal from './Portal';

export default class Modal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.object
    ]),
    autoLock: PropTypes.bool
  };

  static defaultProps = {
    show: false,
    autoLock: true
  };

  autoLockScroll(show) {
    if (this.props.autoLock) {
      show ? disableBodyScroll() : enableBodyScroll();
    }
  }

  UNSAFE_componentWillReceiveProps({ show }) {
    this.autoLockScroll(show);
  }

  render() {
    const {
      show,
      onClose,
      title,
      children
    } = this.props;

    return (
      <Portal target="modal">
        <div className={cx('b-modal', { 'b-modal_open': show })}>
          <div className="b-modal__bg" onClick={e => onClose()} />
          <div className="b-modal__modal">
            <div className="b-modal__header">
              {title ? <div className="b-modal__title">{title}</div> : <div />}
              <button onClick={onClose}
                      className="b-modal__close">&times;</button>
            </div>
            <div className="b-modal__content">{children}</div>
          </div>
        </div>
      </Portal>
    );
  }
}
