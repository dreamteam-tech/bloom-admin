import React, { Component } from 'react';

export default class PermissionDenied extends Component {
  render() {
    return (
      <div className="warning">
        Недостаточно прав доступа
      </div>
    );
  }
}
