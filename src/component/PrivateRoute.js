import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadUser } from '../module/user/utils';
import { compose, withProps } from 'recompose';

class PrivateRoute extends Component {
  static propTypes = {
    component: PropTypes.any.isRequired,
    user: PropTypes.object,
    layout: PropTypes.any
  };

  static defaultProps = {
    user: null,
    layout: null
  };

  render() {
    const {
      user,
      component: WrapComponent,
      layout: Layout,
      ...rest
    } = this.props;

    const render = props => {
      if (user) {
        return Layout ? (
          <Layout>
            <WrapComponent {...props} />
          </Layout>
        ) : (
          <WrapComponent {...props} />
        );
      }

      return (
        <Redirect to='/login' />
      );
    };

    return <Route {...rest} render={render} />;
  }
}

export default compose(
  withProps(props => ({
    ...props,
    user: loadUser()
  }))
)(PrivateRoute);
