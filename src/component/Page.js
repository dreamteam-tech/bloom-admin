import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Breadcrumbs } from 'firefly/component';
import { Content } from './Content';

export class Page extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    breadcrumbs: PropTypes.array,
    children: PropTypes.any
  };

  static defaultProps = {
    children: null,
    className: '',
    breadcrumbs: []
  };

  render() {
    const {
      title,
      breadcrumbs,
      className,
      children,
      ...rest
    } = this.props;

    return (
      <div className={cx('page', className)} {...rest}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {breadcrumbs.length > 0 && (
          <Content modifiers='breadcrumbs'>
            <Breadcrumbs breadcrumbs={breadcrumbs}/>
          </Content>
        )}
        {children}
      </div>
    );
  }
}

export default Page;