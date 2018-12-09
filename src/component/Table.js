import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import objectPath from 'object-path-value';
import { NonIdealState } from 'firefly/component';

export default class Table extends Component {
  static propTypes = {
    renderColumns: PropTypes.array,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        tdStyle: PropTypes.object,
        style: PropTypes.object,
        title: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.node,
          PropTypes.object,
          PropTypes.func
        ]).isRequired,
        key: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.string
        ])
      })
    ).isRequired,
    className: PropTypes.string,
    data: PropTypes.array
  };

  static defaultProps = {
    className: '',
    renderColumns: [],
    data: []
  };

  render() {
    const {
      className,
      renderColumns,
      columns,
      data
    } = this.props;

    const header = [];
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];

      if (renderColumns.length > 0 && renderColumns.indexOf(col.column) === -1) {
        continue;
      }

      header.push((
        <th
          className={cx('b-table__th b-table__th_transparent', col.className)}
          style={col.style || {}}
          key={i}>
          {col.title}
        </th>
      ));
    }

    const body = data.map((item, t) => {
      const nodes = [];
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];

        if (renderColumns.length > 0 && renderColumns.indexOf(col.column) === -1) {
          continue;
        }

        nodes.push((
          <td
            style={col.tdStyle || {}}
            className="b-table__td b-table__td_transparent"
            key={`${i}-${t}`}>
            {typeof col.key === 'function' ? col.key(item) : objectPath(item, col.key, col.key)}
          </td>
        ));
      }

      return (
        <tr className="b-table__tr" key={t}>
          {nodes}
        </tr>
      );
    });

    if (data.length === 0) {
      return (
        <NonIdealState title='Записи отсутствуют' />
      );
    }

    return (
      <div className="b-table__wrapper">
        <table className={cx('b-table', className)}>
          <thead className="b-table__thead">
            <tr className="b-table__tr">
              {header}
            </tr>
          </thead>
          <tbody className="b-table__tbody">
            {body}
          </tbody>
        </table>
      </div>
    );
  }
}
