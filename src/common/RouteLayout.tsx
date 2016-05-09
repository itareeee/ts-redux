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
  if (depthIdx != 1 && widthType == 'full') throw new Error('Illegal Argument: full-size pane can be applied only to the first pane');
  if (!['narrow', 'wide', 'full'].find(typ => typ == widthType)) throw new Error('Illegal Argument: wrong widthType');

  if (depthIdx > 3) throw new Error('Not Implemented: Only up to third panes are supported for now');
  if (!leftFix) throw new Error('Not Implemented: Only left fix style is supported for now');

  function computeStyles(): Array<Object> {
    let width: number = null;
    switch (widthType) {
      case 'narrow':
        width = 300;
        break;
      case 'wide':
        width = 850;
        break;
    }

    const mine = {
      height: '100%',
      border: 'medium solid #111111', boxSizing: 'border-box', backgroundColor: '#E6E6E6'
    };

    const child = { position: 'absolute', left: width, top: 0, bottom: 0 };

    return [
      Object.assign({}, mine, { width: width }),
      Object.assign({}, child, { left: width })
    ]
  }

  const [myStyle, childStyle] = computeStyles();

  // TODO: use createElement to intercept with PaneRoute
  // TODO: use this.context.router to calc Position of its own pane
  return React.createClass({
    displayName: 'RoutePane',

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    render: function () {

      const { children } = this.props;
      const childKey = children ? JSON.stringify(children.props.routeParams) : '__childKey';

      return (
        <div style={{ height: '100%'}}>
          {/* My Pane Area */}
          <div style={myStyle}>
            {React.createElement(component, this.props)}
          </div>

          {/* Child Area */}
          <CSSTransitionGroup component="div" transitionName={routePaneStyles} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <div key={childKey} style={childStyle}>
              {this.props.children} {/* Child <Route> Comes Here */}
            </div>
          </CSSTransitionGroup>
        </div>
      )
    }
  });
}
