import { CounterState, CounterLog } from "./reducer";
import * as React from 'react'
import { Link } from 'react-router'

export function CounterSummary(
  props: { counter: CounterState}
){
  return (
    <div>
      <h1> App </h1>
      <Link to="/counter/control">Foo</Link><br/>
      <span>Count: {props.counter.count} </span>
    </div>
  );
}


export function CounterControl(
  props: {
    onIncrement: () => any,
    logs: Array<CounterLog>
  }
) {
  const { onIncrement, logs } = props;

  const logList = logs ? logs.map(log => {
    const toPath = `/counter/control/history/${log.id}`;
    return <li key={log.id}><Link to={toPath}>{log.timestamp}</Link></li>
  }) : null;

  return (
    <div>
      <h2>Foo</h2>
      <ul>{logList}</ul>
      <button onClick={onIncrement} >Increment</button>
    </div>
  )
}


export function CounterHistory(
  props: { logId: string, logs: Array<CounterLog> }
) {

  const {logId, logs} = props;
  const targetLog = logs.find(log => log.id == logId);

  return (
    <div>
      <h2>LogID: {logId}</h2>
      <p>
        {JSON.stringify(targetLog)}
      </p>
    </div>
  );
}
