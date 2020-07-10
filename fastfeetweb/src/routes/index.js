import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

//Pages
import signin from '../pages/signin';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={signin} />
    </Switch>
  );
}
