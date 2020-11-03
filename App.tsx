import 'react-native-gesture-handler';

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationRoutes} from './NavigationRoutes';
import {PersonalDataScreen} from './screens/PersonalDataScreen';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/Store';
import {EmployeeDataScreen} from './screens/EmplyeeDataScreen';
import {PersistGate} from 'redux-persist/integration/react';
import {GroupScreen} from './screens/GroupScreen';
import {SelectEmployeesScreen} from './screens/SelectEmployeesScreen';
import {Color} from './helpers/Color';
import {ProfileScreen} from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerTintColor: Color.Purple}}
            initialRouteName={NavigationRoutes.PersonalDataScreen}>
            <Stack.Screen
              name={NavigationRoutes.PersonalDataScreen}
              component={PersonalDataScreen}
              options={{title: 'Personal'}}
            />
            <Stack.Screen
              name={NavigationRoutes.EmployeeDataScreen}
              component={EmployeeDataScreen}
              options={{title: 'Department'}}
            />
            <Stack.Screen
              name={NavigationRoutes.GroupScreen}
              component={GroupScreen}
              options={{title: 'Groups'}}
            />
            <Stack.Screen
              name={NavigationRoutes.SelectEmployeesScreen}
              component={SelectEmployeesScreen}
              options={{title: 'Select employee'}}
            />
            <Stack.Screen
              name={NavigationRoutes.ProfileScreen}
              component={ProfileScreen}
              options={{title: 'Profile'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
