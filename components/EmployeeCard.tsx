import React from 'react';
import {TouchableHighlight} from 'react-native';
import {Text, View} from 'react-native';
import styled from 'styled-components';
import {Color} from '../helpers/Color';
import {Employee} from '../redux/Employee';
import ArrowUp from '../icons/arrow-up.svg';
import {TitleValue} from './TitleValue';

const EmployeeContainer = styled(TouchableHighlight)`
  border-bottom-width: 1px;
  border-color: ${Color.LightGray};
  padding-top: 8px;
  padding-horizontal: 16px;
  margin-bottom: 8px;
  background-color: ${({isSelected}: {isSelected?: boolean}) =>
    isSelected ? Color.LightGreen : Color.White};
`;

const Name = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: ${Color.Black};
  margin-bottom: 16px;
`;

const ArrowUpContainer = styled(View)`
  padding-left: 12px;
  justify-content: center;
`;

interface Props {
  isSelected?: boolean;
  isMovable?: boolean;
  employee: Employee;
  onPress: () => void;
}

export const EmployeeCard: React.FC<Props> = (props) => (
  <EmployeeContainer
    isSelected={props.isSelected}
    underlayColor={Color.LightGray}
    onPress={props.onPress}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <Name>{`${props.employee.firstName} ${props.employee.lastName}`}</Name>
        <TitleValue title="Department" value={props.employee.department} />
        <TitleValue title="Job title" value={props.employee.jobTitle} />
        <TitleValue title="Gender" value={props.employee.gender} />
        <TitleValue
          title="Location"
          value={`${props.employee.city}, ${props.employee.country}`}
        />
        <TitleValue title="Email" value={props.employee.email} />
      </View>
      {props.isMovable ? (
        <ArrowUpContainer>
          <ArrowUp />
        </ArrowUpContainer>
      ) : null}
    </View>
  </EmployeeContainer>
);
