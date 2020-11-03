import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components';
import {EmployeeCard} from '../components/EmployeeCard';
import {MainButton} from '../components/MainButton';
import {useSelector} from '../helpers/hooks';
import {NavigationRoutes} from '../NavigationRoutes';
import GroupAdd from '../icons/group-add.svg';
import {Employee} from '../redux/Employee';
import {useDispatch} from 'react-redux';
import {setEmployeesGroup} from '../redux/UserData';

const Information = styled(Text)`
  flex: 1;
  margin: 32px;
  font-size: 20px;
  text-align: center;
`;

export const GroupScreen = () => {
  const navigator = useNavigation();
  const employeesGroup = useSelector((state) => state.userData.employeesGroup);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.setOptions({headerRight: () => <GroupAddButton />});
  }, []);

  const moveUp = (employee: Employee) => {
    const index = employeesGroup.findIndex(
      (groupMember) => groupMember.id === employee.id,
    );
    if (index === -1 || index === 0) {
      return;
    }
    const updatedGroup = [...employeesGroup];
    updatedGroup[index] = updatedGroup[index - 1];
    updatedGroup[index - 1] = employee;
    dispatch(setEmployeesGroup(updatedGroup));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {employeesGroup.length > 0 ? (
        <FlatList
          style={{flex: 1}}
          data={employeesGroup}
          renderItem={({item}) => (
            <EmployeeCard
              employee={item}
              isMovable={true}
              onPress={() => moveUp(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Information>
          You don't have group yet. Select employees to create.
        </Information>
      )}
      <MainButton
        title="Done"
        disabled={employeesGroup.length === 0}
        onPress={() => navigator.navigate(NavigationRoutes.ProfileScreen)}
      />
    </SafeAreaView>
  );
};

const GroupAddButton: React.FC = () => {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={{marginRight: 16}}
      onPress={() =>
        navigator.navigate(NavigationRoutes.SelectEmployeesScreen)
      }>
      <GroupAdd />
    </TouchableOpacity>
  );
};
