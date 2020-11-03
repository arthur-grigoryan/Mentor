import {Action, Dispatch} from 'redux';
import {api} from '../api/Api';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  department: string;
  jobTitle: string;
  country: string;
  city: string;
}

const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
const EMPLOYEES_FETCHED = 'EMPLOYEES_FETCHED';

const fetchEmployees = (): Action => ({type: FETCH_EMPLOYEES});

interface EmployeesFetchedAction extends Action {
  employees: Employee[];
}

const employeesFetched = (employees: Employee[]): EmployeesFetchedAction => ({
  type: EMPLOYEES_FETCHED,
  employees,
});

export const getEmployees = () => async (dispatch: Dispatch) => {
  dispatch(fetchEmployees());
  try {
    const result = await api.getEmployees();
    const employees = await result.json();
    dispatch(employeesFetched(employees));
  } catch (e) {
    console.error(e);
  }
};

export interface EmployeesState {
  isLoading: boolean;
  employees: Employee[];
}

const initialState: EmployeesState = {
  isLoading: false,
  employees: [],
};

export const employeeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES: {
      return {...state, isLoading: true};
    }
    case EMPLOYEES_FETCHED: {
      const employeesFetchedAction = action as EmployeesFetchedAction;
      return {
        ...state,
        isLoading: false,
        employees: employeesFetchedAction.employees,
      };
    }
    default:
      return state;
  }
};
