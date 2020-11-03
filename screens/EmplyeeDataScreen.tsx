import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import styled from 'styled-components';
import {Input} from '../components/Input';
import {MainButton} from '../components/MainButton';
import {useSelector} from '../helpers/hooks';
import {NavigationRoutes} from '../NavigationRoutes';
import {setDepartment, setEmail, setJobTitle} from '../redux/UserData';

const InputsContainer = styled(ScrollView)`
  padding-horizontal: 32px;
`;

export const EmployeeDataScreen: React.FC = () => {
  const department = useSelector((state) => state.userData.department);
  const jobTitle = useSelector((state) => state.userData.jobTitle);
  const email = useSelector((state) => state.userData.email);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1}}>
      <InputsContainer contentContainerStyle={{paddingVertical: 32}}>
        <Input
          label="Department"
          reduxActionCreator={setDepartment}
          value={department}
        />
        <Input
          label="Job title"
          reduxActionCreator={setJobTitle}
          value={jobTitle}
        />
        <Input
          label="Email"
          reduxActionCreator={setEmail}
          value={email}
          keyboardType="email-address"
        />
      </InputsContainer>
      <MainButton
        title="Next"
        onPress={() => navigation.navigate(NavigationRoutes.GroupScreen)}
        disabled={!department || !jobTitle || !email}
      />
    </SafeAreaView>
  );
};
