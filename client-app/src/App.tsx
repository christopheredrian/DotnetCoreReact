import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

const App: React.FC = () => {

    const [values, setValues] = useState([]);


    useEffect(() => {

        axios.get("http://localhost:5000/api/values")
            .then(response => {
                setValues(response.data.result);
            });

    }, []);

    return (
        <div>
            <Header as="h2">
                <Icon name='users' />
                <Header.Content>Reactivities</Header.Content>
            </Header>
            <List>

                {
                    values.map(({ id, name }) => {

                        return (
                            <List.Item key={id}>
                                {name}
                            </List.Item>
                        );
                    })
                }
            </List>
        </div>
    );
}

export default App;
