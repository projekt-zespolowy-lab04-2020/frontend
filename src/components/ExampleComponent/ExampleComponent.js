import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SPAN, Wrapper, Button } from './ExampleCompoenent.style';

const ExampleComponent = ({ header }) => {
    const [color, toggle] = useState(false);

    return (
        <>
            <Wrapper color={color}>
                <SPAN>{header}</SPAN>
                <Button onClick={() => toggle(!color)}>Click Me</Button>
            </Wrapper>
        </>
    );
};

ExampleComponent.propTypes = {
    header: PropTypes.string.isRequired
};
export default ExampleComponent;
