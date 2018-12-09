import { bem } from 'firefly/component';
import React from 'react';

export const Content = ({ modifiers, children }) => (
  <div className={bem('b-content', modifiers)}>
    {children}
  </div>
);