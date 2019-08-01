// IMPORT PACKAGE REFERENCES
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// IMPORT COMPONENT REFERENCES
import Header from './components/Header';
import CitySelector from './components/CitySelector';

// IMPORT CSS
import './index.css';


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={CitySelector} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;