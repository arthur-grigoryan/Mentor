import React from 'react';
import {TouchableHighlight, Text} from 'react-native';
import styled from 'styled-components';
import {Color} from '../helpers/Color';

const Button = styled(TouchableHighlight)`
  height: 44px;
  margin-horizontal: 32px;
  margin-bottom: 8px;
  background-color: ${({disabled}: {disabled?: boolean}) =>
    disabled ? Color.Gray : Color.Purple};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  color: ${Color.White};
  font-size: 16px;
`;

interface Props {
  title: string;
  disabled?: boolean;
  onPress: () => void;
}
export const MainButton: React.FC<Props> = (props) => (
  <Button {...props} underlayColor={Color.DarkPurple}>
    <Title>{props.title}</Title>
  </Button>
);
