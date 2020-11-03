import React from 'react';
import {Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {SafeAreaView, View} from 'react-native';
import styled from 'styled-components';
import {Color} from '../helpers/Color';
import {RadioButton} from '../components/RadioButton';
import AddPhotoSVG from '../icons/add-photo.svg';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {
  Gender,
  setFirstName,
  setGender,
  setLastName,
  setLocation,
  setPhoto,
} from '../redux/UserData';
import {useSelector} from '../helpers/hooks';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native';
import {NavigationRoutes} from '../NavigationRoutes';
import {MainButton} from '../components/MainButton';
import {Input} from '../components/Input';

const InputsContainer = styled(ScrollView)`
  padding-horizontal: 32px;
`;

const ImageContainer = styled(View)`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  border-width: 1px;
  border-color: ${Color.Purple};
  margin-bottom: 64px;
  align-self: center;
`;

const Photo = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  overflow: hidden;
`;

const AddPhotoButtonContainer = styled(TouchableOpacity)`
  position: absolute;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${Color.Purple};
  background-color: ${Color.LightGray};
  bottom: 8px;
  right: 16px;
`;

const GenderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const PersonalDataScreen: React.FC = () => {
  const navigation = useNavigation();
  const photo = useSelector((state) => state.userData.photo);
  const firstName = useSelector((state) => state.userData.firstName);
  const lastName = useSelector((state) => state.userData.lastName);
  const location = useSelector((state) => state.userData.location);
  const gender = useSelector((state) => state.userData.gender);

  const dispatch = useDispatch();

  const showImagePicker = () => {
    const options = {title: 'Select photo'};
    ImagePicker.showImagePicker(options, (response: ImagePickerResponse) => {
      dispatch(setPhoto(`data:image/png;base64, ${response.data}`));
    });
  };

  const navigateToNextScreen = () =>
    navigation.navigate(NavigationRoutes.EmployeeDataScreen);

  return (
    <SafeAreaView style={{flex: 1}}>
      <InputsContainer contentContainerStyle={{paddingVertical: 32}}>
        <ImageContainer>
          <Photo source={{width: 200, height: 200, uri: photo}} />
          <AddPhotoButton onPress={showImagePicker} />
        </ImageContainer>
        <Input
          label="First name"
          value={firstName}
          reduxActionCreator={setFirstName}
        />
        <Input
          label="Last name"
          value={lastName}
          reduxActionCreator={setLastName}
        />
        <GenderContainer>
          <RadioButton
            label="Male"
            onPress={() => dispatch(setGender(Gender.Male))}
            isChecked={gender === Gender.Male}
          />
          <RadioButton
            label="Female"
            onPress={() => dispatch(setGender(Gender.Female))}
            isChecked={gender === Gender.Female}
          />
        </GenderContainer>
        <ShareLocation />
      </InputsContainer>
      <MainButton
        title="Next"
        onPress={navigateToNextScreen}
        disabled={!photo || !firstName || !lastName || !location}
      />
    </SafeAreaView>
  );
};

interface AddPhotoProps {
  onPress: () => void;
}

const AddPhotoButton: React.FC<AddPhotoProps> = (props) => (
  <AddPhotoButtonContainer onPress={props.onPress}>
    <AddPhotoSVG />
  </AddPhotoButtonContainer>
);

const ShareLocationContainer = styled(View)`
  flex-direction: row;
  margin-top: 24px;
  align-self: center;
`;

const ShareButtonTitle = styled(Text)`
  font-size: 16px;
  color: ${Color.Orange};
  font-weight: bold;
`;

const LocationText = styled(Text)`
  font-size: 14px;
  color: ${Color.Purple};
`;

const ShareLocation: React.FC = () => {
  const location = useSelector((state) => state.userData.location);
  const dispatch = useDispatch();

  const getGeolocation = () =>
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        dispatch(
          setLocation(
            position.coords.longitude.toString(),
            position.coords.latitude.toString(),
          ),
        );
      },
      (error: GeolocationError) => {
        console.error(error.message);
      },
    );
  return (
    <ShareLocationContainer>
      {location ? (
        <LocationText>{`Location: ${location.longitude}, ${location.latitude}`}</LocationText>
      ) : (
        <TouchableOpacity onPress={getGeolocation}>
          <ShareButtonTitle>Share location</ShareButtonTitle>
        </TouchableOpacity>
      )}
    </ShareLocationContainer>
  );
};
