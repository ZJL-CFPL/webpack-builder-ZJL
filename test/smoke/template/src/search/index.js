'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import '../../common/index.js';
import './search.scss';
import logo from './img/logo.png';
import {a} from './tree-shaking'

class Search extends React.Component {
    constructor(){
        super(...arguments);
        this.state = {
            Text:null
        }
    }
    loadComponent() {
        import('./text.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        });
    }

    render(){
        const funcA = a();
        const { Text } = this.state;
        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            Search Text pages1d {funcA}
            <img src={ logo }  onClick = {this.loadComponent.bind(this)} />          
        </div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)

