import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'react-feather';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Pagination as Pager, Spinner } from 'firefly/component';
import Table from '../Table';
import moment from 'moment/moment';

export default class UserTable extends Component {
  static propTypes = {
    renderColumns: PropTypes.array,
    notification: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired,
    admin: PropTypes.func.isRequired,
    partner: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    objects: PropTypes.array.isRequired,
    meta: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    renderColumns: [],
    className: ''
  };
  onPageChange = page => {
    this.fetch(page);
  };
  onRemove = id => e => {
    e.preventDefault();

    const {
      remove,
      notification
    } = this.props;

    if (window.confirm('Удалить?')) {
      remove(id).then(() => {
        notification({ title: 'Удалено' });
        this.fetch();
      });
    }
  };
  fetch = (page = 1, page_size = 10) => {
    this.props.fetch({
      page_size,
      page
    });
  };
  toggleAdmin = user => e => {
    e.preventDefault();

    const {
      admin,
      notification
    } = this.props;

    admin(user.id, {
      value: !user.is_admin
    }).then(() => {
      notification({ title: 'Выполнено' });
      this.refresh();
    });
  };
  togglePartner = user => e => {
    e.preventDefault();

    const {
      partner,
      notification
    } = this.props;

    partner(user.id, {
      value: !user.is_partner
    }).then(() => {
      notification({ title: 'Выполнено' });
      this.refresh();
    });
  };

  UNSAFE_componentWillMount() {
    this.fetch();
  }

  refresh() {
    this.fetch();
  }

  render() {
    const {
      renderColumns,
      className,
      loading,
      meta,
      objects
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    const columns = [
      {
        column: 'email',
        key: t => (
          <Link className="link" to={`/user/${t.id}`}>
            {t.email}
          </Link>
        ),
        title: 'Электронная почта'
      },
      {
        column: 'phone',
        key: 'phone',
        title: 'Телефон'
      },
      {
        key: x => x.city_id ? x.city.name : <Icons.Minus />,
        title: 'Город'
      },
      {
        column: 'is_active',
        key: t => t.is_active && <Icons.Check />,
        title: 'Активирован'
      },
      {
        column: 'is_partner',
        key: t => (
          <button
            className={cx('toggle-link', { 'toggle-link--enabled': t.is_partner })}
            onClick={this.togglePartner(t)}>
            {t.is_partner ? (
              <Icons.Check />
            ) : (
              <Icons.X />
            )}
          </button>
        ),
        title: 'Партнер'
      },
      {
        column: 'is_admin',
        key: t => (
          <button
            className={cx('toggle-link', { 'toggle-link--enabled': t.is_admin })}
            onClick={this.toggleAdmin(t)}>
            {t.is_admin ? (
              <Icons.Check />
            ) : (
              <Icons.X />
            )}
          </button>
        ),
        title: 'Администратор'
      },
      {
        column: 'created_at',
        key: t => moment(t.created_at).format('lll'),
        title: 'Дата регистрации'
      },
      {
        column: 'updated_at',
        key: t => moment(t.updated_at).format('lll'),
        title: 'Дата изменения'
      },
      {
        column: 'actions',
        key: x => (
          <Fragment>
            <button onClick={this.onRemove(x.id)} className="link">
              <Icons.Trash2 className="icon" />
            </button>
          </Fragment>
        ),
        title: '',
        tdStyle: {
          align: 'right',
          width: 100,
          textAlign: 'center'
        }
      }
    ];

    return (
      <div>
        <Table
          renderColumns={renderColumns}
          className={className}
          columns={columns}
          data={objects} />
        {!loading && <Pager
          onPageChange={this.onPageChange}
          pageCount={meta.page_count}
          page={meta.page}
          total={meta.total} />}
      </div>
    );
  }
}
