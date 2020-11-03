import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {EmployeeCard} from '../components/EmployeeCard';
import {useSelector} from '../helpers/hooks';
import {Employee, getEmployees} from '../redux/Employee';
import {setEmployeesGroup} from '../redux/UserData';

export const SelectEmployeesScreen: React.FC = () => {
  const employees = useSelector((state) => state.employeesState.employees);
  const employeesGroup = useSelector((state) => state.userData.employeesGroup);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const toggleEmployee = (employee: Employee) => {
    if (isEmployeeSelected(employee, employeesGroup)) {
      dispatch(
        setEmployeesGroup(
          employeesGroup.filter(
            (groupMember) => groupMember.id !== employee.id,
          ),
        ),
      );
    } else if (employeesGroup.length < 5) {
      dispatch(setEmployeesGroup([...employeesGroup, employee]));
    }
  };

  const renderItem = ({item}: {item: Employee}) => (
    <EmployeeCard
      employee={item}
      isSelected={isEmployeeSelected(item, employeesGroup)}
      onPress={() => toggleEmployee(item)}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={employees}
        renderItem={renderItem}
        keyExtractor={(item: Employee) => item.id}
      />
    </SafeAreaView>
  );
};

const isEmployeeSelected = (
  employee: Employee,
  selectedEmployees: Employee[],
) =>
  selectedEmployees.findIndex(
    (selectedEmployee) => selectedEmployee.id === employee.id,
  ) !== -1;
