import React from 'react';
import { Form } from 'firefly/component';

export default class UserSelect extends Form {
  UNSAFE_componentWillMount() {
    this.props.fetch();
  }

  render() {
    const {
      objects,
      name,
      value,
      loading,
      onChange
    } = this.props;

    return (
      <select
        className="b-input b-input--select"
        onChange={onChange}
        name={name}
        value={value}
        id={name}>
        <option value={null} />
        {!loading && objects.map((user, i) => (
          <option key={i} value={user.id}>{user.email}</option>
        ))}
      </select>
    );
  }
}
