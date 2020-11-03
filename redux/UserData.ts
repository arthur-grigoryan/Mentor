import {Action} from 'redux';
import {Employee} from './Employee';

const SET_PHOTO = 'SET_PHOTO';
const SET_LOCATION = 'SET_LOCATION';
const SET_FIRST_NAME = 'SET_FIRST_NAME';
const SET_LAST_NAME = 'SET_LAST_NAME';
const SET_GENDER = 'SET_GENDER';
const SET_DEPARTMENT = 'SET_DEPARTMENT';
const SET_JOB_TITLE = 'SET_JOB_TITLE';
const SET_EMAIL = 'SET_EMAIL';
const SET_EMPLOYEES_GROUP = 'SET_EMPLOYEES_GROUP';

interface Location {
  longitude: string;
  latitude: string;
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

interface SetPhotoAction extends Action {
  photo: string;
}

export const setPhoto = (photo: string): SetPhotoAction => ({
  type: SET_PHOTO,
  photo,
});

interface SetLocationAction extends Action {
  location: Location;
}

export const setLocation = (
  longitude: string,
  latitude: string,
): SetLocationAction => ({
  type: SET_LOCATION,
  location: {longitude, latitude},
});

interface SetFirstNameAction extends Action {
  firstName: string;
}

export const setFirstName = (firstName: string): SetFirstNameAction => ({
  type: SET_FIRST_NAME,
  firstName,
});

interface SetLastNameAction extends Action {
  lastName: string;
}

export const setLastName = (lastName: string): SetLastNameAction => ({
  type: SET_LAST_NAME,
  lastName,
});

interface SetGenderAction extends Action {
  gender: Gender;
}

export const setGender = (gender: Gender): SetGenderAction => ({
  type: SET_GENDER,
  gender,
});

interface SetDepartmentAction extends Action {
  department: string;
}

export const setDepartment = (department: string): SetDepartmentAction => ({
  type: SET_DEPARTMENT,
  department,
});

interface SetJobTitleAction extends Action {
  jobTitle: string;
}

export const setJobTitle = (jobTitle: string): SetJobTitleAction => ({
  type: SET_JOB_TITLE,
  jobTitle,
});

interface SetEmailAction extends Action {
  email: string;
}

export const setEmail = (email: string): SetEmailAction => ({
  type: SET_EMAIL,
  email,
});

interface SetEmployeesGroupAction extends Action {
  employees: Employee[];
}

export const setEmployeesGroup = (
  employees: Employee[],
): SetEmployeesGroupAction => ({
  type: SET_EMPLOYEES_GROUP,
  employees,
});

export interface UserDataState {
  readonly photo?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly location?: Location;
  readonly gender: Gender;
  readonly department?: string;
  readonly jobTitle?: string;
  readonly email?: string;
  readonly employeesGroup: Employee[];
}

const initialState: UserDataState = {
  gender: Gender.Male,
  employeesGroup: [],
};

export const userDataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_PHOTO: {
      const setPhotoAction = action as SetPhotoAction;
      return {...state, photo: setPhotoAction.photo};
    }
    case SET_FIRST_NAME: {
      const setFirstNameAction = action as SetFirstNameAction;
      return {...state, firstName: setFirstNameAction.firstName};
    }
    case SET_LAST_NAME: {
      const setLastNameNameAction = action as SetLastNameAction;
      return {...state, lastName: setLastNameNameAction.lastName};
    }
    case SET_LOCATION: {
      const setLocationAction = action as SetLocationAction;
      return {...state, location: setLocationAction.location};
    }
    case SET_GENDER: {
      const setGenderAction = action as SetGenderAction;
      return {...state, gender: setGenderAction.gender};
    }
    case SET_DEPARTMENT: {
      const setDepartmentAction = action as SetDepartmentAction;
      return {...state, department: setDepartmentAction.department};
    }
    case SET_JOB_TITLE: {
      const setJobTitleAction = action as SetJobTitleAction;
      return {...state, jobTitle: setJobTitleAction.jobTitle};
    }
    case SET_EMAIL: {
      const setEmailAction = action as SetEmailAction;
      return {...state, email: setEmailAction.email};
    }
    case SET_EMPLOYEES_GROUP: {
      const setEmployeesGroupAction = action as SetEmployeesGroupAction;
      return {...state, employeesGroup: setEmployeesGroupAction.employees};
    }
    default:
      return state;
  }
};
