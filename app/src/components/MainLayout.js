/**
 * Created by edgar on 11/01/2017.
 */

import React from 'react';
import Component from 'react';
import { Link } from 'react-router';

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const title = 'Layout';

        return (
            <div class="jumbotron">
              <h1>{title}</h1>
              <ul class=" nav justify-content-center">
                <li><Link to="/" activeClassName="active" class="nav-item nav-link">Main</Link></li>
                <li><Link to="todo" activeClassName="active" class="nav-item nav-link">Todo</Link></li>
              </ul>

              <div>{this.props.children}</div>
            </div>
        )
    }
}