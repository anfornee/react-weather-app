// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
                    <Switch>
                        <Route path="/" exact component={CitySelector} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;