import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components';
import {MainButton} from '../components/MainButton';
import {TitleValue} from '../components/TitleValue';
import {Color} from '../helpers/Color';
import {useSelector} from '../helpers/hooks';
import ShareSVG from '../icons/share.svg';

const ScreenSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Color.White};
`;

const HeaderContainer = styled(View)`
  flex-direction: row;
  padding: 16px;
`;

const Photo = styled(Image)`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${Color.Purple};
`;

const Name = styled(Text)`
  flex: 1;
  font-size: 32px;
  text-align: center;
  margin-left: 16px;
`;

const ShareButton = styled(TouchableOpacity)`
  margin-right: 16px;
`;

export const ProfileScreen = () => {
  const photo = useSelector((state) => state.userData.photo);
  const firstName = useSelector((state) => state.userData.firstName);
  const lastName = useSelector((state) => state.userData.lastName);
  const department = useSelector((state) => state.userData.department);
  const jobTitle = useSelector((state) => state.userData.jobTitle);
  const email = useSelector((state) => state.userData.email);
  const gender = useSelector((state) => state.userData.gender);
  const location = useSelector((state) => state.userData.location);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <ShareButton onPress={sharePersonalData}>
          <ShareSVG />
        </ShareButton>
      ),
    });
  }, []);

  const sharePersonalData = () =>
    Share.share(
      {
        message:
          `First name: ${firstName} \nLast name: ${lastName}\nDepartment: ${department}\nJobTitle: ${jobTitle}\n` +
          `Email: ${email}\nGender: ${gender}\nLocation: ${location?.longitude}, ${location?.latitude}`,
      },
      {dialogTitle: 'Share personal data'},
    );

  return (
    <ScreenSafeAreaView>
      <HeaderContainer>
        <Photo source={{width: 120, height: 120, uri: photo}} />
        <Name>{`${firstName} ${lastName}`}</Name>
      </HeaderContainer>
      <View style={{flex: 1, marginTop: 30, paddingHorizontal: 16}}>
        <TitleValue title="Department" value={department} />
        <TitleValue title="Job title" value={jobTitle} />
        <TitleValue title="Email" value={email} />
        <TitleValue title="Gender" value={gender} />
        <TitleValue
          title="Location"
          value={
            location ? `${location.longitude}, ${location.latitude}` : undefined
          }
        />
      </View>
      <MainButton title="Manage group" onPress={() => navigation.goBack()} />
    </ScreenSafeAreaView>
  );
};
