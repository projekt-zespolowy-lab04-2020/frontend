import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from './GlobalStyleContext';
import GlobalStyle from './GlobalStyle';

// TODO if a good example of use is not found, remove (for now made of a theme)
const GlobalStyleWrapper = ({ children }) => {
    return (
        <Provider value={null}>
            <GlobalStyle />
            {children}
        </Provider>
    );
};

GlobalStyleWrapper.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default GlobalStyleWrapper;
