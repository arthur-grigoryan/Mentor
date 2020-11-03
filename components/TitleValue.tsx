import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import {Color} from '../helpers/Color';

const TitleValueContainer = styled(View)`
  flex-direction: row;
  margin-bottom: 8px;
  justify-content: space-between;
`;

const Title = styled(Text)`
  font-size: 16px;
  color: ${Color.Gray};
`;

const Value = styled(Text)`
  font-size: 16px;
  color: ${Color.Black};
  margin-left: 8px;
  flex-shrink: 1;
`;

interface TitleValueProps {
  title: string;
  value?: string;
}

export const TitleValue: React.FC<TitleValueProps> = (props) =>
  props.value ? (
    <TitleValueContainer>
      <Title>{`${props.title}:`}</Title>
      <Value numberOfLines={1}>{props.value}</Value>
    </TitleValueContainer>
  ) : null;
