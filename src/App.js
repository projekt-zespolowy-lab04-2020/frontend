import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyleWrapper from './theme/GlobalStyleWrapper';
import store from './redux/reducers';
import ExampleComponent from './components/ExampleComponent';

function App() {
    return (
        <Provider store={store}>
            <GlobalStyleWrapper>
                <div className="App">
                    <ExampleComponent header="Projekt zespolowy" />
                </div>
            </GlobalStyleWrapper>
        </Provider>
    );
}

export default App;
