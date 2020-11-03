import {applyMiddleware, combineReducers, createStore} from 'redux';
import {userDataReducer, UserDataState} from './UserData';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {employeeReducer, EmployeesState} from './Employee';

export interface StoreState {
  userData: UserDataState;
  employeesState: EmployeesState;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  userData: persistReducer(persistConfig, userDataReducer),
  employeesState: employeeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {store, persistor};
