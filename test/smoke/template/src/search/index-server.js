'use strict';

// import React from 'react';
// import ReactDOM from 'react-dom';
// import '../../common/index.js';
// import './search.scss';
// import logo from './img/logo.png';
// import {a} from './tree-shaking'

const React = require('react');
const logo = require('./img/logo.png');
require('./search.scss')

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
        const { Text } = this.state;
        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            大表哥<img src={ logo }  onClick = {this.loadComponent.bind(this)} />          
        </div>
    }
}

module.exports = <Search />;