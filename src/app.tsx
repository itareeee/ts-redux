/// <reference path="typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom'

interface Props {
  content: string;
}

class MyComponent extends React.Component<Props, { count: number }> {

  constructor(){
    super();
    this.state = {count: 0};
  }

  componentDidMount(){
    setInterval(() => {
      const newCount = this.state.count + 1;
      this.setState({count: newCount})
    }, 1000);
  }

  render() {
    return <div>{this.props.content}: {this.state.count}</div>
  }
}

ReactDOM.render(<MyComponent content="Hello World" />, document.body);
