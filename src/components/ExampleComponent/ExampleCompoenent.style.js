import styled from 'styled-components';
import colors from '../../utils/colors';

const randomProperty = obj => {
    const keys = Object.keys(obj);
    return obj[keys[(keys.length * Math.random()) << 0]];
};

export const Wrapper = styled.div`
    border: 3px dotted ${colors.RED};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    background-color: ${colors.GREEN};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({ color }) =>
        color &&
        `  background-color: ${randomProperty(colors)};
`}
`;

export const SPAN = styled.span`
    font-weight: 600;
    color: ${colors.WHITE};
    font-size: 20px;
`;

export const Button = styled.button`
    background-color: ${colors.RED};
    font-size: 30px;
`;
