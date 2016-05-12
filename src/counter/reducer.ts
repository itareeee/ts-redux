export interface CounterState {
  count: number;
  history: Array<CounterLog>;
}

export interface CounterLog {
  id: string;
  count: number;
  timestamp: string;
}

const INCREMENT_COUNT = 'INCREMENT_COUNT';


const INITIAL_STATE = { count: 0, history: [ {id: '1', count: 0, timestamp: (new Date()).toUTCString()} ] };

export function counterReducer(
  state: CounterState = INITIAL_STATE,
  action: any
){
  switch (action.type) {
    case INCREMENT_COUNT:
      const log = {
        id: Math.ceil(Math.random() * 10000),
        count: state.count + 1,
        timestamp: (new Date()).toUTCString()
      };
      const newState = { count: state.count + 1, history: [...state.history, log] };

      return Object.assign({}, state, newState);
    default:
      return state;
  }
}

export function incrementCount() {
  return { type: INCREMENT_COUNT };
}
