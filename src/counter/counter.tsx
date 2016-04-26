/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom'

// For Reducer
import * as Redux from 'redux';
//import * as Models from './models';
//import * as Actions from './actions';

// Component
//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import * as Redux from 'redux';
import {Provider, connect} from 'react-redux';
//import todoApp from './reducers';
//import * as Actions from './actions';
//import * as Models from './models';


// App State
interface AppState { counter: Counter; }

// Models
export class Counter {
  constructor(public count: number) {
  }
}


// Actions
enum CounterActionTypes { Increment, Decrement }

interface CounterAction { type: CounterActionTypes; }

function increment() { return { type: CounterActionTypes.Increment } as CounterAction; }
function decrement() { return { type: CounterActionTypes.Decrement } as CounterAction; }


// Reducer (Store)
function counter(state = new Counter(0), action: CounterAction) {
  switch (action.type) {
    case CounterActionTypes.Increment:
      return Object.assign({}, state, { count: state.count + 1 } as Counter);
    case CounterActionTypes.Decrement:
      return Object.assign({}, state, { count: state.count - 1 } as Counter);
    default:
      return state;
  }
}

const counterApp = Redux.combineReducers({ counter });
let store = Redux.createStore(counterApp);


// View
interface AppProps extends React.Props<{}> {
  counter?: Counter;
  dispatch?: Redux.Dispatch;
}

class App extends React.Component<AppProps, {}> {
  render() {
    const { dispatch, counter } = this.props;
    return (
      <div>
          <p>{counter.count}</p>
          <button onClick={() => dispatch(increment())}>Inc</button>
          <button onClick={() => dispatch(decrement())}>Dec</button>
      </div>
    );
  }
}



// Connect
const ReduxCounterApp = connect(
    (state: AppState): AppProps  => ({ counter: state.counter })
  )(App);

ReactDOM.render(
    <Provider store={store}>
        <ReduxCounterApp />
    </Provider>,
    document.body
);

