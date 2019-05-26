import * as React from 'react';
import styled from 'styled-components';

interface IProps {
  children: string
  size?: number;
  color?: string;
  bold?: boolean;
}

const Text = ({size, color, bold, children}: IProps) => {
		return (
      <P size={size} color={color} bold={bold}>{children}</P>
		);
}

// STYLE

const P = styled.p<{ size?: number, color?: string, bold?:boolean }>`
  color: ${props => props.color || !props.bold ? props.theme.colors.gray60 : props.theme.colors.gray70};
  font-size: ${props => `${props.size}px` || '17px'};
  font-family: monospace sans-serif;
  /* font-weight: ${props => props.bold ? 600 : 400 }; */
  margin: 2px;
`;

export default Text;