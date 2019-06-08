import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  children?: any
  size?: number;
  color?: string;
  bold?: boolean;
  wight?: boolean;
  width?: string;
}

const Text = ({size, color, bold, children, wight, width}: IProps) => {
		return (
      <P 
        size={size}
        color={color}
        bold={bold}
        wight={wight}
        width={width}
      >
        {children}
      </P>
		);
}

// STYLE

const P = styled.p<IProps>`
  color: ${props => props.color || !props.bold ? props.theme.colors.gray60 : props.theme.colors.gray70};
  font-size: ${props => props.size ? `${props.size}px` : '15px'};
  font-family: monospace sans-serif;
  margin: 2px;
  font-weight: ${props => props.wight ? '600' : '500'};
  ${({width}) => width && `
    width: ${width}
  `}
`;

export default Text;