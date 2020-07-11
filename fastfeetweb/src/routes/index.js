import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

//Pages
import SignIn from '../pages/signin';
import Dashboard from '../pages/DeliveryOrdersList';
import DeliveryMans from '../pages/DeliverymanList';
import Recipients from '../pages/RecipientsList';
import DeliveryProblems from '../pages/DeliveryProblems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/deliverymans" exact component={DeliveryMans} isPrivate />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/delivery_problem" exact component={DeliveryProblems} isPrivate />
    </Switch>
  );
}
