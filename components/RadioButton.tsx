import React from 'react';
import {
  StyleProp,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components';
import {Color} from '../helpers/Color';
import RadioChecked from '../icons/radio-checked';
import RadioUnchecked from '../icons/radio-unchecked';

const Label = styled(Text)`
  font-size: 16px;
  margin-right: 8px;
  color: ${Color.Purple};
`;

interface Props {
  isChecked: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const RadioButton: React.FC<Props> = (props) => {
  return (
    <TouchableWithoutFeedback style={props.style} onPress={props.onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {props.label ? <Label>{props.label}</Label> : null}
        {props.isChecked ? <RadioChecked /> : <RadioUnchecked />}
      </View>
    </TouchableWithoutFeedback>
  );
};
