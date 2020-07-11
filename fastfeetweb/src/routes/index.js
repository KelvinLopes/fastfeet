import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

//Pages
import SignIn from '../pages/signin';
import Dashboard from '../pages/DeliveryOrdersList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
    </Switch>
  );
}
