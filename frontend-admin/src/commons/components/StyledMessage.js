import React from 'react';
import styled, {css} from 'styled-components';

const MessageBox = styled.div`

  ${({variant, theme}) => {
    const color = theme.colors[variant];
    const size = theme.fontSizes.extraSmall;
    return css`
      box-shadow: 2px 2px 10px ${color};
      color: ${color};
    `
  }}
  `;

export default function StyledMessage({ children }) {
  if (!children) return;

  const messages = Array.isArray(children) ? children : [children];
  return messages.map((message) => (
    <MessageBox key={Date.now() + '_' + message}>{message}</MessageBox>
  ));
}
