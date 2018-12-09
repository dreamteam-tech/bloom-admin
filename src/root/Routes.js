import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../component/PrivateRoute';
import Homepage from '../page/Homepage';
import * as strategyScreens from '../module/strategy/screens';
import * as userScreens from '../module/user/screens';
import * as transactionScreens from '../module/transaction/screens';
import { Layout } from "./Layout";

export default () => (
  <Switch>
    <Route exact path='/login' component={userScreens.Login}/>
    <PrivateRoute exact layout={Layout} path='/' component={Homepage}/>

    <PrivateRoute exact layout={Layout} path='/user' component={userScreens.UserList}/>
    <PrivateRoute exact layout={Layout} path='/user/:user_id' component={userScreens.UserView}/>

    <PrivateRoute exact layout={Layout} path='/transaction' component={transactionScreens.TransactionList}/>
    <PrivateRoute exact layout={Layout} path='/transaction/:user_id' component={transactionScreens.TransactionView}/>

    <PrivateRoute exact layout={Layout} path='/strategy' component={strategyScreens.StrategyList}/>
    <PrivateRoute exact layout={Layout} path='/strategy/create' component={strategyScreens.StrategyCreate}/>
    <PrivateRoute exact layout={Layout} path='/strategy/update/:strategy_id' component={strategyScreens.StrategyUpdate}/>
    <PrivateRoute exact layout={Layout} path='/strategy/:strategy_id' component={strategyScreens.StrategyView}/>

    <Route component={() => (
      <div className="b-nomatch">
        404 - Страница не найдена
      </div>
    )}/>
  </Switch>
);
