/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory, Link } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { LoginApp } from '../common/LoginApp'
import { routePane } from '../common/RouteLayout'


// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    routing: routerReducer
  })
)

const styleBase = {position: 'absolute', left: '250px', top: '0px', width: "200px", height: '800px', overflow: 'scroll'};

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

class FirstPane extends React.Component<{}, {}> {
  render(){
    return (
      <div style={{position: 'absolute'}}>
        <div style={Object.assign({}, styleBase, { left: '0px', backgroundColor: 'red' })}><App/></div>
        {this.props.children}
      </div>
    );
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

class SecondPane extends React.Component<{}, {}> {
  render(){
    return (
      <div>
        <div style={Object.assign({}, styleBase, { backgroundColor: 'blue' })}><Foo/></div>
        {this.props.children}
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

class ThirdPane extends React.Component<{params: any}, {}> {
  render(){
    return (
      <div>
        <div style={Object.assign({}, styleBase, { left: '500px', backgroundColor: 'yellow' })}><FooChild params={this.props.params}/></div>
      </div>
    );
  }
}


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <LoginApp>
      { /* Tell the Router to use our enhanced history */ }
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="foo" component={SecondPane}>
            <Route path="/foo/:fooId" component={ThirdPane}/>
          </Route>
        </Route>
      </Router>
    </LoginApp>
  </Provider>,
  document.body
)
