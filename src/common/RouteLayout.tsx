/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'


const styleBase = {position: 'absolute', left: '250px', top: '0px', width: "200px", height: '800px', overflow: 'scroll'};

export function routePane<C extends React.Component<{}, {}>>(
  component: C,
  depthIdx: number, 
  widthType: 'narrow' | 'wide' | 'full' = 'narrow',
  leftFix: boolean = true 
) {
  if (depthIdx < 1) throw new Error('Illegal Argument: depthIdx cannot be less than 1');
  if (depthIdx == 1 && leftFix == false) throw new Error('Illegal Argument: rightFix cannot be applied to first pane');
  if (depthIdx > 2) throw new Error('Not Implemented: Only up to third panes are suppported for now');

  let override = {};
  if (depthIdx == 0) override = { left: 0, backgroundColor: 'red' }
  if (depthIdx == 1) override = { left: '250px', backgroundColor: 'blue' }
  if (depthIdx == 2) override = { left: '500px', backgroundColor: 'yellow' }
  
  return React.createClass({
    render: function () { return (
      <div style={Object.assign({}, styleBase, override)}>
        {component}
        {this.props.children}
      </div>        
    )}
  });
}
