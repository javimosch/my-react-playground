import React, {
  Component
}
from 'react';
import {
  IndexLink,
  Link
}
from "react-router";
var classNames = require('classnames');

export default class Nav extends Component {
  constructor() {
    super()
    this.state = {
      collapsed: false,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({
      collapsed
    });
    console.log(this.state.collapsed);
  }
  render() {
    const {
      location
    } = this.props;
    const {
      collapsed
    } = this.state;
    // const featuredClass = location.pathname === "/" ? "active" : "";
    // const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
    // const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    const navClass = classNames({ 'navbar-collapse': true, 'collapsed': collapsed,'collapse':!collapsed }); // => 'foo bar'
    
    console.log('navClass', navClass);
    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div className={navClass} id="NAVBAR">
            <ul class="nav navbar-nav">
              <li activeClassName="active" onlyActiveOnIndex={true}>
                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Featured</IndexLink>
              </li>
              <li activeClassName="active">
                <Link to="archives" onClick={this.toggleCollapse.bind(this)}>Archives</Link>
              </li>
              <li activeClassName="active">
                <Link to="todos" onClick={this.toggleCollapse.bind(this)}>Todos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
