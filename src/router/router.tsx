/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { LoginApp } from '../common/LoginApp'
import { routePane } from '../common/RouteLayout'

var paneStyles = require('./router-style.css');


// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer
  })
);

/*
 * First Pane
 */
class App extends React.Component<{}, {}> {
  render(){
    return (
      <div>
        <h1> App </h1>
        <Link to="foo">Foo</Link><br/>
        <Link to="bar">Bar</Link>
      </div>
    )
  }
}


/*
 * Second Pane
 */
class Foo extends React.Component<{}, {}> {
  render(){
    return (
      <div>
        <h2>Foo</h2>
        <p>
          <Link to="foo/1">Foo1</Link><br/>
          <Link to="foo/2">Foo2</Link><br/>
          <Link to="foo/3">Foo3</Link><br/>
          <Link to="foo/4">Foo4</Link><br/>
        </p>
      </div>
    );
  }
}


/*
 * Third pane
 */
class FooChild extends React.Component<{params: any}, {}> {
  render(){
    return (<b>FooID: {this.props.params.fooId}</b>)
  }
}


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <LoginApp>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route path="/" component={routePane(App, 1)}>
          <Route path="foo" component={routePane(Foo, 2)}>
            <Route path="/foo/:fooId" component={routePane(FooChild, 3)}/>
          </Route>
        </Route>
      </Router>
    </LoginApp>
  </Provider>,
  document.getElementById("react-app")
)
