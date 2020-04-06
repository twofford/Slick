import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

const Root = () => (
    <Provider store={store}>
        <HashRouter>
            <div>Slick</div>
        </HashRouter>
    </Provider>
);

export default Root;