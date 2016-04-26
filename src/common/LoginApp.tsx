/// <reference path="../typings/tsd.d.ts" />

/* Libs */
import * as React from 'react';

/* CSS */
var commonLayout = require('./common-layout.css');


export class LoginApp extends React.Component<{}, {}> {
  render() { 
    return (
      <div className={commonLayout.loginWrapper}>
        <LoginAppHeader/>
        <LoginAppSideNav/>
        <main>{this.props.children}</main>
      </div> 
    );
  }
}

class LoginAppHeader extends React.Component<{}, {}> {
  render() { 
    return (<header className={commonLayout.loginHeader}>HEADER HERE</header>); 
  }
}

class LoginAppSideNav extends React.Component<{}, {}> {
  render(){ return (
    <div className={commonLayout.loginSideNav}>Side Nav HERE</div>
  ); }
}
