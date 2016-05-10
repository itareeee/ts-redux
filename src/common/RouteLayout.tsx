/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react'
import * as CSSTransitionGroup from 'react-addons-css-transition-group';
import * as ReactRouter from 'react-router';
import * as $ from 'jquery';

var routePaneStyles = require('./route-layout.css');


const WIDTH_TYPES = {
  narrow: '300px',
  wide: '850px',
  full: '100%'
}

export function routePane(
  component: any, //TODO: nice typing
  depthIdx: number, 
  widthType: 'narrow' | 'wide' | 'full' = 'narrow',
  rightFix: boolean = false
) {
  if (depthIdx < 1) throw new Error('Illegal Argument: depthIdx cannot be less than 1');
  if (depthIdx == 1 && rightFix == true) throw new Error('Illegal Argument: rightFix cannot be applied to first pane');
  if (depthIdx != 1 && widthType == 'full') throw new Error('Illegal Argument: full-size pane can be applied only to the first pane');
  if (!['narrow', 'wide', 'full'].find(typ => typ == widthType)) throw new Error('Illegal Argument: wrong widthType');

  if (depthIdx > 3) throw new Error('Not Implemented: Only up to third panes are supported for now');
  if (rightFix) throw new Error('Not Implemented: Only left fix style is supported for now');

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
  const $win = $(window);


  function adjustLeft(routePaneDiv: JQuery, routes: Array<any>){
    const width = $win.width();
    if(width < 800 && depthIdx > 1) {
      routePaneDiv.css({left: -200});
    } else if(width < 1000 && depthIdx > 1){
      routePaneDiv.css({left: -100});
    } else {
      routePaneDiv.css({left: 0});
    }
  }

  // TODO: use createElement to intercept with PaneRoute
  // TODO: use this.context.router to calc Position of its own pane
  // TODO: _k problem
  // TODO: global entry point
  return React.createClass<{}, {}>({
    _div: null,
    _unlistenResize: null,

    displayName: 'RoutePane',

    contextTypes: {
      router: React.PropTypes.object.isRequired
    },

    getDefaultProps: () => ({
      widthType
    }),

    componentDidMount() {
      //adjustLeft(this._div); //TODO: use onUpdate instead
      this._unlistenResize = $win.on('resize', () => {
        adjustLeft($(this._div), this.props.routes);
      });
    },

    componentWillUnmount() {
      $win.off('resize', this._unlistenResize);
    },

    render: function () {

      const { children } = this.props;
      const childKey = children ? JSON.stringify(children.props.routeParams) : '__childKey';

      return (
        <div style={{ position: 'absolute', height: '100%'}} ref={ div => this._div = div }>

          {/* My Pane Area */}
          <section style={myStyle}>
            {React.createElement(component, this.props)}
          </section>

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
