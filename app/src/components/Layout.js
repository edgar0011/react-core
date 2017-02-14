/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import Component from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const title = 'Layout';
        console.log('Layout: this.props');
        console.log(this.props);
        console.log('Layout: this.state');
        console.log(this.state);
        return (
            <div class="jumbotron">
              <h1>{title}</h1>
              <ul class=" nav justify-content-center">
                <li><Link to="/" activeClassName="active" class="nav-item nav-link">Main</Link></li>
                <li><Link to="todo" activeClassName="active" class="nav-item nav-link">Todo</Link></li>
              </ul>

              <ul class="nav justify-content-center">
                <li class="nav-item">
                  <Link to="/" activeClassName="active" class="nav-link">Active</Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">Disabled</a>
                </li>
              </ul>

              <div>{this.props.children}</div>
            </div>
        )
    }
}