import React from 'react';
import objectPath from 'object-path-value';

export function getErrors(path, errors = []) {
  return objectPath(errors || [], path, []) || [];
}

export const Errors = ({ errors }) => Array.isArray(errors) ? errors.map((err, i) => (
  <div className="b-errors__error" key={i}>{err}</div>
)) : null;