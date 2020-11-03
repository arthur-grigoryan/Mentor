import React, {useState} from 'react';
import {KeyboardTypeOptions} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {Action} from 'redux';
import styled from 'styled-components';
import {Color} from '../helpers/Color';

const StyledInput = styled(TextInput)`
  margin-bottom: 16px;
  height: 56px;
`;

interface Props {
  label: string;
  value: string | undefined;
  keyboardType?: KeyboardTypeOptions;
  reduxActionCreator: (text: string) => Action;
}

export const Input: React.FC<Props> = (props) => {
  const [value, setValue] = useState(props.value);
  const dispatch = useDispatch();
  return (
    <StyledInput
      label={props.label}
      value={value}
      onChange={({nativeEvent}) => setValue(nativeEvent.text)}
      theme={{colors: {primary: Color.Purple}}}
      onEndEditing={({nativeEvent}) =>
        dispatch(props.reduxActionCreator(nativeEvent.text))
      }
      keyboardType={props.keyboardType}
    />
  );
};
