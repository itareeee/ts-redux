/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'
import * as CSSTransitionGroup from 'react-addons-css-transition-group';
import * as ReactRouter from 'react-router';

var routePaneStyles = require('./route-layout.css');


export function routePane(
  component: any, //TODO: nice typing
  depthIdx: number, 
  widthType: 'narrow' | 'wide' | 'full' = 'narrow',
  leftFix: boolean = true 
) {
  if (depthIdx < 1) throw new Error('Illegal Argument: depthIdx cannot be less than 1');
  if (depthIdx == 1 && leftFix == false) throw new Error('Illegal Argument: rightFix cannot be applied to first pane');
  if (!['narrow', 'wide', 'full'].find(typ => typ == widthType)) throw new Error('Illegal Argument: wrong widthType');

  if (depthIdx > 3) throw new Error('Not Implemented: Only up to third panes are supported for now');
  if (!leftFix) throw new Error('Not Implemented: Only left fix style is supported for now');

  const computeStyle = (): Object => {
    const styleBase = { position: 'absolute', top: '0px', width: "200px", height: '800px' };

    switch(depthIdx) {
      case 1: return Object.assign({}, styleBase, { left: 0, backgroundColor: 'orange' });
      case 2: return Object.assign({}, styleBase, { left: '250px', backgroundColor: 'skyblue' });
      case 3: return Object.assign({}, styleBase, { left: '500px', backgroundColor: 'yellow' });
      default: throw new Error(`Unexpected depthIdx: ${depthIdx}`)
    }
  };

  return React.createClass({
    displayName: 'RoutePane',
    render: function () {


      const panePart = React.createElement(
        'div',
        {style: computeStyle()},
        React.createElement(component, this.props) //TODO: clone? ...this.props?
      );

      const { children } = this.props;
      const childKey = children ? JSON.stringify(children.props.routeParams) : '__childKey';

      const childrenPart = (
          <CSSTransitionGroup transitionName={routePaneStyles}
                              transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div key={childKey}>{this.props.children}</div>
          </CSSTransitionGroup>
      );

      return (
        <div style={ {position: 'absolute'} } >
          {panePart}
          {childrenPart}
        </div>
      )
    }
  });
}
