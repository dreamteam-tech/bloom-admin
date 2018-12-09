import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Notification extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string,
    title: PropTypes.string.isRequired,
    state: PropTypes.string,
    callback: PropTypes.func.isRequired,
    expire: PropTypes.number
  };
  static defaultProps = {
    text: null,
    state: 'success',
    expire: 10000
  };
  timer = undefined;
  temp = undefined;
  state = {
    show: false
  };
  onClick = e => {
    e.preventDefault();

    this.close();
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    clearTimeout(this.temp);
    clearTimeout(this.timer);

    this.temp = setTimeout(() => {
      this.setState({ show: true }, () => {
        this.timer = setTimeout(() => {
          this.close();
        }, this.props.expire);
      });
    }, 0);
  }

  componentWillUnmount() {
    clearTimeout(this.temp);
    clearTimeout(this.timer);
  }

  close() {
    clearTimeout(this.temp);
    clearTimeout(this.timer);

    this.setState({ show: false }, () => {
      this.temp = setTimeout(() => {
        const {
          callback,
          id
        } = this.props;

        callback(id);
      }, 350);
    });
  }

  render() {
    const {
      id,
      title,
      state,
      text
    } = this.props;

    const {
      show // исключительно ради анимации
    } = this.state;

    const cls = cx('notification__notification', {
      [`notification__notification--${state}`]: ['error', 'success'].indexOf(state) > -1,
      'notification__notification--active': show
    });

    return (
      <div className={cls} onClick={this.onClick} data-id={id}>
        <div className="notification__title">{title}</div>
        <div className="notification__text">{text}</div>
      </div>
    );
  }
}
