// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CitySelector from './components/CitySelector';
import Header from './components/Header';


// IMPORT COMPONENT REFERENCES

// IMPORT CSS
import './index.css';


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Route path="/" exact component={CitySelector} />
                </div>
            </Router>
        );
    }
}

export default App;