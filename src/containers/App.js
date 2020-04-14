import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: '',
        };
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value.toLowerCase() });
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => this.setState({ robots: users }));
    }
    render() {
        const { robots, searchField } = this.state;
        const filteredRobots = this.state.robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchField);
        });
        if (!robots.length) {
            return <h1>Loading</h1>;
        } else {
            return (
                <>
                    <div className="tc">
                        <h1 className="f1">Robofriends</h1>
                        <SearchBox searchChange={this.onSearchChange} />
                        <hr />
                        <Scroll>
                            <CardList robots={filteredRobots} />
                        </Scroll>
                    </div>
                </>
            );
        }
    }
}

export default App;
