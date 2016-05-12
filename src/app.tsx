/// <reference path="./typings/tsd.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { StatelessComponent, Component } from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { LoginApp } from './layout/LoginLayout'
import { routePane } from './layout/RoutePane'

import { CounterSummary, CounterControl, CounterHistory } from './counter/components'
import { counterReducer, incrementCount } from './counter/reducer.ts'


const store = createStore(
  combineReducers({
    routing: routerReducer, // Add the reducer to your store on the `routing` key
    counter: counterReducer
  })
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

// TODO: Connect は Routingグループ毎のファイル内で行う、 routePane -(params)-> Connect(Hoge) -(state)-> Hoge という流れ
const FirstPane = connect(
  (state) => ({ counter: state.counter }),
  null
)(CounterSummary);

const SecondPane = connect(
  (state) => ({
    logs: state.counter.history
  }),
  (dispatch) => ({
    onIncrement: () => dispatch(incrementCount())
  })
)(CounterControl);

const ThirdPane = connect(
  (state: any, ownProps: any) => ({
    logId: ownProps.params.logId,
    logs: state.counter.history
  })
)(CounterHistory);


function IndexState(){
  return (<div>INDEX: <Link to="/counter">Counter</Link></div>);
}


ReactDOM.render(
  <Provider store={store}>
    <LoginApp>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route path="/" component={IndexState} />
        <Route path="/counter" component={routePane(FirstPane, 1)}>
          <Route path="control" component={routePane(SecondPane, 2)}>
            <Route path="history/:logId" component={routePane(ThirdPane, 3, 'wide')}/>
          </Route>
        </Route>
      </Router>
    </LoginApp>
  </Provider>,
  document.getElementById("react-app")
);
